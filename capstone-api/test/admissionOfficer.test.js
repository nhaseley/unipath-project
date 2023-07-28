const AdmissionOfficer = require('../models/admissionOfficer')
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

afterAll(()=>
jest.clearAllMocks())


describe("AdmissionOfficer fetchAdmissionOfficerByEmail", () => {
    test('should return the admission officer with the given email', async () => {
      const mockResult = {
        rows: [
          {
            id: 1,
            work_email: 'john.doe@example.com',
            first_name: 'John',
            last_name: 'Doe',
          },
        ],
      };
      db.query = jest.fn().mockResolvedValue(mockResult);
      const email = 'john.doe@example.com';
      const result = await AdmissionOfficer.fetchAdmissionOfficerByEmail(email);
      expect(result).toEqual(mockResult.rows[0]);
    });
  
    test('should return undefined if the admission officer is not found', async () => {
      const mockResult = {
        rows: [],
      };
      db.query = jest.fn().mockResolvedValue(mockResult);
      const email = 'nonexistent@example.com';
      const result = await AdmissionOfficer.fetchAdmissionOfficerByEmail(email);
      expect(result).toBeUndefined();
    });
  });


  describe('authenticate', () => {
    describe("The authenticate/ login", () => {

        const expectedPassword = 'test-password';
        // Mock bcrypt.hash
        bcrypt.hash.mockImplementation(async (password) => password);
        // Mock bcrypt.compare
        bcrypt.compare.mockImplementation(async (plainTextPassword, hashedPassword) => plainTextPassword === expectedPassword);

        
        // test('should return the officer if email and password exist and match in the db', async () => {
        //   validateFields.mockImplementation(() => {});

        //   const mockOfficer = {
        //     id: 0,
        //     email: 'test-email@test.com',
        //     firstName: undefined,
        //     lastName: undefined,
        //     password: 'test-password',
        //     college: 'test-college'
        //   };
        //   AdmissionOfficer.fetchAdmissionOfficerByEmail = jest.fn().mockReturnValue(mockOfficer)
        //   bcrypt.compare.mockResolvedValue(true);
        //   const result = await AdmissionOfficer.authenticate({ email: 'test-email@test.com', password: 'test-password' });
        //   expect(result).toEqual({
        //     id: 0,
        //     email: 'test-email@test.com',
        //     firstName: 'test-first_name',
        //     lastName: 'test-last_name',
        //     college: 'test-college'
        //   });
        // });
      
        test("should throw UnauthorizedError if user hasn't registered yet", async function () {
          validateFields.mockImplementation(() => {});
          AdmissionOfficer.fetchAdmissionOfficerByEmail = jest.fn().mockResolvedValue(undefined);
          try {
            await AdmissionOfficer.authenticate({ email: 'somebody@else.io', password: 'password' });
          } catch (err) {
            expect(err instanceof UnauthorizedError).toBeTruthy();
          }
        });
      
        test("should throw UnauthorizedError if wrong password", async function () {
          validateFields.mockImplementation(() => {});
          const mockOfficer = {
            id: 0,
            email: 'test-email@test.com',
            first_name: 'test-first_name',
            last_name: 'test-last_name',
            password: 'test-password',
            college: 'test-college'
          };
          AdmissionOfficer.fetchAdmissionOfficerByEmail = jest.fn().mockResolvedValue(mockOfficer);
          bcrypt.compare.mockResolvedValue(false);
          try {
            await AdmissionOfficer.authenticate({ email: 'test-email@test.com', password: 'wrong' });
          } catch (err) {
            expect(err instanceof UnauthorizedError).toBeTruthy();
          }
        });
      });
})


