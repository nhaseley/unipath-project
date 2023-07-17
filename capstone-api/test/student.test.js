const Student = require("../models/student.js")
const bcrypt = require("bcrypt")
jest.mock('bcrypt')
const { UnauthorizedError } = require("../utils/errors.js")








// TEST FOR THE FETCHBYEMAIL FUNCTION

describe("fetch by Email", () => {
    test('fetch by email should return user if eamil is valid', async  () => {
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
            sat_score: 1440,
            act_score: 31
            
        })
    })
    
    test('fetch by eamil should return undefined if email isnt valid', async  () => {
        const invalidEmail = 'invalidEmail'
        const result =  await Student.fetchStudentByEmail(invalidEmail)
        expect(result).toBeUndefined()
    })
    
})






// TEST FOR THE AUTHENTICATE FUNCTION

const expectedPassword = 'test-password';

// Mock bcrypt.hash
bcrypt.hash.mockImplementation(async (password) => password);

// Mock bcrypt.compare
bcrypt.compare.mockImplementation(async (plainTextPassword, hashedPassword) => plainTextPassword === expectedPassword);


describe("the authenticate/ login", () => {
    
    test('authenticate should return the user if email and password exists and match in the db', async () => {
        const result = await Student.authenticate({email:'test-email@test.com', password: 'test-password' })
        expect(result).toStrictEqual({
            id: 0,
            email: 'test-email@test.com',
            firstName: 'test-first_name',
            lastName: 'test-last_name',
            parentPhone: '3476640645',
            zipcode: '93117',
            satScore: 1440,
            actScore: 31,
            enrollment: undefined,
            schoolType: undefined
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
    
    let db
    
    beforeAll(()=>{
        const db = require('../db.js')
        
        db.query = jest.fn().mockReturnValue(mockInsertResult)
        
        Student.fetchStudentByEmail = jest.fn().mockReturnValue(undefined);
})

afterAll(()=> {
    jest.clearAllMocks()
})
    
    
    test('test to see if a new student will be able to register', async function () {
        
        
        
              

              const result = await Student.register(newStudent);
              expect(result).toEqual({
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
          





        // const student = await Student.register({...newStudent, password: 'password'})

        // expect(newStudent.firstName).toStrictEqual(student.first_name)
        // expect(newStudent.lastName).toStrictEqual(student.last_name)
        // expect(newStudent.email).toStrictEqual(student.email)

    // })

})
