const Parent = require('../models/parent')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { validateFields } = require("../utils/validate.js")
const { UnauthorizedError,BadRequestError } = require("../utils/errors.js")
jest.mock('bcrypt')
jest.mock('../utils/validate.js')
jest.mock('jsonwebtoken')
const db = require('../db.js')

afterEach(()=> {
    jest.clearAllMocks()
})    




// TEST FOR THE FETCHBYEMAIL FUNCTION
describe("fetch by Email", () => {
    const db = require('../db.js')

    test('should return the parent object for a valid email', async () => {
        // Mock the db.query() response
        const fakeParent = {
          id: 1,
          email: 'test-parent@example.com',
          first_name: 'John',
          last_name: 'Doe',
          parent_phone: '1234567890',
          password: 'hashed_password',
        };
        db.query = jest.fn().mockReturnValue({ rows: [fakeParent] })
        const validEmail = 'test-parent@example.com';
        const parent = await Parent.fetchParentByEmail(validEmail);
        expect(parent).toEqual(fakeParent);
      });

      test('fetch by email should return undefined if email isnt valid', async  () => {
        db.query.mockResolvedValueOnce({ rows: [] });
        const invalidEmail = 'invalidEmail'
        const result =  await Parent.fetchParentByEmail(invalidEmail)
        expect(result).toBeUndefined() 
    })
    
})


describe('authenticate', () => {
    describe("The authenticate/ login", () => {
        // Add any other necessary setup before the tests
      
        // Mock bcrypt.compare
        bcrypt.compare = jest.fn();
      
        test('should return the parent if email and password exist and match in the db', async () => {
          // Mock the validateFields function to avoid throwing errors
          validateFields.mockImplementation(() => {});
      
          // Mock the fetchParentByEmail function to return a valid parent
          const mockParent = {
            id: 0,
            email: 'test-email@test.com',
            first_name: 'test-first_name',
            last_name: 'test-last_name',
            parent_phone: '3476640645',
            password: 'test-hashed-password',
          };
          Parent.fetchParentByEmail = jest.fn().mockResolvedValue(mockParent);
          bcrypt.compare.mockResolvedValue(true);
      
          // Call the authenticate function with valid credentials
          const result = await Parent.authenticate({ email: 'test-email@test.com', password: 'test-password' });
          expect(result).toEqual({
            id: 0,
            email: 'test-email@test.com',
            firstName: 'test-first_name',
            lastName: 'test-last_name',
            parentPhone: '3476640645',
          });
        });
      
        test("should throw UnauthorizedError if user hasn't registered yet", async function () {
          // Mock the validateFields function to avoid throwing errors
          validateFields.mockImplementation(() => {});
      
          // Mock the fetchParentByEmail function to return undefined
          Parent.fetchParentByEmail = jest.fn().mockResolvedValue(undefined);
      
          // Call the authenticate function with invalid email
          try {
            await Parent.authenticate({ email: 'somebody@else.io', password: 'password' });
          } catch (err) {
            // Assertion
            expect(err instanceof UnauthorizedError).toBeTruthy();
            // expect(err.message).toBe('There is no parent registered with this email.');
          }
        });
      
        test("should throw UnauthorizedError if wrong password", async function () {
          // Mock the validateFields function to avoid throwing errors
          validateFields.mockImplementation(() => {});
      
          // Mock the fetchParentByEmail function to return a valid parent
          const mockParent = {
            id: 0,
            email: 'test-email@test.com',
            first_name: 'test-first_name',
            last_name: 'test-last_name',
            parent_phone: '3476640645',
            password: 'test-hashed-password',
          };
          Parent.fetchParentByEmail = jest.fn().mockResolvedValue(mockParent);
      
          // Mock bcrypt.compare to return false since the password doesn't match
          bcrypt.compare.mockResolvedValue(false);
      
          // Call the authenticate function with wrong password
          try {
            await Parent.authenticate({ email: 'test-email@test.com', password: 'wrong' });
          } catch (err) {
            // Assertion
            expect(err instanceof UnauthorizedError).toBeTruthy();
            // expect(err.message).toBe('Invalid password.');
          }
        });
      });
})




