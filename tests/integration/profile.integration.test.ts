import request from 'supertest';
import app from '../../src/app';

describe('Profile Integration Tests', () => {
    test('POST /api/profile should create a new profile document', async () => {
        const profileData = {
            ano_base: 2024,
            nome_pessoa: 'John Doe',
            id_ies: 'mockIesId',
            id_programa: 'mockPpgId',
        };

        const response = await request(app).post('/api/profile').send(profileData);

        expect(response.status).toBe(201);
        expect(response.body.nome_pessoa).toBe(profileData.nome_pessoa);
    });

    test('POST /api/profile should return error for missing fields', async () => {
        const profileData = { nome_pessoa: 'John Doe' }; // Missing ids and ano_base
        const response = await request(app).post('/api/profile').send(profileData);

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Validation failed: ano_base is required');
    });
});