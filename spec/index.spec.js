const request = require('request');
const server = require('server');

const advert = 'http://localhost:3000/adverts';

describe('advert', function () {
    it('should return 200 response code', function (done) {
        request.get(advert, function (error, response) {
            expect(response.statusCode).toEqual(200);
            done();
        });
    });

    it('should fail on POST', function (done) {
        request.post(advert, { json: true, body: {} }, function (error, response) {
            expect(response.statusCode).toEqual(400);
            done();
        });
    });

    it('should return 200 response code', function (done) {
        request.get(advert, function (error, response) {
            expect(response.statusCode).toEqual(200);
            done();
        });
    });

});


const { phoneValidation, findEmail } = require('../app/service/user.service');
const adverts = require('../app/model/Adverts');
let phoneNumberIncorrect = "g"
let phoneNumberCorrect = "0667495721"

describe('user inscription test', function () {
    it('should find true when telephone number format is correct', function () {
        expect(phoneValidation("0667495721")).toBe(true);
    });
    it('should find false when telephone number format is incorrect', function () {
        expect(phoneValidation("g")).toBe(false);
    });
    it('should find true when two mails are the same', function () {
        findEmail("estlpatry76@gmail.com").then((result) => {
            expect(result).toBe(true);
        });
    });
});

// describe('simple tests', () => {

//     it('should find true when find two same mails on inscription', () => {
//         expect(true).toBe(true);
//     });

//     it('should find false to be different from true', () => {
//         expect(false).not.toBe(true);
//     });
// });
