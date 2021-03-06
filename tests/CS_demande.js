
let login = require('../pages/01_CS_login_homepage');
let orga = require('../pages/02_CS_orga_homepage');
let certif = require('../pages/03_CS_certif_homepage');
let personne = require('../pages/04_CS_personne_homepage');
let modal = require('../pages/05_CS_modal_homepage');


describe('ChamberSign - Integ', function () {

    var EC = protractor.ExpectedConditions;

    it('Login', function () {

        login.get('http://integ.chambersign.apsdigit.lan/viseo/view/fr/connexion');

        login.enterEmail('lamri123@yopmail.com');
        login.enterPassword('Azerty123;')
        login.connectGo();

    }); 

    it('Organisation', function () {

        // Vérif présence champ SIREN => Arrivée sur écran Organisation
        browser.wait(EC.presenceOf(element(by.css('[placeholder = "9 chiffres exactement"]')), 5000));

        orga.enterSiren('344553664');
        orga.enterTel('0472241001');

        orga.validGo();

    }); 
    
    //login.get('http://integ.chambersign.apsdigit.lan/viseo/view/fr/nouvelle-demande/-1/certificat');

    it('Certificat', function () {

        // Vérif présence champ Produit => Arrivée sur écran Certificat
        browser.wait(EC.presenceOf(element(by.xpath('//span[@class="ng-star-inserted"]')), 5000));

        // Produit
        certif.selectProduit();

        // Type d'abonnement
        certif.selectTypeAbo();

        // Vérif présence champ Support
        browser.wait(EC.presenceOf(element(by.xpath('//select[@name="supportNumeriqueId"]')), 5000));

        // Support
        certif.selectSupport();

        // Vérif présence champ Lecteur
        browser.wait(EC.presenceOf(element(by.xpath('//select[@name="lecteurNumeriqueId"]')), 5000));

        certif.selectLecteur();

        // Vérif présence champ lieu de retrait
        browser.wait(EC.presenceOf(element(by.xpath('//input[@id="commune"]')), 5000));

        // Lieu de retrait
        certif.enterCommune("breval");
        certif.selectCommune();
        
        // Vérif présence case à cocher éligibilité
        browser.wait(EC.presenceOf(element(by.xpath('//label[contains(.,"Le titulaire souhaite recevoir son certificat sur site.")]')), 5000));

        certif.cocherEligibilite();
        certif.cocherPreRequis();

        certif.validGo();

    });

    //login.get('http://integ.chambersign.apsdigit.lan/viseo/view/fr/nouvelle-demande/-1/personnes');
    
    it('Personne', function () {

        // Vérif présence titre Personnes physiques => Arrivée sur écran Personnes physiques
        browser.wait(EC.presenceOf(element(by.xpath('//strong[contains(.,"Description des personnes physiques")]')), 5000));

        personne.saisieTitulaire("Lamri","LAIB","test@test.com", "Testeur", "Homologation", "0472241001", "0652146985")
        
        personne.presenceRL();

        personne.saisieRL("LamriRL", "LAIBRL", "test_RL@test.com");
        
        personne.presenceDL();

        personne.saisieDL("LamriDL", "LAIBDL", "test_DL@test.com");

        personne.validGo();

    }); 

    it('Modalités', function () {

        // Vérif présence champ bureau d'envoi => Arrivée sur écran Modalités
        browser.wait(EC.presenceOf(element(by.xpath('//select[@name="bureauEnregistrementId"]')), 8000));

         // Bureau d'envoi
         modal.selectBureauEnvoi();

         browser.sleep(5000);
         modal.validGo();

    }); 
});