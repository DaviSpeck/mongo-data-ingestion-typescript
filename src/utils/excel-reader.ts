import * as xlsx from 'xlsx';
import logger from '../config/logger';

export const readExcelFiles = (directory: string): any[] => {
  const fs = require('fs');
  const path = require('path');
  const files = fs.readdirSync(directory).filter((file: string) => file.endsWith('.xlsx'));
  const data: any[] = [];

  files.forEach((file: string) => {
    const filePath = path.join(directory, file);
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    logger.info(`Lido arquivo Excel: ${file}`);
    data.push(...sheetData);
  });

  return data;
};