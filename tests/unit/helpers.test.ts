import { toBoolean, toNumber, toDate, trimStrings, validateRequiredFields } from '../../src/utils/helpers';

describe('Helpers Unit Tests', () => {
    test('toBoolean should correctly convert values', () => {
        expect(toBoolean('1')).toBe(true);
        expect(toBoolean('0')).toBe(false);
        expect(toBoolean('true')).toBe(true);
        expect(toBoolean('false')).toBe(false);
    });

    test('toNumber should correctly convert values', () => {
        expect(toNumber('42')).toBe(42);
        expect(toNumber('invalid')).toBeNull();
    });

    test('toDate should correctly parse valid dates', () => {
        expect(toDate('2024-05-02T11:43:24.183000')).toBeInstanceOf(Date);
        expect(toDate('invalid-date')).toBeNull();
    });

    test('trimStrings should remove whitespace from object fields', () => {
        const obj = { name: ' John ', age: 30, nested: { field: ' Test ' } };
        expect(trimStrings(obj)).toEqual({ name: 'John', age: 30, nested: { field: 'Test' } });
    });

    test('validateRequiredFields should throw error for missing fields', () => {
        const obj = { name: 'John', age: 30 };
        expect(() => validateRequiredFields(obj, ['name', 'age'])).not.toThrow();
        expect(() => validateRequiredFields(obj, ['name', 'email'])).toThrow('Missing required field: email');
    });
});