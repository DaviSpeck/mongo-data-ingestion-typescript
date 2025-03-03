import logger from "../config/logger";
import PPG from "../models/ppg.model";

export const createOrUpdatePPG = async (ppgData: any) => {
  try {
    let existingPPG = await PPG.findOne({ id_programa: ppgData.id_programa });

    const processedData = {
      ...ppgData,
      programa_em_rede_programa: ppgData.programa_em_rede_programa === "1" || ppgData.programa_em_rede_programa === true
    };

    if (existingPPG) {
      existingPPG = await PPG.findOneAndUpdate(
        { id_programa: processedData.id_programa },
        processedData,
        { new: true }
      );
      logger.info(`PPG atualizado: ${processedData.id_programa}`);
    } else {
      existingPPG = new PPG(processedData);
      await existingPPG.save();
      logger.info(`PPG criado: ${processedData.id_programa}`);
    }

    return existingPPG;
  } catch (error) {
    const errorMessage = (error as Error).message;
    logger.error(`Erro ao processar PPG: ${errorMessage}`);
    throw new Error(errorMessage);
  }
};