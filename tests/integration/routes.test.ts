import request from 'supertest';
import app from '../../src/app';

describe('API Integration Tests', () => {
    test('POST /api/process-file should process file successfully', async () => {
        const mockFileData = Buffer.from('mock content');
        const response = await request(app)
            .post('/api/process-file')
            .attach('file', mockFileData, 'mockfile.xlsx');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('File processed successfully');
    });

    test('POST /api/process-file should return error for invalid file', async () => {
        const response = await request(app).post('/api/process-file');
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('No file provided');
    });
});