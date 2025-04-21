import { Repository } from 'typeorm';
import { HistoricoProcesso } from '../entities/historico-processo.entity';
import { AppDataSource } from '../config/database';
import logger from '../config/logger';

const historicoRepository: Repository<HistoricoProcesso> = AppDataSource.getRepository(HistoricoProcesso);

/**
 * Verifica duplicidade antes de inserir no banco
 */
export async function createOrUpdateHistoricoProcesso(data: any[]): Promise<void> {
  try {
    for (let item of data) {
      item = {
        nrProcesso: item.NR_PROCESSO ? String(item.NR_PROCESSO).trim() : null,
        dsAcaoProcesso: item.DS_ACAO_PROCESSO ? String(item.DS_ACAO_PROCESSO).trim() : null,
        dsObservacao: item.DS_OBSERVACAO ? String(item.DS_OBSERVACAO).trim() : null,
        dsUsuario: item.DS_USUARIO ? String(item.DS_USUARIO).trim() : null,
        dhAcao: item.DH_ACAO ? new Date(item.DH_ACAO) : null,
      };

      if (!item.nrProcesso || !item.dhAcao) {
        throw new Error(`Registro inválido: ${JSON.stringify(item)}`);
      }

      const exists = await historicoRepository.findOne({
        where: {
          nrProcesso: item.nrProcesso,
          dsAcaoProcesso: item.dsAcaoProcesso,
          dsObservacao: item.dsObservacao,
          dsUsuario: item.dsUsuario,
          dhAcao: item.dhAcao,
        },
      });

      if (!exists) {
        await historicoRepository.save(item);
        logger.info(`[historico] Novo registro inserido: ${item.nrProcesso}`);
      } else {
        logger.info(`[historico] Registro duplicado ignorado: ${item.nrProcesso}`);
      }
    }
  } catch (error: any) {
    logger.error(`[historico] Erro: ${error.message}`);
    throw new Error(error.message);
  }
}