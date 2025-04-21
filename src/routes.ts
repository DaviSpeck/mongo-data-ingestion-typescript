import { Router } from 'express';
import { processExcelFiles, processCSVFiles, processParquetFiles } from './controllers/data.controller';

const router: Router = Router();

// Route to process files
router.get('/process-excel-files', processExcelFiles);
router.get('/process-csv-files', processCSVFiles);
router.get('/process-parquet', processParquetFiles);

export default router;