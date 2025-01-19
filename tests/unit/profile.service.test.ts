import profileService from '../../src/services/profile.service';

jest.mock('../../src/models/profile.model', () => ({
    create: jest.fn(),
}));

describe('Profile Service Unit Tests', () => {
    test('should create a new profile document successfully', async () => {
        const profileData = {
            ano_base: 2024,
            nome_pessoa: 'John Doe',
            id_ies: 'mockIesId',
            id_programa: 'mockPpgId',
        };

        jest.spyOn(profileService, 'create').mockResolvedValue({ _id: 'mockProfileId', ...profileData });

        const result = await profileService.create(profileData);
        expect(result).toEqual({ _id: 'mockProfileId', ...profileData });
    });

    test('should throw an error for invalid profile data', async () => {
        const profileData = { nome_pessoa: 'Missing Data' }; // ano_base and ids are missing
        await expect(profileService.create(profileData)).rejects.toThrow();
    });
});