describe("Parent register", () => {
    // Add any other necessary setup before the tests
  
    // Mock bcrypt.hash
    bcrypt.hash = jest.fn().mockResolvedValue('dummy-hashed-password'); // Replace with the correct hashed password
    const db = require('../db.js')
    test('should register a new parent successfully', async () => {

      // Mock the validateFields function to avoid throwing errors
      validateFields.mockImplementation(() => {});
  
      // Mock the fetchParentByEmail function to return undefined, indicating that the email is not already registered
      Parent.fetchParentByEmail = jest.fn().mockResolvedValue(undefined);
  
      // Mock the db.query function to return a dummy result for the INSERT operation
      const mockInsertResult = {
        rows: [
          {
            id: 1,
            email: 'test-email@test.com',
            firstName: 'test-first_name',
            lastName: 'test-last_name',
            parentPhone: '3476640645',
          },
        ],
      };
      db.query = jest.fn().mockResolvedValue(mockInsertResult);
  
      // Call the register function with valid credentials
      const result = await Parent.register({
        email: 'test-email@test.com',
        firstName: 'test-first_name',
        lastName: 'test-last_name',
        parentPhone: '3476640645',
        password: 'test-password',
      });
  
      // Assertions
      expect(result).toEqual({
        id: 1,
        email: 'test-email@test.com',
        firstName: 'test-first_name',
        lastName: 'test-last_name',
        parentPhone: '3476640645',
      });
    });
  
    test("should throw BadRequestError if credentials are missing", async function () {
      // Mock the validateFields function to throw an error for missing credentials
      validateFields.mockImplementation(() => {
        throw new BadRequestError('Missing required fields');
      });
  
      // Call the register function with missing credentials
      try {
        await Parent.register({
          email: 'test-email@test.com',
          firstName: 'test-first_name',
          lastName: 'test-last_name',
          parentPhone: '',
          password: '',
        });
      } catch (err) {
        expect(err instanceof BadRequestError).toBeTruthy();
      }
    });
  
    test("should throw BadRequestError if email is already registered", async function () {
      // Mock the validateFields function to avoid throwing errors
      validateFields.mockImplementation(() => {});
  
      // Mock the fetchParentByEmail function to return a valid parent, indicating that the email is already registered
      const mockParent = {
        id: 1,
        email: 'test-email@test.com',
        first_name: 'test-first_name',
        last_name: 'test-last_name',
        parent_phone: '3476640645',
      };
      Parent.fetchParentByEmail = jest.fn().mockResolvedValue(mockParent);
  
      // Call the register function with a duplicate email
      try {
        await Parent.register({
          email: 'test-email@test.com',
          firstName: 'test-first_name',
          lastName: 'test-last_name',
          parentPhone: '3476640645',
          password: 'test-password',
        });
      } catch (err) {
        expect(err instanceof BadRequestError).toBeTruthy();
      }
    });
  });



describe("Parent fetchChildByPhoneNumber", () => {
    // Add any other necessary setup before the tests

  
    test('should fetch child by parent phone number', async () => {
      // Mock the db.query function to return a dummy result for the SELECT operation
      const mockResult = {
        rows: [
          {
            id: 1,
            email: 'child-email@test.com',
            firstName: 'child-first_name',
            lastName: 'child-last_name',
            parentPhone: '3476640645',
          },
        ],
      };
      db.query = jest.fn().mockResolvedValue(mockResult);
  
      // Call the fetchChildByPhoneNumber function with a valid parent phone number
      const result = await Parent.fetchChildByPhoneNumber('3476640645');
  
      // Assertions
      expect(result).toEqual({
        id: 1,
        email: 'child-email@test.com',
        firstName: 'child-first_name',
        lastName: 'child-last_name',
        parentPhone: '3476640645',
      });
    });
  
    test("should throw UnauthorizedError if no child is registered with the given parent phone number", async function () {
      // Mock the db.query function to return an empty result
      const mockResult = {
        rows: [],
      };
      db.query = jest.fn().mockResolvedValue(mockResult);
  
      // Call the fetchChildByPhoneNumber function with a parent phone number that has no child registered
      try {
        await Parent.fetchChildByPhoneNumber('1234567890');
      } catch (err) {
        // Assertion
        expect(err instanceof UnauthorizedError).toBeTruthy();
        expect(err.message).toBe('There is no child registered with your phone number.');
      }
    });
  });
