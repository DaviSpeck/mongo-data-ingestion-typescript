import Profile from '../models/profile.model';
import IES from '../models/ies.model';
import PPG from '../models/ppg.model';
import logger from '../config/logger';

export const createProfile = async (profileData: any) => {
  try {
    const ies = await IES.findOne({ id_ies: profileData.id_ies });
    if (!ies) throw new Error(`IES not found for id_ies: ${profileData.id_ies}`);

    const ppg = await PPG.findOne({ id_programa: profileData.id_programa });
    if (!ppg) throw new Error(`PPG not found for id_programa: ${profileData.id_programa}`);

    const newProfile = new Profile({
      ano_base: profileData.ano_base,
      nome_pessoa: profileData.nome_pessoa,
      tipo_vinculo: profileData.tipo_vinculo,
      id_ies: ies._id,
      id_programa: ppg._id,
    });

    const savedProfile = await newProfile.save();
    logger.info(`Profile created: ${savedProfile._id}`);
    return savedProfile;
  } catch (error) {
    const errorMessage = (error as Error).message;
    logger.error(`Error creating profile: ${errorMessage}`);
    throw new Error(errorMessage);
  }
};