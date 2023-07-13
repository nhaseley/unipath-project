const Student = require("../models/student.js")



describe("fetch by Email", () => {
    test('fetch by eamil should return user if eamil is valid', async  () => {
        const validEmail = 'test-email@test.com'
        const result =  await Student.fetchStudentByEmail(validEmail)
        expect(result).toStrictEqual({
            id: 0,
            email: 'test-email@test.com',
            first_name: 'test-frist_name',
            last_name: 'test-last_name',
            parent_phone: '3476640645',
            zipcode: '93117',
            password: 'test-password'  

        })
    })


    test('fetch by eamil should return empty if email isnt valid', async  () => {
        const invalidEmail = 'invalidEmail'
        const result =  await Student.fetchStudentByEmail(invalidEmail)
        expect(result).toStrictEqual([])
    })



})




// describe("")