/*************************************************************************************************************************************************************************************************************************************************************************************
 *********************************************************** DEBUT DU MODULE REQUIRE ************************************************************************************************************************************************************************************************/

// Express.js est un framework pour construire des applications web basées sur Node.js et pour le développement de serveurs.

var express = require('express')

// Le routage consiste à déterminer comment une application répond à une demande client adressée à un noeud final particulier, à savoir un URI (ou chemin) et une méthode de requête HTTP spécifique (GET, POST, etc.).
//Chaque route peut avoir une ou plusieurs fonctions de gestionnaire, qui sont exécutées lorsque la route est appariée.
var produit = express.Router();

var db = require('../database/db')


// CELA PERMET DE RENTRER UN NOUVEAU CLIENT DANS LA BASE DE DONNES SUITE A CELA ON DOIT VERIFIER VIA POSTMAN 
// CRÉATION DU CHEMIN ,REQ QUI CONTIENDRA TOUTES LES VALEURS ENVOYÉ DEPUIS LE SITE INTERNET
produit.post("/nouveauproduit", (req,res) =>{
    const monproduit = {
        
        prix: req.body.prix,
        marque:req.body.marque,
        datedesortie:req.body.datedesortie,
        taille:req.body.taille,
        photo: req.body.photo,
        modele:req.body.modele,
        photohover:req.body.photohover,
        nom:req.body.nom,

    };

    db.produit.findOne({
        where: {prix: req.body.prix}
    })
    .then(produit =>{
        if (!produit){
            db.produit.create(monproduit)
            .then(produit => {
                res.json(produit)
            })
            .catch(err =>{
                res.send({
                    error: "error" + err
                })
            })
        }
        else {
            res.json({
                error: "ce produit existe deja dans la base de donnée"
            })
        }
    })
.catch(err => {
    res.json({
        error: "error : " + err
    })
})
});

produit.get("/Find/:id_produit", (req, res) =>{
    // trouver l'client avec son email
    db.produit.findOne({
        where:{id_produit: req.params.id_produit}
    }).then(produit =>{
        //if client exist donc
        if(produit) {
            res.json({
                produit: produit
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
produit.get("/All", (req, res) =>{
    db.produit.findAll({
        attributes:{
            exclude:[ "datedesortie","marque"]
        }
    }).then(produit =>{
        //recupere toutes les données recuperer et les met en json puis l'API recuperera les infos
        res.json(produit)
    })
    .catch(err =>{
        res.json("error" + err)
    })
});

/*************************** on demande le modele que l'on veut  **********************************************************/
produit.get("/Findbymodele/:modele", (req, res) => {
    db.produit.findAll({

        attributes: {
            include: [],
            exclude: []
        },
        where:{modele:req.params.modele}
    })
    .then(produit => {

            res.json(produit)

    })
    .catch(err => {
        res.send("error" + err)
    })
});



/************************************************************ Fin Methods GET ********************************************************************************************************************************************************************************************************
 **************************************************************************************************************************************************************************************************************************************************************************************/


 /*************************************************************************************************************************************************************************************************************************************************************************************
 ************************************************************** Debut Methods Update ****************************************************************************************************************************************************************************************************/

/************************ UPDATE ********************************/


produit.post("/update", (req, res) => {
    db.produit.findOne({
        where: {  marque:req.body.marque,
         }
    })
        .then(produit => {
           if(produit){
             
            produit.update({
                marque:req.body.marque,
                datedesortie:req.body.datedesortie,
             
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

produit.delete("/deleteBy/:id", (req,res) =>{
    db.produit.findOne({
        where:{id_produit: req.params.id}
    }).then(produit =>{
        if(produit) {
            // DESTROY VEUT DIRE DETRUIRE IL SUPPRIME CE CHAMPS DE LA TABLE 
            produit.destroy().then(() => {
                res.json("produit deleted")
            })
             // SY IL Y A DES ERREURS 
                .catch(err => {
                    res.json("error" + err)
                })
        }
        else {
            res.json({error : "you can't delete this user it not exist in you list of user"})
        }
    })
     // SY IL Y A DES ERREURS 
        .catch(err =>{
            res.json("error" + err);
        })
});
/************************************************************ Fin Methods Delete ********************************************************************************************************************************************************************************************************
 **************************************************************************************************************************************************************************************************************************************************************************************/

module.exports = produit;

 /************************************************************ FIN DU MODULE ROUTE ****************************************************************************************************************************************************************************************************
 **************************************************************************************************************************************************************************************************************************************************************************************/







