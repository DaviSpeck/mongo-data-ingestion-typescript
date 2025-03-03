import { Router } from 'express';
import { processFile } from './controllers/data.controller';

const router: Router = Router();

// Route to process files
router.get('/process-file', processFile);

export default router;