/*************************************************************************************************************************************************************************************************************************************************************************************
 *********************************************************** DEBUT DU MODULE REQUIRE ************************************************************************************************************************************************************************************************/

// Express.js est un framework pour construire des applications web basées sur Node.js et pour le développement de serveurs.
var express = require('express')

// Le routage consiste à déterminer comment une application répond à une demande client adressée à un noeud final particulier, à savoir un URI (ou chemin) et une méthode de requête HTTP spécifique (GET, POST, etc.).
//Chaque route peut avoir une ou plusieurs fonctions de gestionnaire, qui sont exécutées lorsque la route est appariée.
var note = express.Router();

var db = require('../database/db')

// entrer une nouvelle note dans la base de donnée
note.post("/nouvellenote", (req,res) =>{
    const mynote = {
        id_note:req.body.id_note,
       note: req.body.note,
       commentaire: req.body.commentaire,
       date : req.body.date,

    };
    // Trouve si la nouvellenote existe ou non via les notes existantes 

    
    db.note.findOne({
        where: {note: req.body.note}
    })
    .then(note =>{
        if (!note){
            db.note.create(mynote)
            .then(note=> {
                res.json(note)
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

// chercher client avec son email 
note.get("/Find/:id_note", (req, res) =>{
    // trouver l'client avec son email
    db.note.findOne({
        where:{id_note: req.params.id_note}
    }).then(note =>{
        //if client exist donc
        if(note) {
            res.json({
                note: note
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
/********************** ICI ON VEUX FAIT UN AFFICHE TOUT LES INFORMATION DE la table note sauf commmentaire et note ********************************/
note.get("/All", (req, res) =>{
    db.note.findAll({
        attributes:{
            exclude:[  "commentaire","note" ]
        }
    }).then(note =>{
        // // recupere toutes les données recuperer et les met en json puis l'API recuperera les infos
        res.json(note)
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

note.post("/update", (req, res) => {
    db.note.findOne({
        where: {note: req.body.note}
    })
        .then(note => {
           if(note){
             
               note.update({
               
                note: req.body.note,
                date : req.body.date,
             
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

/************************************************************ Fin Methods Update ********************************************************************************************************************************************************************************************************
 **************************************************************************************************************************************************************************************************************************************************************************************/


 /*************************************************************************************************************************************************************************************************************************************************************************************
 ************************************************************** Debut Methods Delete ****************************************************************************************************************************************************************************************************/


/************************ DELETE ********************************/




note.delete("/deleteBy/:id", (req,res) =>{
    db.note.findOne({
        where:{id_note: req.params.id}
    }).then(note =>{
        if(note) {
            // DESTROY VEUT DIRE DETRUIRE IL SUPPRIME CE CHAMPS DE LA TABLE 
            note.destroy().then(() => {
                res.json("user deleted")
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
        .catch(err =>{
            res.json("error" + err);
        })
});


/************************************************************ Fin Methods Delete ********************************************************************************************************************************************************************************************************
 **************************************************************************************************************************************************************************************************************************************************************************************/


module.exports = note;
 /************************************************************ FIN DU MODULE ROUTE ****************************************************************************************************************************************************************************************************
 **************************************************************************************************************************************************************************************************************************************************************************************/
