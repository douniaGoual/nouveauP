/*************************************************************************************************************************************************************************************************************************************************************************************
 *********************************************************** DEBUT DU MODULE REQUIRE ************************************************************************************************************************************************************************************************/

// Express.js est un framework pour construire des applications web basées sur Node.js et pour le développement de serveurs.
var express = require('express')


// Le routage consiste à déterminer comment une application répond à une demande client adressée à un noeud final particulier, à savoir un URI (ou chemin) et une méthode de requête HTTP spécifique (GET, POST, etc.).
//Chaque route peut avoir une ou plusieurs fonctions de gestionnaire, qui sont exécutées lorsque la route est appariée.
var client = express.Router();


// jsonwebtoken : un paquet de jetons Web JSON pour gérer l'authentification de l'utilisateur
const jwt = require('../node_modules/jsonwebtoken');
// bcrypt : une bibliothèque pour aider à hacher les mots de passe pour les utilisateurs avant de les stoker dans la base donnees 
const bcrypt =  require('../node_modules/bcrypt')



var db = require('../database/db')

//** NODEMAILER ** /

//******** */ rappele la dependence la le mailer *******//
const nodemailer = require('nodemailer')
// *******rappele la dependence issi sendgridTransport *********//
const sendgridTransport = require('nodemailer-sendgrid-transport')
// ************* 
const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:'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'
    }
}))

//**  FIN NODEMAILER *** */





/*************************************************************************************************************************************************************************************************************************************************************************************
 *********************************************************** DEBUT DU MODULE ROUTE ************************************************************************************************************************************************************************************************/

// La process.env propriété retourne un objet contenant l'environnement utilisateur
process.env.SECRET_KEY= "secret";
console.log(process.env.SECRET_KEY);

/*************************************************************************************************************************************************************************************************************************************************************************************
 ************************************************************** Debut Methods POST ***************************************************************************************************************************************************************************************************/


/******************************************************************* REGISTER********************************/


// CELA PERMET DE RENTRER UN NOUVEAU CLIENT DANS LA BASE DE DONNES SUITE A CELA ON DOIT VERIFIER VIA POSTMAN 
// CRÉATION DU CHEMIN ,REQ QUI CONTIENDRA TOUTES LES VALEURS ENVOYÉ DEPUIS LE SITE INTERNET
client.post("/nouveauclient",(req, res) => {
    const infobase = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        numero_telephone : req.body.numero_telephone,
        adresse: req.body.adresse,
        ville: req.body.ville,
        code_postal: req.body.code_postal,
        password: req.body.password,
        confirmationpassword :req.body.confirmationpassword
    }; 

     // Trouve si l'user existe ou non à partir de son email
    // select * from tbl_client where email = 'dounia.goual@gmail.com'

db.client.findOne({
        where: {email: req.body.email}
    })
        .then(client => {
            // ICI CLIENT FAIT REFERENCE A LA REPONSE DE LA LIGNE 61
            if (!client ) {
                // FAIRE LE HASK DU MOT DE PASSE DANS BRYPT ,SALT 10
                //Le salt 10 ,ICI EST PLACÉ DANS LE CONSTANCE LE RÉSULTAT QUI SERA CRYPTÉ GRACE A 
                const hash = bcrypt.hashSync(infobase.password, 10);
                // pour la confirmation du password
                const confirmation = bcrypt.hashSync(infobase.confirmationpassword, 10);
                infobase.password = hash;
                infobase.confirmationpassword = confirmation;


                db.client.create(infobase)
                    .then(client => {
                        transporter.sendMail({
                     // je vais envoyer un mail
                            to: req.body.email,
                      // c'est ce mail ci qui va etre envoyer 
                            from: 'AirBled@gmail.com',
                            // cest l'objet du mail 
                            subject:'salut salut mes petits chats',
                            // et la le reste est du html (design)
                            html: `<h1> Bienvenue sur notre site !</h1>
                            <br>
                            <br>
                            <p>
                            //
                            - Identifiant : ${req.body.email} <br> 
                            - Mot de passe : ${req.body.password} </p>`
                        })



                         // Il n'y as pas de mot de passe du user dedans.
                        //  Nous créons un jeton d'authentification pour l'utilisateur avec le jwt
                        let token = jwt.sign(client.dataValues, process.env.SECRET_KEY, {
                            expiresIn: 1440
                        });
                        // JE RECUPERE LE TOKEN 
                        res.json({token: token})
                    })
                    .catch(err => {
                        res.send('error ' + err)
                    })
            } else {
                res.json({
                    error: " client already exists"
                })
            }
        })
        .catch(err => {
            res.json({
                error: "error" + err
            })
        })

});


