/*************************************************************************************************************************************************************************************************************************************************************************************
 *********************************************************** DEBUT DU MODULE REQUIRE ************************************************************************************************************************************************************************************************/

// Express.js est un framework pour construire des applications web basées sur Node.js et pour le développement de serveurs.
var express = require('express')

// Le routage consiste à déterminer comment une application répond à une demande client adressée à un noeud final particulier, à savoir un URI (ou chemin) et une méthode de requête HTTP spécifique (GET, POST, etc.).
//Chaque route peut avoir une ou plusieurs fonctions de gestionnaire, qui sont exécutées lorsque la route est appariée.
var remise = express.Router();

var db = require('../database/db')


// CELA PERMET DE RENTRER UNE NOUVELLE REMISE DANS LA BASE DE DONNES SUITE A CELA ON DOIT VERIFIER VIA POSTMAN 
// CRÉATION DU CHEMIN ,REQ QUI CONTIENDRA TOUTES LES VALEURS ENVOYÉ DEPUIS LE SITE INTERNET
remise.post("/nouvelleremise", (req,res) =>{
    const myremise = {
       
       remise: req.body.remise,
       id_commande: req.body. id_commande,

    };
      // Trouver sy la remise existe ou non à partir de son id
    // select * from tbl_remise where  = '10%'


    db.remise.findOne({
        where: {remise: req.body.remise}
    })
    .then(remise=>{

        if (!remise){
            db.remise.create(myremise)
            .then(remise=> {
                res.json(remise)
            })
            .catch(err =>{
                res.send({
                    error: "error" + err
                })
            })
        }
        else {
            res.json({
                error: "cette categorie existe deja dans la base de donnée"
            })
        }
    })
.catch(err => {
    res.json({
        error: "error : " + err
    })
})
});
/************************************************************ FIN METHODS POST ********************************************************************************************************************************************************************************************************
 **************************************************************************************************************************************************************************************************************************************************************************************/


/*************************************************************************************************************************************************************************************************************************************************************************************
 ************************************************************** DEBUT METHODS GET ****************************************************************************************************************************************************************************************************/


/************************ CHERCHE REMISE A PARTI DE SON ID_REMISE*******************************/


remise.get("/Find/:id_remise", (req, res) =>{
    // trouver l'client avec son email
    db.remise.findOne({
        where:{id_remise: req.params.id_remise}
    }).then(remise =>{
        //if client exist donc
        if(remise) {
            res.json({
                remise: remise
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
remise.get("/All", (req, res) =>{
    db.remise.findAll({
        attributes:{
            exclude:[ "remise"]
        }
    }).then(remise =>{
        res.json(remise)
    })
    .catch(err =>{
        res.json("error" + err)
    })
});
/************************************************************ Fin Methods GET ********************************************************************************************************************************************************************************************************
 **************************************************************************************************************************************************************************************************************************************************************************************/


 /*************************************************************************************************************************************************************************************************************************************************************************************
 ************************************************************** Debut Methods Update ****************************************************************************************************************************************************************************************************/

/************************ UPDATE ********************************/



remise.post("/update", (req, res) => {
    db.remise.findOne({
        where: {  
         }
    })
        .then(remise => {
           if(remise){
             
            remise.update({
              
             
               })
           }
           else {
               res.json({
                   error: "can't update this produit his is not your client"
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


remise.delete("/deleteBy/:id", (req,res) =>{
    db.remise.findOne({
        where:{id_remise: req.params.id}
    }).then(remise =>{
        if(remise) {
            remise.destroy().then(() => {
                res.json("remise deleted")
            })
                .catch(err => {
                    res.json("error" + err)
                })
        }
        else {
            res.json({error : "you can't delete this user it not exist in you list of user"})
        }
    })
        .catch(err =>{
            res.json("error" + err);
        })
});
/************************************************************ Fin Methods Delete ********************************************************************************************************************************************************************************************************
 **************************************************************************************************************************************************************************************************************************************************************************************/

module.exports = remise;
 /************************************************************ FIN DU MODULE ROUTE ****************************************************************************************************************************************************************************************************
 **************************************************************************************************************************************************************************************************************************************************************************************/





