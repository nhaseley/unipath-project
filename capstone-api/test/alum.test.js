const Alum = require('../models/alum')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { validateFields } = require("../utils/validate.js")
const { UnauthorizedError,BadRequestError, UnprocessableEntityError } = require("../utils/errors.js")
jest.mock('bcrypt')
jest.mock('../utils/validate.js')
jest.mock('jsonwebtoken')
const db = require('../db.js')

afterEach(()=> {
    jest.clearAllMocks()
})    

afterAll(()=>
jest.clearAllMocks())

// TEST FOR THE FETCHBYEMAIL FUNCTION
describe("fetch by Email", () => {
    // const db = require('../db.js')

    test('should return the alum object for a valid email', async () => {
        // Mock the db.query() response
        const fakeAlum = {
            id: 1,
            email: 'test-alum@email.edu', 
            first_name: 'test-firstName',
            last_name: 'test-lastName',
            college: 'test-college',
            college_grad_year: 2020,
            password: 'hashed-password' 
        };
        db.query = jest.fn().mockReturnValue({ rows: [fakeAlum] })
        const validEmail = 'test-alum@email.edu';
        const alum = await Alum.fetchAlumByEmail(validEmail);
        expect(alum).toEqual(fakeAlum);
      });

      test('fetch by email should return undefined if email isnt valid', async  () => {
        db.query.mockResolvedValueOnce({ rows: [] });
        const invalidEmail = 'invalidEmail'
        const result =  await Alum.fetchAlumByEmail(invalidEmail)
        expect(result).toBeUndefined() 
    })
})






describe('authenticate', () => {
    describe("The authenticate/ login", () => {
        bcrypt.compare = jest.fn();
        test('should return the alum if email and password exist and match in the db', async () => {
          validateFields.mockImplementation(() => {});
          const mockAlum = {
            id: 0,
            email: 'test-email@test.com',
            first_name: 'test-first_name',
            last_name: 'test-last_name',
            password: 'test-hashed-password',
            college: 'test-college',
            college_grad_year: 2020
          };
          Alum.fetchAlumByEmail = jest.fn().mockResolvedValue(mockAlum);
          bcrypt.compare.mockResolvedValue(true);
          const result = await Alum.authenticate({ email: 'test-email@test.com', password: 'test-password' });
          expect(result).toEqual({
            id: 0,
            email: 'test-email@test.com',
            firstName: 'test-first_name',
            lastName: 'test-last_name',
            college: 'test-college',
            collegeGradYear: 2020
          });
        });
      
        test("should throw UnauthorizedError if user hasn't registered yet", async function () {
          validateFields.mockImplementation(() => {});
          Alum.fetchAlumByEmail = jest.fn().mockResolvedValue(undefined);
          try {
            await Alum.authenticate({ email: 'somebody@else.io', password: 'password' });
          } catch (err) {
            expect(err instanceof UnauthorizedError).toBeTruthy();
          }
        });
      
        test("should throw UnauthorizedError if wrong password", async function () {
          validateFields.mockImplementation(() => {});
          const mockAlum = {
            id: 0,
            email: 'test-email@test.com',
            first_name: 'test-first_name',
            last_name: 'test-last_name',
            parent_phone: '3476640645',
            password: 'test-hashed-password',
          };
          Alum.fetchAlumByEmail = jest.fn().mockResolvedValue(mockAlum);
          bcrypt.compare.mockResolvedValue(false);
          try {
            await Alum.authenticate({ email: 'test-email@test.com', password: 'wrong' });
          } catch (err) {
            expect(err instanceof UnauthorizedError).toBeTruthy();
          }
        });
      });
})



