import logger from "../config/logger";
import IES from "../models/ies.model";

export const createOrUpdateIES = async (iesData: any) => {
  try {
    let existingIES = await IES.findOne({ id_ies: iesData.id_ies });

    if (existingIES) {
      existingIES = await IES.findOneAndUpdate(
        { id_ies: iesData.id_ies },
        iesData,
        { new: true }
      );
      logger.info(`IES atualizado: ${iesData.id_ies}`);
    } else {
      existingIES = new IES(iesData);
      await existingIES.save();
      logger.info(`IES criado: ${iesData.id_ies}`);
    }

    return existingIES;
  } catch (error) {
    const errorMessage = (error as Error).message;
    logger.error(`Erro ao processar IES: ${errorMessage}`);
    throw new Error(errorMessage);
  }
};