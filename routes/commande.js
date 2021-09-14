/*************************************************************************************************************************************************************************************************************************************************************************************
 *********************************************************** DEBUT DU MODULE REQUIRE ************************************************************************************************************************************************************************************************/

// Express.js est un framework pour construire des applications web basées sur Node.js et pour le développement de serveurs.
var express = require('express')

var commande = express.Router();

var db = require('../database/db')

// entrer une nouvelle categorie dans la base de donnée
commande.post("/nouvellecommande", (req,res) =>{
    const mycommande = {
        totaldelacommande :req.body.totaldelacommande,
        date : req.body.date,
        id_paiement : req.body.id_paiement,
        id_client : req.body.id_client,

    };
    db.commande.create(commande)
    .then ((commande) => {
       
        command.addProduit([produitId = req.body.produitId], { through: { prix: req.body.prix, qtn: req.body.qtn } })
    })


    db.commande.findOne({
        where: {totaldelacommande: req.body.totaldelacommande}
    })
    .then(commande  =>{
        if (!commande ){
            db.commande .create(mycommande)
            .then(commande=> {
                res.json({message: 'ook', commande })
            })
            .catch(err =>{
                res.send('error' +  err)
            })
        }
        else {
            res.json({
                error: "Cette commande existe deja dans la base de donnée"
            })
        }
    })
.catch(err => {
    res.json({
        error: "error" + err
    })
})
});

commande.get("/Find/:id", (req, res) =>{
// trouver l'client avec son email
    db.commande.findOne({
        where:{id_commande: req.params.id}
    }).then(commande=>{
        //if client exist donc
        if(commande) {
            res.json({
                commande: commande
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
commande.get("/All", (req, res) =>{
    db.commande.findAll({
        attributes:{
            exclude:[ "date"]
        }
    }).then(commande =>{
        res.json(commande)
    })
    .catch(err =>{
        res.json("error" + err)
    })
});

// update // mettre à jour 
commande.post("/update", (req, res) => {
    db.commande.findOne({
        where: { totaldelacommande :req.body.totaldelacommande,}
    })
        .then(commande => {
           if(commande){
             
               commande.update({
                   date:req.body.date,
                   totaldelacommande :req.body.totaldelacommande,

               })
           }
           else {
               res.json({
                   error: "can't update this user his is not your user"
               })
           }
        })
        .catch(err => {
            res.send('error' + err)
        })
});

commande.delete("/delete/:id", (req,res) =>{
    db.commande.findOne({
        where:{id_commande: req.params.id}
    }).then(commande =>{
        if(commande) {
            commande.destroy().then(() => {
                res.json("commande deleted")
            })
                .catch(err => {
                    res.json("error" + err)
                })
        }
        else {
            res.json({error : "you can't delete this client it not exist in you list of client"})
        }
    })
        .catch(err =>{
            res.json("error" + err);
        })
});


/************************************************************ Fin Methods Delete ********************************************************************************************************************************************************************************************************
 **************************************************************************************************************************************************************************************************************************************************************************************/

module.exports = commande;
 /************************************************************ FIN DU MODULE ROUTE ****************************************************************************************************************************************************************************************************
 **************************************************************************************************************************************************************************************************************************************************************************************/
