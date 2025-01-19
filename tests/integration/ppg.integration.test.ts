import request from 'supertest';
import app from '../../src/app';

describe('PPG Integration Tests', () => {
    test('POST /api/ppg should create a new PPG document', async () => {
        const ppgData = { id_programa: 101, nome_programa: 'Test Program' };
        const response = await request(app).post('/api/ppg').send(ppgData);

        expect(response.status).toBe(201);
        expect(response.body.id_programa).toBe(ppgData.id_programa);
    });

    test('POST /api/ppg should return error for missing fields', async () => {
        const ppgData = { nome_programa: 'Invalid Program' };
        const response = await request(app).post('/api/ppg').send(ppgData);

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Validation failed: id_programa is required');
    });
});
