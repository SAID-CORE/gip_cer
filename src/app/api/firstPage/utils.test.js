// utils.test.js
import {validateFirstFormData, genUuid5} from './utils.js';
import {parsePhoneNumber} from 'libphonenumber-js';
import {v5 as uuidv5} from 'uuid';
import {jest, describe, test, expect} from '@jest/globals'

jest.mock('uuid', () => ({
    v5: jest.fn(),
}));

describe('validateFirstFormData', () => {
    test('should return missing parameters for incomplete data', async () => {
        const data = {name: 'John'};
        const response = await validateFirstFormData(data);
        expect(response).toEqual({
            success: false,
            message: 'missing parameters surname,num_tel',
        });
    });

    test('should return invalid phone number for invalid phone number', async () => {
        const data = {name: 'John', surname: 'Doe', num_tel: '347875'};
        const response = await validateFirstFormData(data);
        expect(response).toEqual({
            success: false,
            message: "invalid phone number +39347875",
        });
    });

    test('should return data validated correctly for valid data', async () => {
        const data = {name: 'John', surname: 'Doe', num_tel: '3478756722'};
        const response = await validateFirstFormData(data);
        expect(response).toEqual({
            success: true,
            message: 'data validated correctly',
        });
    });

    test('should return NOT_A_NUMBER error parsing phone number for exception', async () => {
        const data = {name: 'John', surname: 'Doe', num_tel: 'invalid'};
        const response = await validateFirstFormData(data);
        expect(response).toEqual({
            success: false,
            message: 'error parsing phone number ParseError: NOT_A_NUMBER',
        });
    });
    test('should return TOO_SHORT error parsing phone number for exception', async () => {
        const data = {name: 'John', surname: 'Doe', num_tel: '1'};
        const response = await validateFirstFormData(data);
        expect(response).toEqual({
            success: false,
            message: 'error parsing phone number ParseError: TOO_SHORT',
        });
    });

    test('should return TOO_LONG error parsing phone number for exception', async () => {
        const data = {name: 'John', surname: 'Doe', num_tel: '12345678901234567890'};
        const response = await validateFirstFormData(data);
        expect(response).toEqual({
            success: false,
            message: 'error parsing phone number ParseError: TOO_LONG',
        });
    });


});

describe('genUuid5', () => {
    test('should generate UUID v5', async () => {
        const name = 'test';
        const namespace = process.env.SALT;
        const uuid = 'af820a5d-8556-5fa0-ae07-0aaa1db1b18a';
        const result = await genUuid5(name, namespace);
        expect(result).toBe(uuid);
    })
});