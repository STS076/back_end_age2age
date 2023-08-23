const request = require('request');
const server = require('server');
const User = require('../app/service/user.service');
const Role = require('../app/service/role.service');
const Sequelize = require('sequelize');
const sqlite = require('sqlite3');
const db = require('../app/db');

initialize();

async function initialize() {
    await new Promise(resolve => setTimeout(() => resolve(), 500));
    await db.Roles.create({role_type: 'user'})
}


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


let pseudo = "totototo"

describe('User Routes', () => {
    beforeAll(async () => {
        await new Promise(resolve => setTimeout(() => resolve(), 3000));

        try{
            await db.User.create({ 
                user_email_address: 'totototo@gmail.com',
                user_phone_number: '0606060606',
                user_pseudo: pseudo,
                user_password: 'jksdrgjebzrb',
                user_firstname: 'toto',
                user_lastname: 'tota',
                user_address: '10 rue Francois Arago',
                user_zip_code: '93100',
                user_city: 'Montreuil',
                user_department: '93',
                role_id: 1,
                user_active: 1,
            }); // Insérer un utilisateur de test

        } catch(e){
            console.log(e)
        }

    });

    it('should get a user by user pseudo', async () => {
        var allUsers = await User.getAll();
        var find = false;

        allUsers = JSON.parse(JSON.stringify(allUsers));
        
        for (var i = 0; i < allUsers.length; i++) {
            if (allUsers[i].user_pseudo == pseudo) {
                find = true;
            }
        }

        expect(find).toBe(true);
    });

    afterAll(async () => {
    });
  
});
  
  
  
  
  
  