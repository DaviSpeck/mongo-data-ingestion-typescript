import * as xlsx from 'xlsx';
import logger from '../config/logger';
import { processProfiles } from '../services/process.service';

export const readExcelFiles = async (directory: string): Promise<any[]> => {
  const fs = require('fs');
  const path = require('path');
  const files = fs.readdirSync(directory).filter((file: string) => file.endsWith('.xlsx'));
  const data: any[] = [];

  for (const file of files) {
    const filePath = path.join(directory, file);
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    logger.info(`📄 Lido arquivo Excel: ${file}`);
    data.push(...sheetData);

    await processProfiles(sheetData);
  }

  return data;
};