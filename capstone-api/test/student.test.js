const Student = require("../models/student.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { validateFields } = require("../utils/validate.js")
const { UnauthorizedError,BadRequestError, UnprocessableEntityError } = require("../utils/errors.js")
jest.mock('bcrypt')
jest.mock('../utils/validate.js')
jest.mock('jsonwebtoken')

const db = require('../db.js')






// TEST FOR THE FETCHBYEMAIL FUNCTION
describe("fetch by Email", () => {
    test('fetch by email should return user if email is valid', async  () => {
        const validEmail = 'test-email@test.com'
        const result =  await Student.fetchStudentByEmail(validEmail)
        expect(result).toStrictEqual({
            id: 0,
            email: 'test-email@test.com',
            first_name: 'test-first_name',
            last_name: 'test-last_name',
            parent_phone: '3476640645',
            zipcode: '93117',
            password: 'test-password',
            sat_score: '1440',
            act_score: '31',
            enrollment: 350,
            school_type: 'test-school_type'
            
        })
    })
    test('fetch by email should return undefined if email isnt valid', async  () => {
        const invalidEmail = 'invalidEmail'
        const result =  await Student.fetchStudentByEmail(invalidEmail)
        expect(result).toBeUndefined()
    })
    
})




// TEST FOR THE AUTHENTICATE FUNCTION
describe("the authenticate/ login", () => {
    const expectedPassword = 'test-password';
    bcrypt.hash.mockImplementation(async (password) => password);
    bcrypt.compare.mockImplementation(async (plainTextPassword, hashedPassword) => plainTextPassword === expectedPassword);
    
    test('authenticate should return the user if email and password exists and match in the db', async () => {
        const result = await Student.authenticate({email:'test-email@test.com', password: 'test-password' })
        expect(result).toStrictEqual({
            id: 0,
            email: 'test-email@test.com',
            firstName: 'test-first_name',
            lastName: 'test-last_name',
            parentPhone: '3476640645',
            zipcode: '93117',
            satScore: '1440',
            actScore: '31',
            enrollment: 350,
            schoolType: 'test-school_type'
        })    
    })    
    
    test("if user hasn't registered yet", async function () {
        try {
            await Student.authenticate({ email: "somebody@else.io", password: "password" })
        } catch (err) {
            expect(err instanceof UnauthorizedError).toBeTruthy()
        }    
    })    
    
    
    test("send unauthorized if wrong password", async function () { 
        try {
            await Student.authenticate({ email: "test-email@test.com", password: "wrong" })
        } catch (err) {
            expect(err instanceof UnauthorizedError).toBeTruthy()
        }  
    })
})    




//TEST FOR THE REGISTER FUNCTION

describe("the register function test",  () =>  {
    const newStudent = {
        email: 'register-email@test.com',
        firstName: 'register-first_name',
        lastName: 'register-last_name',
        parentPhone: '9293469542',
        zipcode: '49104',
        examScores: {
            satScore: 1400,
            actScore: 30
        },    
        enrollment: 500,
        schoolType: 'register-school_type',
        password: 'register-test_password'
    }  
    // Mock the database query to return the new student data
    const mockInsertResult = {
        rows: [{
            id: 1,
            email: newStudent.email,
            first_name: newStudent.firstName.toLowerCase(),
            last_name: newStudent.lastName.toLowerCase(),
            parent_phone: newStudent.parentPhone,
            zipcode: newStudent.zipcode,
            sat_score: newStudent.examScores.satScore,
            act_score: newStudent.examScores.actScore,
            enrollment: newStudent.enrollment,
            school_type: newStudent.schoolType,
            password: newStudent.password
        }]    
    }; 

    
    beforeAll(() => {       
         const db = require('../db.js')      
    db.query = jest.fn().mockReturnValue(mockInsertResult)
    Student.fetchStudentByEmail = jest.fn().mockReturnValue(undefined);
}) 

    
    
    afterAll(()=> {
        jest.clearAllMocks()
    })    
    
    
    test('test to see if a new student will be able to register', async function () { 
        const result = await Student.register(newStudent);
        expect(result).toStrictEqual({
            id: 1,
            email: newStudent.email,
            first_name: newStudent.firstName.toLowerCase(),
            last_name: newStudent.lastName.toLowerCase(),
            parent_phone: newStudent.parentPhone,
            zipcode: newStudent.zipcode,
            sat_score: newStudent.examScores.satScore,
            act_score: newStudent.examScores.actScore,
            enrollment: newStudent.enrollment,
            school_type: newStudent.schoolType,
            password: newStudent.password
        });    
    });    
    
    
    
    test('test to see if the email has already been used to register', async function () {
        const invalidCreds = {
            email: 'alreadyused@test.com',
            firstName: 'already-Fname_test',
            lastName: 'already-Lname_test',
            parentPhone: '4563342112',
            zipcode: '67901',
            password: 'already-test_password',
            examScores: {
                satScore: 1240,
                actScore: 28
            },    
            enrollment: 680,
            schoolType: 'already-school_type'
        };   
        Student.fetchStudentByEmail = jest.fn().mockReturnValue({
            email: 'alreadyused@test.com',
            first_name: 'already-Fname_test',
            last_name: 'already-Lname_test',
            parent_phone: '4563342112',
            zipcode: '67901',
            password: 'already-test_password',
            sat_score: 1240,
            act_score: 28,
            enrollment: 680,
            school_type: 'already-school_type'
        })    
        bcrypt.hash.mockImplementation(async (password) => password);
        try {
            await Student.register(invalidCreds)
        } catch (error) {
            expect(error instanceof BadRequestError).toBeTruthy()
        }                     
    })    
    
    

    test('test to throw the BadRequestError if there isnt an email or a password', async function () {
        const emptyEmailCreds = {
            email: null,
            firstName: 'already-Fname_test',
            lastName: 'already-Lname_test',
            parentPhone: '4563342112',
            zipcode: '67901',
            password: 'already-test_password',
            examScores: {
                satScore: 1240,
                actScore: 28
            },    
            enrollment: 680,
            schoolType: 'already-school_type'
        };    
        validateFields.mockImplementation(() => {})
        try {
            await Student.register(emptyEmailCreds)
        } catch (error) {
            expect(error instanceof BadRequestError).toBeTruthy()
        }    
    })    
})    




describe('LikedFunctions', () => {

    beforeEach(() => {
        db.query.mockReset();
      });
    test('test for LikeCollege to return user', async function () {
        db.query.mockResolvedValue({
            rows: [
              {
                id: 1,
                user_id: 0,
                name: 'test-college_name',
              },
            ],
          });
        const validId = 0
        const validCollege = 'test-college_name'
        const result = await Student.likeCollege(validId, validCollege)
        expect(result).toEqual({
            id: 1,
            user_id: 0,
            name: 'test-college_name'
        })
        
    })
})



describe('getLikedColleges', () => {

    beforeEach(() => {
        db.query.mockReset();
      });
      test('test for getLikedColleges to return', async function (){
        db.query.mockResolvedValue({
            rows:{
                id: 2,
                user_id: 1,
                name: 'test-collegeLiked_name',
              }
          });
          const validId = 1;
          const result = await Student.getLikedColleges(validId)
          expect(result).toEqual({
              id: 2,
              user_id: 1,
              name: 'test-collegeLiked_name'
          })
      })

      test('should throw an error if the database query fails', async () => {
        const student_id = 3;
        // Mock the query function to throw an error
        db.query.mockRejectedValue(new Error('Database query failed'));
        try {
          await Student.getLikedColleges(student_id);
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error.message).toBe('Database query failed');
        }
      });
    
})