describe("Alum register", () => {
    test('should register a new alum', async () => {

      const mockResult = {
        rows: [
          {
            id: 1,
            email: 'alum-email@test.com',
            firstName: 'alum-first_name',
            lastName: 'alum-last_name',
            college: 'Test College',
            collegeGradYear: '2023',
          },
        ],
      };

      db.query = jest.fn().mockResolvedValue(mockResult);
      Alum.fetchAlumByEmail = jest.fn().mockResolvedValue(undefined);

      const result = await Alum.register({
        email: 'alum-email@test.com',
        firstName: 'Alum',
        lastName: 'Person',
        password: 'test-password',
        college: 'Test College',
        collegeGradYear: '2023',
      });

      expect(result).toEqual({
        id: 1,
        email: 'alum-email@test.com',
        firstName: 'alum-first_name',
        lastName: 'alum-last_name',
        college: 'Test College',
        collegeGradYear: '2023',
      });
    });
  

    test("should throw BadRequestError if email or password is missing", async function () {
      // Call the register function with missing email and password
      try {
        await Alum.register({
          firstName: 'Alum',
          lastName: 'Person',
          college: 'Test College',
          collegeGradYear: '2023',
        });
      } catch (err) {
        // Assertion
        expect(err instanceof BadRequestError).toBeTruthy();
      }
    });
  
    test("should throw BadRequestError if email already exists", async function () {
      // Mock the db.query function to return a dummy result for the SELECT operation (email already exists)
      const mockResult = {
        rows: [
          {
            id: 1,
            email: 'alum-email@test.com',
            first_name: 'alum-first_name',
            last_name: 'alum-last_name',
            college: 'Test College',
            college_grad_year: '2023',
          },
        ],
      };
      db.query = jest.fn().mockResolvedValue(mockResult);
  
      // Call the register function with an existing email
      try {
        await Alum.register({
          email: 'alum-email@test.com',
          firstName: 'Alum',
          lastName: 'Person',
          password: 'test-password',
          college: 'Test College',
          collegeGradYear: '2023',
        });
      } catch (err) {
        // Assertion
        expect(err instanceof BadRequestError).toBeTruthy();
      }
    });
  });


  describe("College getColleges", () => {
    test('should return true', async () => {
      // Mock the db.query method to return a dummy value
      db.query = jest.fn().mockResolvedValue({
        rows: true,
      });
  
      // Call the getColleges function
      const result = await Alum.getColleges();
  
      // Assertions
      expect(result).toBe(true);
    });
  });


  describe("College addCollegeReview", () => {
    test('should return the review with correct properties', async () => {
      // Mock the db.query method to return a dummy result
      const mockResult = {
        rows: [
          {
            id: 1,
            user_id: 123,
            first_name: 'John',
            last_name: 'Doe',
            college_name: 'Test College',
            college_grad_year: 2022,
            rating: 5,
            review: 'Great college!',
          },
        ],
      };
      db.query = jest.fn().mockResolvedValue(mockResult);
  
      // Call the addCollegeReview function with mock data
      const result = await Alum.addCollegeReview(
        123, 'John', 'Doe', 'Test College', 2022, 5, 'Great college!'
      );
      // Assertions
      expect(result).toEqual(mockResult.rows); // Check if the returned review matches the expected result
    });
  });



  describe("College getCollegeReviews", () => {
    test('should return the reviews for a college', async () => {
      // Mock the db.query method to return dummy reviews
      const mockResult = {
        rows: [
          {
            id: 1,
            user_id: 123,
            first_name: 'John',
            last_name: 'Doe',
            college_name: 'Test College',
            college_grad_year: 2022,
            rating: 5,
            review: 'Great college!',
          },
          {
            id: 2,
            user_id: 456,
            first_name: 'Jane',
            last_name: 'Smith',
            college_name: 'Test College',
            college_grad_year: 2021,
            rating: 4,
            review: 'Good experience!',
          },
        ],
      };
      db.query = jest.fn().mockResolvedValue(mockResult);
  
      // Call the getCollegeReviews function with a mock college name
      const college = 'Test College';
      const result = await Alum.getCollegeReviews(college);
  
      // Assertions
      expect(result).toEqual(mockResult.rows); // Check if the returned reviews match the expected result
    });
  });

