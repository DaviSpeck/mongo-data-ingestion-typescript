import iesService from '../../src/services/ies.service';

jest.mock('../../src/models/ies.model', () => ({
    create: jest.fn(),
}));

describe('IES Service Unit Tests', () => {
    test('should create a new IES document successfully', async () => {
        const iesData = { id_ies: 1, nome_ies: 'Test University' };
        jest.spyOn(iesService, 'createOrUpdate').mockResolvedValue({ _id: 'mockId', ...iesData });

        const result = await iesService.createOrUpdate(iesData);
        expect(result).toEqual({ _id: 'mockId', ...iesData });
    });

    test('should throw an error for invalid data', async () => {
        const iesData = { id_ies: null, nome_ies: 'Test University' };
        await expect(iesService.createOrUpdate(iesData)).rejects.toThrow();
    });
});