describe("getCollegeFeed", () => {

    beforeEach(() => {
        db.query.mockReset();
      });
    test("should return colleges for users depending on sats", async function () {
        const validSatScore = 1450;
        const mockData = {
            rows: [
               { name: 'Test University', sat_score: 1360},
               { name: 'Test College', sat_score: 1400}
            ]}
        db.query.mockResolvedValue(mockData);
        const result = await Student.getCollegeFeed(validSatScore);
    expect(result).toEqual(mockData.rows);
    })


      test('should return an empty array if no colleges are found within the specified range', async () => {
        const validSatScore = 1500; 
        const mockData = { rows: [] };
        db.query.mockResolvedValue(mockData);
        const result = await Student.getCollegeFeed(validSatScore);
        expect(result).toEqual([]);
      });

})




describe('getCollege', ()=> {

    test('should return colleges liked by user in the past', async function () {
        const validCollegeName = 'Testing University'
        const mockInfo = {rows: [
            {name: 'Testing University', sat_score: 1450},
        ]}
        db.query.mockResolvedValue(mockInfo);
            // Call the function and expect the result
    const result = await Student.getCollege(validCollegeName);
    expect(result).toEqual(mockInfo.rows[0]);
    })

    test('should return empty if college isnt found', async function () {
        const collegeName ='Test University'
        const mockInfo = { rows: []}
        db.query.mockResolvedValue(mockInfo)
        const result = Student.getCollege(collegeName)
        expect(result).toBeUndefined
    })


})


