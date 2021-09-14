/*************************************************************************************************************************************************************************************************************************************************************************************
 *********************************************************** DEBUT DU MODULE REQUIRE ************************************************************************************************************************************************************************************************/

// Express.js est un framework pour construire des applications web basées sur Node.js et pour le développement de serveurs.
var express = require('express')



// Le routage consiste à déterminer comment une application répond à une demande client adressée à un noeud final particulier, à savoir un URI (ou chemin) et une méthode de requête HTTP spécifique (GET, POST, etc.).
//Chaque route peut avoir une ou plusieurs fonctions de gestionnaire, qui sont exécutées lorsque la route est appariée.
var transporteur = express.Router();

var db = require('../database/db')



/*************************************************************************************************************************************************************************************************************************************************************************************
 ************************************************************** Debut Methods POST ***************************************************************************************************************************************************************************************************/


/******************************************************************* REGISTER********************************/


// CELA PERMET DE RENTRER UN NOUVEAU CLIENT DANS LA BASE DE DONNES SUITE A CELA ON DOIT VERIFIER VIA POSTMAN 
// CRÉATION DU CHEMIN ,REQ QUI CONTIENDRA TOUTES LES VALEURS ENVOYÉ DEPUIS LE SITE INTERNET
transporteur.post("/nouveautransporteur", (req,res) =>{
    const mytransporteur = {
       
        nomdetransporteur: req.body.nomdetransporteur,
        numero_telephone : req.body.numero_telephone,
        id_commande: req.body.id_commande,
    };
     // Trouve si l'user existe ou non à partir de son email
    // select * from tbl_client where email = 'dounia.goual@gmail.com'


    db.transporteur.findOne({
        where: { nomdetransporteur: req.body.nomdetransporteur,}
    })
    .then(transporteur =>{
        if (!transporteur){
            db.transporteur.create(mytransporteur)
            .then(transporteur => {
                res.json({message: 'ook', transporteur})
            })
            .catch(err =>{
                res.send('error' +  err)
            })
        }
        else {
            res.json({
                error: "ce transporteur existe deja dans la base de donnée"
            })
        }
    })
.catch(err => {
    res.json({
        error: "error" + err
    })
})
});

/************************************************************ FIN METHODS POST ********************************************************************************************************************************************************************************************************
 **************************************************************************************************************************************************************************************************************************************************************************************/


/*************************************************************************************************************************************************************************************************************************************************************************************
 ************************************************************** DEBUT METHODS GET ****************************************************************************************************************************************************************************************************/


/************************ CHERCHER TRANSPORTEUR A PARTIR DE SON ID ********************************/


transporteur.get("/Find/:id_transporteur", (req, res) =>{
    // trouver l'client avec son email
    db.transporteur.findOne({
        where:{id_transporteur: req.params.id_transporteur}
    }).then(transporteur =>{
        //if client exist donc
        if(transporteur) {
            res.json({
                transporteur: transporteur
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
/********************** ICI ON VEUX AFFICHER TOUTE LES INFORMATIONS HORMIS LE NUMERO DE TÉLEPHONE DONC ON UTILISE EXCLUDE ********************************/
transporteur.get("/All", (req, res) =>{
    db.transporteur.findAll({
        attributes:{
            exclude:["numero_telephone"]
        }
    }).then(transporteur =>{
        //recupere toutes les données recuperer et les met en json puis l'API recuperera les infos
        res.json(transporteur)
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

transporteur.post("/update", (req, res) => {
    db.transporteur.findOne({
        where: { nomdetransporteur: req.body.nomdetransporteur,}
    })
        .then(transporteur => {
           if(transporteur){
             
            transporteur.update({
                nomdetransporteur: req.body.nomdetransporteur,
                numero_telephone : req.body.numero_telephone,
               })
           }
           else {
               res.json({
                   error: "impossible de mettre à jour ce client, ce n'est pas votre client"
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


transporteur.delete("/deleteBy/:id", (req,res) =>{
    db.transporteur.findOne({
        where:{id_transporteur: req.params.id}
    }).then(transporteur=>{
        if(transporteur) {
            // DESTROY VEUT DIRE DETRUIRE IL SUPPRIME CE CHAMPS DE LA TABLE 
            transporteur.destroy().then(() => {
                res.json("transporteur deleted")
            })
            //SY IL Y A DES ERREURS
                .catch(err => {
                    res.json("error" + err)
                })
        }
        else {
            res.json({error : "vous ne pouvez pas supprimer cet utilisateur, il n'existe pas dans votre liste d'utilisateurs"})
        }
    })
        .catch(err =>{
            res.json("error" + err);
        })
});
/************************************************************ Fin Methods Delete ********************************************************************************************************************************************************************************************************
 **************************************************************************************************************************************************************************************************************************************************************************************/

module.exports = transporteur;

 /************************************************************ FIN DU MODULE ROUTE ****************************************************************************************************************************************************************************************************
 ***/




