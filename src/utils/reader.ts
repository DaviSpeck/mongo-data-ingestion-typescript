import * as xlsx from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';
import csvParser from 'csv-parser';
import logger from '../config/logger';
import { processProfiles } from '../services/process.service';
import { createOrUpdateTimelineData } from '../services/timeline-data.service';
import { createOrUpdateHistoricoProcesso } from '../services/historico-processo.service';
import duckdb from 'duckdb';

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

export async function readCSVFiles(directory: string): Promise<any[]> {
  const files = fs.readdirSync(directory).filter(file => file.endsWith('.csv'));
  const data: any[] = [];

  for (const file of files) {
    const filePath = path.join(directory, file);
    logger.info(`📄 Lendo arquivo CSV: ${file}`);

    const fileData: any[] = [];

    await new Promise<void>((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', row => fileData.push(row))
        .on('end', async () => {
          data.push(...fileData);
          await createOrUpdateTimelineData(fileData);
          resolve();
        })
        .on('error', error => reject(error));
    });
  }

  return data;
}

export async function readParquetWithDuckDB(filePath: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const db = new duckdb.Database(':memory:');
    db.all(`SELECT * FROM parquet_scan('${filePath}')`, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

export async function readParquetFiles(fileOrDirPath: string): Promise<any[]> {
  const allData: any[] = [];

  if (!fs.existsSync(fileOrDirPath)) {
    throw new Error(`Caminho não encontrado: ${fileOrDirPath}`);
  }

  const stat = fs.statSync(fileOrDirPath);

  if (stat.isFile() && fileOrDirPath.endsWith('.parquet')) {
    logger.info(`📦 Lendo arquivo Parquet: ${path.basename(fileOrDirPath)}`);
    const data = await readParquetWithDuckDB(fileOrDirPath);
    allData.push(...data);
    await createOrUpdateHistoricoProcesso(data);
  } else if (stat.isDirectory()) {
    const files = fs.readdirSync(fileOrDirPath).filter(f => f.endsWith('.parquet'));

    for (const file of files) {
      const filePath = path.join(fileOrDirPath, file);
      logger.info(`📦 Lendo arquivo Parquet: ${file}`);
      const data = await readParquetWithDuckDB(filePath);
      allData.push(...data);
      await createOrUpdateHistoricoProcesso(data);
    }
  } else {
    throw new Error('O caminho informado não é um arquivo .parquet nem uma pasta.');
  }

  return allData;
}