describe('getSumRegistrants', () => {

    test('should return 0 if no attendees', async  function () {
      // Mock the result of db.query for when no attendees are found
      db.query.mockResolvedValueOnce({ rows: [{ sum: null }] });
      const eventId = 123;
      const result = await Student.getSumRegistrants(eventId);
      expect(result).toBe(0);
    });
  
    test('should return the sum of attendees', async function  () {
      // Mock the result of db.query for when there are attendees
      db.query.mockResolvedValueOnce({ rows: [{ sum: '5' }] });
      const eventId = 456; 
      const result = await Student.getSumRegistrants(eventId);
      expect(result).toBe(5); // Converted to integer
    });
  });





  describe('getMaxRegistrants', () => {
    
    test('should return the max number of possible registrants', async function () {
        db.query.mockResolvedValue({ rows: [{ max_registrants: 100 }]})
        const eventId = 2;
        const result = await Student.getMaxNumRegistrants(eventId)
        expect(result).toBe(100)
    })
  })



  describe('getAllEvents', () => {

    test('should return all events', async function () {
      // Set up mocks and data
      const mockEvents = [
        { id: 1, name: 'Event 1', description: 'Description 1' },
        { id: 2, name: 'Event 2', description: 'Description 2' },
      ];
      db.query.mockResolvedValue({ rows: mockEvents });
      const result = await Student.getAllEvents();
      expect(result).toEqual(mockEvents);
    });

  });





  describe('fetchEventAttendeeById', () => {
  
    test('should return the attendee if studentId and eventId match', async function () {
      // Set up mocks and data
      const mockStudent = {
        id: 1,
        student_id: 123,
        event_id: 456,
        first_name: 'test-event-first-name',
        last_name: 'test-event-last-name',
        num_attendees: 3
      };
      db.query.mockResolvedValue({ rows: [mockStudent] });
      const result = await Student.fetchEventAttendeeById(123, 456);
      expect(result).toEqual(mockStudent);
    });
});


describe('removeEventRegistration', () => {
    test('should return true if registration is successfully removed', async () => {
      // Set up mocks and data
      const mockResult = { rowCount: 1 };
      db.query.mockResolvedValue(mockResult);
      const result = await Student.removeEventRegistration(123, 456);
      expect(result).toBe(true);
    });
});


describe('getOldSATScore', () => {  
    test('should return the old SAT score if a matching new SAT score is found', async () => {
      // Set up mocks and data
      const mockResult = { rows: [{ oldsat: 1500 }] };
      db.query.mockResolvedValue(mockResult);
      const result = await Student.getOldSATScore(1600);
      expect(result).toBe(1500);
    });
});


describe('getNewCollegeSATScore', () => {
    test('should return the new SAT score if a matching old SAT score is found', async () => {
      // Set up mocks and data
      const mockResult = { rows: [{ newsat: 1550 }] };
      db.query.mockResolvedValue(mockResult);
      const result = await Student.getNewCollegeSATScore(1600);
      expect(result).toBe(1550);
    });
});





describe('registerForEvent', () => {
        test('should register for event if there are available spots', async () => {
        // Set up mocks and data
        const studentId = 1;
        const firstName = 'John';
        const lastName = 'Doe';
        const numAttendees = 1;
        const eventId = 123;
        
        Student.fetchEventAttendeeById = jest.fn().mockResolvedValue(undefined); // No existing registration
        Student.getMaxNumRegistrants = jest.fn().mockResolvedValue(50)
        Student.getSumRegistrants = jest.fn().mockResolvedValue(30) // 20 spots left
      const mockInsertResult = { rows: [{ id: 1234 }] };
      db.query.mockResolvedValue(mockInsertResult);
      const result = await Student.registerForEvent(studentId, firstName, lastName, numAttendees, eventId);
      expect(result).toEqual({ id: 1234 });
    });
});  
