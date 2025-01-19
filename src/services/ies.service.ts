import IES from '../models/ies.model';
import logger from '../config/logger';

export const createOrUpdateIES = async (iesData: any) => {
  try {
    const existingIES = await IES.findOneAndUpdate(
      { id_ies: iesData.id_ies },
      iesData,
      { upsert: true, new: true }
    );
    logger.info(`IES processed: ${iesData.id_ies}`);
    return existingIES;
  } catch (error) {
    const errorMessage = (error as Error).message;
    logger.error(`Error processing IES: ${errorMessage}`);
    throw new Error(errorMessage);
  }
};