/************************ LOGIN ********************************/
client.post("/login", (req, res) => {
    db.client.findOne({
        where: {email: req.body.email}
    })
    .then(client => {
         // req.body.password : c'est celui saisi , user.password : c'est celui de la database , compareSync les compares
         if (client){


             if (bcrypt.compareSync(req.body.password, client.password)){
                 // Il n'y as pas de mot de passe du  client dedans.
                     //  Nous créons un jeton d'authentification pour l'utilisateur avec le jwt
                 let token = jwt.sign(client.dataValues, process.env.SECRET_KEY, {
                     expiresIn: 1440
                 });
                   // Je recupere le token
                 res.json({
                     token: token
                 })
             }else {
                 res.send('error mail or error password')
             }
         }
         else{
             res.status(404).json("error")
         }
    })
    .catch(err =>{
        res.send('error ' + err)
    })
});
/************ ce POST est la pour envoyer le mail  ************/
client.post("/send", (req, res) => {
    console.log(req.body.email)
    db.client.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(client  => {
            if (client) {
                // On lui dit si je modifie le mot de passe qu'il me le crypt 
                 transporter.sendMail({

                    to: req.body.email,
                    from: 'dounia@gmail.com',
                    subject:'cliquer pour changer vos mot de passe',
                    html: `<h1> Bienvenue sur notre site Chez Nous! </h1>
                    <br>
                    <br>
                    <p>Serge</p>
                    <a href="">ici</a>,`
                })
            } else {
                res.json({
                    error: "ne peut pas mettre à jour ce clietnt  ce n'est pas votre user"
                })
            }
        })
        .catch(err => {
            res.send('error' + err)
        })
});

/************************************************************ FIN METHODS POST ********************************************************************************************************************************************************************************************************
 **************************************************************************************************************************************************************************************************************************************************************************************/


/*************************************************************************************************************************************************************************************************************************************************************************************
 ************************************************************** DEBUT METHODS GET ****************************************************************************************************************************************************************************************************/


/************************ CHERCHE USER A PARTI DE SON EMAIL********************************/


// chercher client avec son email 
client.get("/Find/:email", (req, res) =>{
    // trouver l'client avec son email
    db.client.findOne({
        where:{id_client: req.params.email}
    }).then(client =>{
        //if client exist donc
        if(client) {
            res.json({
                client: client
            })
        }
        else {
            res.json({error: "le client n'existe pas dans la liste des client"})
        }
    })
    .catch(err =>{
        res.json("error" + err);

    })
});
/********************** ICI ON VEUX FAIT UN AFFICHE TOUT LES INFORMATION SOIT ON UTILISE EXCLUDE/INCLUDE ********************************/

client.get("/All", (req, res) =>{
    db.client.findAll({
        attributes:{
            exclude:["nom", "prenom", "adresse", "email", "numero_telephone"]
        }
    }).then(client =>{
        //recupere toutes les données recuperer et les met en json puis l'API recuperera les infos
        res.json(client)
    })
    .catch(err =>{
        res.json("error" + err)
    })
});

/************************************************************ Fin Methods GET ********************************************************************************************************************************************************************************************************
 **************************************************************************************************************************************************************************************************************************************************************************************/


 /*************************************************************************************************************************************************************************************************************************************************************************************
 ************************************************************** Debut Methods Update ****************************************************************************************************************************************************************************************************/

/************************************************************ UPDATE ********************************/


client.post("/update", (req, res) => {
    db.client.findOne({
        where: {email: req.body.email}
    })
        .then(client => {
           if(client){
               // On lui dit si je modifie le mot de passe qu'il me le Bcrypt 
               const hash = bcrypt.hashSync(req.body.password, 10);
               client.update({
                nom: req.body.nom,
                prenom: req.body.prenom,
                email: req.body.email,
                // SY ON NE VEUT PAS LE MODIFIER ON ENLEVE PASSWORD ET BCRYPT 
                password: hash,
               })
           }
           else {
               res.json({
                   error: "can't update this client his is not your client"
               })
           }
        })
        .catch(err => {
            res.send('error' + err)
        })
});


/******************* UPDATE MOT DE PASSE OUBLIE ********************/
//
client.post("/motdepasse", (req, res) => {
    db.client.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(client => {
            if (client) {
                // On lui dit si je modifie le mot de passe qu'il me le crypt 
                const hash = bcrypt.hashSync(req.body.password, 10);
                const confirmationpassword = bcrypt.hashSync(req.body.confirmationpassword, 10);
                client.update({
                    email: req.body.email,
                   confirmationpassword:confirmationpassword,
                    password: hash,

                })
            } else {
                res.json({
                    error: "ne peut pas mettre à jour cet user ce n'est pas votre user"
                })
            }
        })
        .catch(err => {
            res.send('error' + err)
        })
});


/************************************************************ Fin Methods Update ********************************************************************************************************************************************************************************************************
 **************************************************************************************************************************************************************************************************************************************************************************************/


 /*************************************************************************************************************************************************************************************************************************************************************************************
 ************************************************************** Debut Methods Delete ****************************************************************************************************************************************************************************************************/


/************************ DELETE ********************************/


client.delete("/delete/:nom", (req,res) =>{
    db.client.findOne({
        where:{nom: req.params.nom}
    }).then(client =>{
        if(client) {
            // DESTROY VEUT DIRE DETRUIRE IL SUPPRIME CE CHAMPS DE LA TABLE 
            client.destroy().then(() => {
                res.json("client deleted")
            })
            // SY IL Y A DES ERREURS 
                .catch(err => {
                    res.json("error" + err)
                })
        }
        else {
            res.json({error : "you can't delete this client it not exist in you list of client"})
        }
    })
    // SY IL Y A DES ERREURS 
        .catch(err =>{
            res.json("error" + err);
        })
});
/************************************************************ Fin Methods Delete ********************************************************************************************************************************************************************************************************
 **************************************************************************************************************************************************************************************************************************************************************************************/


module.exports = client;
 /************************************************************ FIN DU MODULE ROUTE ****************************************************************************************************************************************************************************************************
 **************************************************************************************************************************************************************************************************************************************************************************************/



