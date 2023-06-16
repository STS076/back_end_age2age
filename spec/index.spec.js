const request = require('request');
const server = require('server');

const advert = 'http://localhost:3000/adverts';


const { phoneValidation, emailValidation } = require('../app/service/user.service');
const adverts = require('../app/model/Adverts');
let phoneNumberIncorrect = "g"
let phoneNumberCorrect = "0667495721"

describe('check phone number test', function () {
    it('should find true when telephone number format is correct', function () {
        expect(phoneValidation(phoneNumberCorrect)).toBe(true);
    });
    it('should find false when telephone number format is incorrect', function () {
        expect(phoneValidation(phoneNumberIncorrect)).toBe(false);
    });
});

let emailCorrect = "toto@gmail.com"
let emailIncorrect = "jksdrgjebzrb"

describe('check email test', function () {
    it('should find true when email format is correct', function () {
        expect(emailValidation(emailCorrect)).toBe(true);
    });
    it('should find false when email format is incorrect', function () {
        expect(emailValidation(emailIncorrect)).toBe(false);
    });
});