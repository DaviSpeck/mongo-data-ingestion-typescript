import { IESModel } from '../../src/models/ies.model';
import { PPGModel } from '../../src/models/ppg.model';
import { ProfileModel } from '../../src/models/profile.model';

describe('Model Unit Tests', () => {
    test('IESModel should throw validation error for missing id_ies', async () => {
        const invalidIES = new IESModel({ nome_ies: 'Test IES' });
        await expect(invalidIES.validate()).rejects.toThrow();
    });

    test('PPGModel should throw validation error for missing id_programa', async () => {
        const invalidPPG = new PPGModel({ nome_programa: 'Test Program' });
        await expect(invalidPPG.validate()).rejects.toThrow();
    });

    test('ProfileModel should throw validation error for missing ano_base', async () => {
        const invalidProfile = new ProfileModel({ nome_pessoa: 'John Doe' });
        await expect(invalidProfile.validate()).rejects.toThrow();
    });
});