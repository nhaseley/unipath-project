const User = require('../models/user')
const jwt = require("jsonwebtoken");
jest.mock('jsonwebtoken')

describe('GenerateAuthTokens', () => {
    test('should return the users token', async function () {
        const testPayloadInfo = {
            id: 0,
            firstName: 'test-first_name',
            lastName: 'test-last_name',
            email: 'test-email@test.com',
        }
        const testSecretKey = 'test-secret_key'

        jwt.sign = jest.fn((payload, secret, options) => {
            // Return a dummy token
            return 'dummy-token';
          });
          const token = await User.generateAuthToken(testPayloadInfo, testSecretKey);
          expect(token).toBe('dummy-token');
    }) 
})




describe('VerifyTokens', () => {
    jest.mock('jsonwebtoken');
    jwt.verify = jest.fn((token, secretKey) => {
    if (token === 'valid-token') {
    return { id: 0, firstName: 'test-first_name', lastName: 'test-last_name', email: 'test-email@test.com' };
    } else {
    throw new Error('Invalid token');
    }
});
    test('should verify if the token is expired/valid or not', async function () {
        const validToken = 'valid-token'
        const result = await User.verifyAuthToken(validToken)
        expect(result).toEqual({
            id: 0,
            firstName: 'test-first_name',
            lastName: 'test-last_name',
            email: 'test-email@test.com'
        })
    })

    test('should return null for an invalid token', async () => {
        const invalidToken = 'invalid-token';
        // Call the verifyAuthToken function with the invalid token
        const decodedToken = await User.verifyAuthToken(invalidToken);
        // Assertion
        // Verify that jwt.verify() was called with the invalid token and secret key
        expect(jwt.verify).toHaveBeenCalledWith(invalidToken, expect.any(String));
        // Verify that the function returns null for an invalid token
        expect(decodedToken).toBeNull();
      });
})

