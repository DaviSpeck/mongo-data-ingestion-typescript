import { createOrUpdateIES } from '../services/ies.service';
import { createOrUpdatePPG } from '../services/ppg.service';
import { createProfile } from '../services/profile.service';
import logger from '../config/logger';

/**
 * Processa um array de perfis e salva os dados no banco de dados
 * @param profiles Array contendo os dados dos perfis
 */
export const processProfiles = async (profiles: any[]) => {
    try {
        logger.info(`🚀 Iniciando processamento de ${profiles.length} perfis...`);

        for (const profileData of profiles) {
            try {
                console.log(`🔍 Processando perfil: ${profileData.nome_pessoa}`);

                const ies = await createOrUpdateIES(profileData);
                console.log(`✅ IES salvo: ${ies?.id_ies}`);

                const ppg = await createOrUpdatePPG(profileData);
                console.log(`✅ PPG salvo: ${ppg?.id_programa}`);

                await createProfile(profileData);

                logger.info(`🎉 Perfil criado para ${profileData.nome_pessoa}`);
            } catch (error) {
                logger.error(`❌ Erro ao processar perfil ${profileData.nome_pessoa}: ${(error as Error).message}`);
            }
        }

        logger.info(`✅ Processamento finalizado!`);
    } catch (error) {
        logger.error(`❌ Erro geral no processamento: ${(error as Error).message}`);
    }
};
