/*************************************************************************************************************************************************************************************************************************************************************************************
 *********************************************************** DEBUT DU MODULE REQUIRE ************************************************************************************************************************************************************************************************/

// Express.js est un framework pour construire des applications web basées sur Node.js et pour le développement de serveurs.
var express = require('express')


// Le routage consiste à déterminer comment une application répond à une demande client adressée à un noeud final particulier, à savoir un URI (ou chemin) et une méthode de requête HTTP spécifique (GET, POST, etc.).
//Chaque route peut avoir une ou plusieurs fonctions de gestionnaire, qui sont exécutées lorsque la route est appariée.
var categorie = express.Router();

var db = require('../database/db')

/******************************************************************* COMMANDE ********************************/


// CELA PERMET DE RENTRER UN NOUVEAU CLIENT DANS LA BASE DE DONNES SUITE A CELA ON DOIT VERIFIER VIA POSTMAN 
// CRÉATION DU CHEMIN ,REQ QUI CONTIENDRA TOUTES LES VALEURS ENVOYÉ DEPUIS LE SITE INTERNET
categorie.post("/nouvellecategorie", (req,res) =>{
    const mycategorie = {
        typedecategorie : req.body.typedecategorie,

    };

     // Trouve si la commande  existe ou non à partir de son type de categories 
    // select * from tbl_client where  = 'pantalon'

    db.categorie.findOne({
        where: {typedecategorie: req.body.typedecategorie}
    })
    .then(categorie =>{
        // ICI CLIENT FAIT REFERENCE A LA REPONSE DE LA LIGNE 61
        if (!categorie){
            // FAIRE LE HASK DU MOT DE PASSE DANS BRYPT ,SALT 10
                //Le salt 10 ,ICI EST PLACÉ DANS LE CONSTANCE LE RÉSULTAT QUI SERA CRYPTÉ GRACE A 
            db.categorie.create(mycategorie)
            .then(categorie=> {
                res.json(categorie)
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

categorie.get("/All", (req, res) =>{
    db.categorie.findAll({
        attributes:{
            exclude:[""]
        }
    }).then(categorie =>{
        //recupere toutes les données recuperer et les met en json puis l'API recuperera les infos
        res.json(categorie)
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


categorie.post("/update/:id", (req, res) => {
    db.categorie.findOne({

        where: {id_categorie: req.params.id}
    })
        .then(categorie => {
           if(categorie){
               categorie.update({
                
                typedecategorie: req.body.typedecategorie,
                 })
                 .then(categorie => {
                    res.json(categorie)
                })
                .catch(err => {
                    res.send('error' + err)
                })
           }
           else {
               res.json({
                   error: "can't update this client his is not your client"
               })
           }
        })

       
       
});
/************************************************************ Fin Methods Update ********************************************************************************************************************************************************************************************************
 **************************************************************************************************************************************************************************************************************************************************************************************/


 /*************************************************************************************************************************************************************************************************************************************************************************************
 ************************************************************** Debut Methods Delete ****************************************************************************************************************************************************************************************************/


/************************ DELETE ********************************/


categorie.delete("/delete/:id", (req,res) =>{
    db.categorie.findOne({
        where:{id_categorie: req.params.id}
    }).then(categorie =>{
        if(categorie) {
             // DESTROY VEUT DIRE DETRUIRE IL SUPPRIME CE CHAMPS DE LA TABLE 
            categorie.destroy().then(() => {
                res.json("categorie deleted")
            })
                .catch(err => {
                    res.json("error" + err)
                })
        }
        else {
            res.json({error : "you can't delete this client it not exist in you list of client"})
        }
    })
    //SY IL Y A DES ERREURS 
        .catch(err =>{
            res.json("error" + err);
        })
});


/************************************************************ Fin Methods Delete ********************************************************************************************************************************************************************************************************
 **************************************************************************************************************************************************************************************************************************************************************************************/

module.exports = categorie;
 /************************************************************ FIN DU MODULE ROUTE ****************************************************************************************************************************************************************************************************
 **************************************************************************************************************************************************************************************************************************************************************************************/


