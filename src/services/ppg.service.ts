import PPG from '../models/ppg.model';
import logger from '../config/logger';

export const createOrUpdatePPG = async (ppgData: any) => {
  try {
    const existingPPG = await PPG.findOneAndUpdate(
      { id_programa: ppgData.id_programa },
      ppgData,
      { upsert: true, new: true }
    );
    logger.info(`PPG processed: ${ppgData.id_programa}`);
    return existingPPG;
  } catch (error) {
    const errorMessage = (error as Error).message;
    logger.error(`Error processing PPG: ${errorMessage}`);
    throw new Error(errorMessage);
  }
};