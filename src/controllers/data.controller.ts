import { Request, Response } from 'express';
import { readExcelFiles } from '../utils/excel-reader';

export const processFile = async (req: Request, res: Response) => {
  const directory = 'C://Users//davispeck//Documents//Trabalho//CAPES//Projetos Organizados//scripts-capes//script-observatorio-pos-graduacao//dados_finais_especificando_ies_ppg'
  await readExcelFiles(directory)
  res.json({ message: 'All data processed.' });
};