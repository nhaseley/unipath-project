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



// TEST FOR THE FETCHBYEMAIL FUNCTION
describe("fetch by Email", () => {
    const db = require('../db.js')

    test('should return the alum object for a valid email', async () => {
        // Mock the db.query() response
        const fakeAlum = {
            id,
            email, 
            first_name,
            last_name,
            college,
            college_grad_year,
            password 
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
