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
        bcrypt.hash.mockImplementation(async (password) => password);
        bcrypt.compare.mockImplementation(async (plainTextPassword, hashedPassword) => plainTextPassword === expectedPassword);

        test('authenticate should return the user if email and password exists and match in the db', async function () {
          validateFields.mockImplementation(() => {});
          const mockAdmin = {
            id: 0,
            work_email: 'test-email@test.com',
            first_name: 'test-first_name',
            last_name: 'test-last_name',
            college_name: 'test-college',
            password: 'test-hashed-password'
          }

          AdmissionOfficer.fetchAdmissionOfficerByEmail = jest.fn().mockResolvedValue(mockAdmin)
          const result =  await AdmissionOfficer.authenticate( {email: 'test-email@test.com', password: 'test-password'} )
    
          expect(result).toEqual({
            id: 0,
            email: 'test-email@test.com', 
            firstName: 'test-first_name',
            lastName: 'test-last_name',
            collegeName: 'test-college'   
        })
        })
        
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






describe("Admin register", () => {
  const db = require('../db.js')

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });


  test('should register a new Admin successfully', async () => {

    validateFields.mockImplementation(() => {});
    // Mock the fetchAdmissionOfficerByEmail function to return undefined, indicating that the email is not already registered
    AdmissionOfficer.fetchAdmissionOfficerByEmail = jest.fn().mockResolvedValue(undefined);


    

    const expectedRow = {
      id: 1,
      work_email: 'testing@email.com',
      first_name: 'testingFirstName',
      last_name: 'testingLastName',
      college_name: 'Test-College',
    };

    
    db.query = jest.fn().mockResolvedValue({rows: [expectedRow]});


    const creds = {
      email: 'testing@email.com',
      firstName: 'testingFirstName',
      lastName: 'testingLastName',
      collegeName: 'Test-College',
      password: 'test-password'
    };
    const result = await AdmissionOfficer.register( creds);
    expect(result).toEqual({
      id: 1,
      work_email: 'testing@email.com',
      first_name: 'testingFirstName',
      last_name: 'testingLastName',
      college_name: 'Test-College' 
      });
  });



  test("should throw BadRequestError if credentials are missing", async function () {
    // Mock the validateFields function to throw an error for missing credentials
    validateFields.mockImplementation(() => {
      throw new BadRequestError('Missing required fields');
    });

    // Call the register function with missing credentials
    try {
      await AdmissionOfficer.register({
        email: 'test-email@test.com',
        firstName: 'test-first_name',
        lastName: 'test-last_name',
        collegeName: '',
      });
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });

  test("should throw BadRequestError if email is already registered", async function () {
    // Mock the validateFields function to avoid throwing errors
    validateFields.mockImplementation(() => {});

    // Mock the fetchParentByEmail function to return a valid parent, indicating that the email is already registered
    const mockAdmission = {
      id: 1,
      work_email: 'test-email@test.com',
      first_name: 'test-first_name',
      last_name: 'test-last_name',
      college_name: 'test-college',
    };
    AdmissionOfficer.fetchAdmissionOfficerByEmail = jest.fn().mockResolvedValue(mockAdmission);

    // Call the register function with a duplicate email
    try {
      await AdmissionOfficer.register({
        work_email: 'test-email@test.com',
        first_name: 'test-first_name',
        last_name: 'test-last_name',
        college_name: 'test-college'
      });
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});



describe('getCollegeEvents', () => {

  test('should return events for a specific college', async () => {
    // Set up mocks and data
    const college = 'Sample University';
    const mockQueryResult = {
      rows: [
        { id: 1, name: 'Event 1', description: 'Description 1', organizer_email: 'organizer@example.edu', college: college },
        { id: 2, name: 'Event 2', description: 'Description 2', organizer_email: 'organizer@example.edu', college: college },
      ]
    };
    db.query.mockResolvedValue(mockQueryResult);
    const result = await AdmissionOfficer.getCollegeEvents(college);
    expect(result).toEqual(mockQueryResult.rows);
  });
});



describe('getEventAttendees', () => {
  test('should return attendees for a specific event', async () => {
    // Set up mocks and data
    const eventId = 1;
    const mockQueryResult = {
      rows: [
        { id: 1, student_id: 123, first_name: 'John', last_name: 'Doe', event_id: 1, numOfAttendees: 2  },
        { id: 2, student_id: 456, first_name: 'Jane', last_name: 'Smith', event_id: 1, numOfAttendees: 3 },
      ]
    };
    db.query.mockResolvedValue(mockQueryResult);
    const result = await AdmissionOfficer.getEventAttendees(eventId);
    expect(result).toEqual(mockQueryResult.rows);
  });
});






