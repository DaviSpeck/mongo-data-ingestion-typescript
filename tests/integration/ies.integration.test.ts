import request from 'supertest';
import app from '../../src/app';

describe('IES Integration Tests', () => {
    test('POST /api/ies should create a new IES document', async () => {
        const iesData = { id_ies: 1, nome_ies: 'Test IES', uf_ies: 'SP' };
        const response = await request(app).post('/api/ies').send(iesData);

        expect(response.status).toBe(201);
        expect(response.body.id_ies).toBe(iesData.id_ies);
    });

    test('POST /api/ies should return error for missing fields', async () => {
        const iesData = { nome_ies: 'Missing ID' };
        const response = await request(app).post('/api/ies').send(iesData);

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Validation failed: id_ies is required');
    });
});