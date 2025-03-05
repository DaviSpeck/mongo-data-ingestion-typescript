import { Repository } from "typeorm";
import logger from "../config/logger";
import { TimelineData } from "../entities/timeline-data.entity";
import { AppDataSource } from "../config/database";

const timelineDataRepository: Repository<TimelineData> = AppDataSource.getRepository(TimelineData);

/**
    * Verifica se um registro com os mesmos valores já existe antes de inserir um novo.
    * Evita duplicações baseadas em NR_PROCESSO, DS_ACAO_PROCESSO, dsObservacao e DS_USUARIO.
    */
export async function createOrUpdateTimelineData(data: any[]): Promise<void> {
    try {
        for (let item of data) {
            item = {
                nrProcesso: item.NR_PROCESSO ? String(item.NR_PROCESSO).trim() : null,
                dsAcaoProcesso: item.DS_ACAO_PROCESSO ? String(item.DS_ACAO_PROCESSO).trim() : null,
                dsObservacao: item.DS_OBSERVACAO ? String(item.DS_OBSERVACAO).trim() : null,
                dsUsuario: item.DS_USUARIO ? String(item.DS_USUARIO).trim() : null,
                ano: item.ANO ? Number(item.ANO) : null,
                mes: item.MES ? Number(item.MES) : null,
                dia: item.DIA ? Number(item.DIA) : null,
                hora: item.HORA ? String(item.HORA).trim() : null,
            };

            if (!item.nrProcesso) {
                throw new Error(`Registro inválido, nr_processo está ausente: ${JSON.stringify(item)}`);
            }

            const existingRecord = await timelineDataRepository.findOne({
                where: {
                    nrProcesso: item.nrProcesso,
                    dsAcaoProcesso: item.dsAcaoProcesso,
                    dsObservacao: item.dsObservacao,
                    dsUsuario: item.dsUsuario,
                },
            });

            if (!existingRecord) {
                await timelineDataRepository.save(item);
                logger.info(`Novo registro criado: ${item.nrProcesso}`);
            } else {
                logger.info(`Registro duplicado ignorado: ${item.nrProcesso}`);
            }
        }
    } catch (error: any) {
        logger.info(`Erro ao processar TimelineData: ${error.message}`);
        throw new Error(error.message);
    }
}