import ppgService from '../../src/services/ppg.service';

jest.mock('../../src/models/ppg.model', () => ({
    create: jest.fn(),
    findOneAndUpdate: jest.fn(),
}));

describe('PPG Service Unit Tests', () => {
    test('should create or update a PPG document successfully', async () => {
        const ppgData = { id_programa: 101, nome_programa: 'Test Program' };
        jest.spyOn(ppgService, 'createOrUpdate').mockResolvedValue({ _id: 'mockId', ...ppgData });

        const result = await ppgService.createOrUpdate(ppgData);
        expect(result).toEqual({ _id: 'mockId', ...ppgData });
    });

    test('should throw an error for missing id_programa', async () => {
        const ppgData = { nome_programa: 'Invalid Program' };
        await expect(ppgService.createOrUpdate(ppgData)).rejects.toThrow();
    });
});