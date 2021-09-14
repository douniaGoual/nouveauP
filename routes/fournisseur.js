/*************************************************************************************************************************************************************************************************************************************************************************************
 *********************************************************** DEBUT DU MODULE REQUIRE ************************************************************************************************************************************************************************************************/

// Express.js est un framework pour construire des applications web basées sur Node.js et pour le développement de serveurs.
var express = require('express')

var fournisseur = express.Router();

var db = require('../database/db');


// entrer une nouvelle categorie dans la base de donnée
fournisseur.post("/nouveaufournisseur", (req,res) =>{

    const myfournisseur = {
        nom: req.body.nom,
        numero_telephone: req.body.numero_telephone,
        entreprise: req.body.entreprise,
        adresse: req.body.adresse,
        nomderesponsable: req.body.nomderesponsable,
    };

    db.fournisseur.findOne({
        where: {nom:req.body.nom}
    })

    .then(fournisseur =>{
        if (!fournisseur){

            db.fournisseur.create(myfournisseur)

            .then(fournisseur => {

                res.json(fournisseur)
            })
            .catch(err =>{
                res.send({
                    error: "error" + err
                })
            })
        }
        else {
            res.json({
                error: "ce fournisseur existe deja dans la base de donnée"
            })
        }
    })
.catch(err => {
    res.json({
        error: "error : " + err
    })
})
});
// chercher client avec son email 
fournisseur.get("/Find/:id", (req, res) =>{
    // trouver l'client avec son email
    db.fournisseur.findOne({
        where:{id_fournisseur: req.params.id}
    }).then(fournisseur =>{
        //if fournisseur exist donc
        if(fournisseur) {
            res.json({
                fournisseur: fournisseur
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
fournisseur.get("/All", (req, res) =>{
    db.fournisseur.findAll({
        attributes:{
            exclude:[ "entreprise","nomderesponsable" ]
        }
    }).then(user =>{
        res.json(user)
    })
    .catch(err =>{
        res.json("error" + err)
    })
});
// update
fournisseur.post("/update", (req, res) => {
    db.fournisseur.findOne({
        where: {adresse: req.body.adresse}
    })
        .then(fournisseur => {
           if(fournisseur){
             
               fournisseur.update({
                nom: req.body.nom,
                adresse: req.body.adresse,
              
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
//delete
fournisseur.delete("/deleteBy/:id", (req,res) =>{
    db.fournisseur.findOne({
        where:{id_fournisseur: req.params.id}
    }).then(fournisseur =>{
        if(fournisseur) {
            fournisseur.destroy().then(() => {
                res.json("user deleted")
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

module.exports = fournisseur;
 /************************************************************ FIN DU MODULE ROUTE ****************************************************************************************************************************************************************************************************
 **************************************************************************************************************************************************************************************************************************************************************************************/
