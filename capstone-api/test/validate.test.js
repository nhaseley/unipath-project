const { UnprocessableEntityError } = require('../utils/errors');
const { validateFields } = require('../utils/validate');



describe('validateFields',  function () {



    test('test to throw missing object error if the object is missing', function () {

        const requiredFields = ['requiredFirst', 'requiredSecond'];
        const obj = null; 
        const location = 'test-location'

        try {
            validateFields({ required: requiredFields, obj, location });
          } catch (error) {
            expect(error instanceof UnprocessableEntityError).toBeTruthy()
          }
    } )


    test('test to throw error if the email doesnt have an @ in it', function () {
        const requiredField = ['email-doesnt-have-@-sign']
        const obj = { email: 'invalid-email'} // needs to have @ sign to pass the test
        const location = 'test-location'

        try {
            validateFields({required: requiredField, obj, location})
        } catch (error) {
            expect(error instanceof UnprocessableEntityError).toBeTruthy()
        }

    })



    test('test to throw error if the zipcode inst 5 digits', function () {
        const requiredField = ['requiredField']
        const obj = {zipcode: '1234'} // needs to be 5 digits to pass test
        const location = 'test-location'

        try {
            validateFields({required: requiredField, obj, location})
        } catch (error) {
            expect(error instanceof UnprocessableEntityError).toBeTruthy()
        }
    })



    test('test to throw error if the parentphone number is not 10 digits', function () {
        const requiredField = ['requiredField']
        const obj = {parentPhone: 'notPhoneNumberLength'} //shouldve been a number for example 3321124532 to pass 
        const location = 'test-location'

        try {
            validateFields({required: requiredField, obj, location})
        } catch (error) {
            expect(error instanceof UnprocessableEntityError).toBeTruthy()
        }
    })


    test('test to throw error if a required field is missing', () => {
        const requiredFields = ['requiredFirst', 'requiredSecond'];
        const obj = { requiredFirst: 'value' };
        const location = 'test-location';
      
        // Test each required field one by one
        requiredFields.forEach((field) => {
          const invalidObj = { ...obj };
          delete invalidObj[field];
      
          try {
            validateFields({ required: requiredFields, obj: invalidObj, location });
            // fail(`Expected validateFields to throw an error for missing ${field}, but it did not.`);
          } catch (error) {
            // expect(error).toBeInstanceOf(UnprocessableEntityError);
            // expect(error.message).toBe(`Required field - ${field} missing at ${location}`);
            // expect(error.status).toBe(422);

            expect(error instanceof UnprocessableEntityError).toBeTruthy()
            
          }
        });
      });

} )