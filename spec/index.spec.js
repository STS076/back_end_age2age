const User = require('../app/service/user.service');
const Role = require('../app/service/role.service');
const Advert = require('../app/service/advert.service');
const db = require('../app/db');

initialize();

async function initialize() {
    await new Promise(resolve => setTimeout(() => resolve(), 500));
    await db.Roles.create({role_type: 'user'})
    await db.Roles.create({role_type: 'modérateur'})
    await db.Roles.create({role_type: 'admin'})

    await db.Categories.create({category_type: 'Véhicules'})
    await db.Categories.create({category_type: 'Immobilier'})
    await db.Categories.create({category_type: 'Multimédia'})
}


const { phoneValidation, emailValidation } = require('../app/service/user.service');
const adverts = require('../app/model/Adverts');
let phoneNumberIncorrect = "g"
let phoneNumberCorrect = "0667495721"

describe('Test pour check les numéro de téléphones', function () {
    it('Si le format est bon', function () {
        expect(phoneValidation(phoneNumberCorrect)).toBe(true);
    });
    it('Si le format n\est pas bon', function () {
        expect(phoneValidation(phoneNumberIncorrect)).toBe(false);
    });
});

let emailCorrect = "toto@gmail.com"
let emailIncorrect = "jksdrgjebzrb"

describe('Test pour check les emails', function () {
    it('Si le format est bon', function () {
        expect(emailValidation(emailCorrect)).toBe(true);
    });
    it('Si le format n\'est pas bon', function () {
        expect(emailValidation(emailIncorrect)).toBe(false);
    });
});

(async () => {

    let pseudo = "totototo"
    let roleExpected = 2;
    var idUser = null;
    describe('Test Utilisateurs', () => {
        beforeAll(async () => {
            await new Promise(resolve => setTimeout(() => resolve(), 2000));
    
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
                }); 
    
            } catch(e){
                console.log(e)
            }
    
        });

    
        it('Créer un utilisateur', async () => {
            
            var allUsers = await User.getAll();
            var find = false;
    
            allUsers = JSON.parse(JSON.stringify(allUsers));
            
            for (var i = 0; i < allUsers.length; i++) {
                if (allUsers[i].user_pseudo == pseudo) {
                    find = true;
                    idUser = allUsers[i].user_id;
                }
            }
    
            expect(find).toBe(true);
        });

        it('Changer le role de l\'utilisateur', async () => {
            await new Promise(resolve => setTimeout(() => resolve(), 400));

            if(idUser == null){
                var allUsers = await User.getAll();
                allUsers = JSON.parse(JSON.stringify(allUsers));
                for (var i = 0; i < allUsers.length; i++) {
                    if(allUsers[i].user_id > idUser){
                        idUser = allUsers[i].user_id;
                    }
                }
            }
            await User.updateUserRole(idUser, roleExpected);
            var user = await User.getById(idUser);
            user = user[0]
            expect(user.role_id).toBe(roleExpected);
            
        });
    
        afterAll(async () => {
        });
      
    });


    describe('Test Annonces', () => {

        let title = "test"
        let description = "test2"
        var advertId = null;
        beforeAll(async () => {
            await new Promise(resolve => setTimeout(() => resolve(), 2000));
    
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
                }); 
            } catch(e){
            }
            try{
                await db.Advert.create({ 
                    advert_title: title,
                    advert_description: 'test1',
                    advert_active: 1,
                    advert_archive: 0,
                    advert_selected: 0,
                    advert_address: '10 rue Francois Arago',
                    advert_zip_code: '93100',
                    advert_city: 'Montreuil',
                    advert_department: '93',
                    advert_longitude: 0,
                    advert_latitude: 0,
                    category_id: 1,
                    user_id_create: 1,
                    user_id_select: 1,

                }); 
    
            } catch(e){
                console.log(e)
            }
    
        });

    
        it('Créer une annonce', async () => {
            await new Promise(resolve => setTimeout(() => resolve(), 400));
            
            var allAdvert = await Advert.findByTitle(title);

            expect(allAdvert.length > 0).toBe(true);
        });

        it('Modifier une annonce', async () => {
            await new Promise(resolve => setTimeout(() => resolve(), 800));

            if(advertId == null){
                var allAdvert = await Advert.findByTitle(title);
                allAdvert = JSON.parse(JSON.stringify(allAdvert));
                for (var i = 0; i < allAdvert.length; i++) {
                    if(allAdvert[i].advert_id > advertId){
                        advertId = allAdvert[i].advertId;
                    }
                }
            }
            var advertChange = await Advert.findByTitle(title);
            var idAdvert = advertChange[0].advert_id;

            await Advert.update(idAdvert, {advert_description: description});

            var advertChange = await Advert.findByTitle(title);
            advertChange = advertChange[0]

            expect(advertChange.advert_description).toBe(description);
            
        });

        afterAll(async () => {
        });
      
    });




    describe('Test Roles', () => {
        let title = "Jouets"

        beforeAll(async () => {
            await new Promise(resolve => setTimeout(() => resolve(), 3000));
    
            try{
                await db.Roles.create({ 
                    role_type: title,

                });
    
            } catch(e){
                console.log(e)
            }
    
        });

    
        it('Créer un role', async () => {
            await new Promise(resolve => setTimeout(() => resolve(), 400));
            
            var allRoles = await Role.findAll();

            allRoles = JSON.parse(JSON.stringify(allRoles));
            var find = false;

            for (var i = 0; i < allRoles.length; i++) {
                if (allRoles[i].role_type == title) {
                    find = true;
                }
            }

            expect(find).toBe(true);

        });

        afterAll(async () => {
        });
      
    });
    
      
})();
  
  
  
  