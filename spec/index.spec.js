const request = require('request');
const server = require('server');

const advert = 'http://localhost:3000/adverts';


const { phoneValidation, findEmail } = require('../app/service/user.service');
const adverts = require('../app/model/Adverts');
let phoneNumberIncorrect = "g"
let phoneNumberCorrect = "0667495721"

describe('user inscription test', function () {
    it('should find true when telephone number format is correct', function () {
        expect(phoneValidation(phoneNumberCorrect)).toBe(true);
    });
    it('should find false when telephone number format is incorrect', function () {
        expect(phoneValidation(phoneNumberIncorrect)).toBe(false);
    });
});
