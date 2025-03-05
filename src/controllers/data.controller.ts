import { Request, Response } from 'express';
import { readCSVFiles, readExcelFiles } from '../utils/reader';

export const processExcelFiles = async (req: Request, res: Response) => {
  const directory = 'C://Users//davispeck//Documents//Trabalho//CAPES//Projetos Organizados//scripts-capes//script-observatorio-pos-graduacao//dados_finais_especificando_ies_ppg'
  await readExcelFiles(directory)
  res.json({ message: 'All data processed.' });
};

export const processCSVFiles = async (req: Request, res: Response) => {
  const directory = 'C://Users//davispeck//Documents//Trabalho//CAPES//scripts-historico//new-csv'
  await readCSVFiles(directory)
  res.json({ message: 'All data processed.' });
};