/******************************************************************LE DEBUT DE LA REQUIRE MODULE****************************************************/

/* Sequelize est un ORM basé sur des promesses pour Node.js.*/ 
// ORM  = object relationnel mapping 
const Sequelize = require('sequelize');

/******************************************************************* FIN DE LA REQUIRE MODULE************************************************************/


/****************************************************** DEBUT DE LA CONNEXION À LA DATABASE  *****************************************************/
// faire notre const db ;
//le nom peux varie selon nous 
const db ={};

// cela permet de ce connecter 
const infobase = new Sequelize("nath","root",'root',{
    // host 
    host: "localhost",
    // pour ce connecter a la base 
    dialect: "mysql",
    // le port sur lequel on écoute
    port: 8886,
    pool:{
        // taille maximale de connexion
        max:5,
        // taille minimale de connexion 
        min:0,
        // cela nous permet de savoir lorsque l'on envoie la requete ; au bout de temps de seconde le server est bloqué il nous renvoie la requete est mauvaise
        acquire: 30000,
        // destruction de la page lorsque le temps est écouler 
        // comme plus de x temps sy le code est pas entrer
        idle: 10000,
    }

});
// cela permet de savoir sy on est connecter ou non à notre infobase
infobase.authenticate()
    .then(() => {
        console.log('La connexion a été établie avec succès.');
    })
    .catch(err => {
        console.error('Impossible de se connecter à la base de données:', err);
    });


/************************************** FIN DE LA CONNEXION À LA DATABASE*********************************************/


/************************************** DÉMARRER EXIGER MODELES/ TABLES  *********************************************/
/*Pour faire demarrer chaque table dans la base de données
on en a besoin dans ce fichier pour faire des associations entre elles */

db.client= require('../models/client')(infobase,Sequelize);
db.commande= require('../models/commande')(infobase,Sequelize);
db.fournisseur= require('../models/fournisseur')(infobase,Sequelize);
db.note= require('../models/note')(infobase,Sequelize);
db.paiement= require('../models/paiement')(infobase,Sequelize);
db.produit= require('../models/produit')(infobase,Sequelize);
db.remise= require('../models/remise')(infobase,Sequelize);
db.transporteur= require('../models/transporteur')(infobase,Sequelize);
db.fournir= require('../models/fournir')(infobase,Sequelize);
db.contenir= require('../models/contenir')(infobase,Sequelize);



/************************************** FIN DE LA REQUIRE MODELS/TABLES **********************************************

* Il existe quatre types d’associations disponibles dans Sequelize
 *
 
 * 
 * HasOne : Les associations sont des associations où la clé étrangère pour la relation un-à-un.
 * 
 * HasMany : les associations connectent une source avec plusieurs cibles. Cependant, les cibles sont à 
 * nouveau connectées à une source spécifique.
 * 
 * BelongsToMany : les associations sont utilisées pour connecter des sources avec plusieurs cibles.
 *  En outre, les cibles peuvent également avoir des connexions vers plusieurs sources.

/****************************************************   DEBUT DES RELATIONS   ***************************************************/
//L'association A.hasMany (B) signifie qu'il existe une relation un-à-plusieurs entre A et B, la clé étrangère étant définie dans le modèle cible (B).
db.client.hasMany(db.note,{foreignKey: "id_client"});


db.client.hasMany(db.paiement,{foreignKey: "id_client" }); 

// L'association A.hasOne(B) signifie qu'il existe une relation un-à-un entre A et B, la clé étrangère étant définie dans le modèle cible (B).
db.paiement.hasOne(db.commande,{foreignKey: "id_paiement" }); 

//L'association A.hasMany (B) signifie qu'il existe une relation un-à-plusieurs entre A et B, la clé étrangère étant définie dans le modèle cible (B).
db.produit.hasMany(db.note,{foreignKey: "id_produit" }); 

//L'association A.hasMany (B) signifie qu'il existe une relation un-à-plusieurs entre A et B, la clé étrangère étant définie dans le modèle cible (B).
db.client.hasMany(db.commande,{foreignKey: "id_client" }); 

//L'association A.hasMany (B) signifie qu'il existe une relation un-à-plusieurs entre A et B, la clé étrangère étant définie dans le modèle cible (B).
db.commande.hasMany(db.transporteur,{foreignKey: "id_commande" }); 

//L'association A.hasMany (B) signifie qu'il existe une relation un-à-plusieurs entre A et B, la clé étrangère étant définie dans le modèle cible (B).
db.commande.hasMany(db.remise,{foreignKey: "id_commande" }); 




// Ici je lui dit si je supprime ou modifie un element dans une table intermediaire il sera donc supprimer ou modifier dans l'autre aussi 
// constraints:true CEST POUR DIRE QUE L'ON A DES REGLE qu el'on va lui appliquer
//onDelete:'CASCADE' SA SUPPRIME SA LA SUITE
//onUpdate:'CASCADE' spécifie qu'à chaque fois qu'un enregistrement (row) est mis à jour dans la table parente

//L'association A.belongsToMany (B, {par: 'C'}) signifie qu'une relation plusieurs-à-plusieurs existe entre A et B, en utilisant la table C comme table de jonction, qui aura les clés étrangères (aId et bId, pour exemple).
 //Sequelize créera automatiquement ce modèle C (sauf s'il existe déjà) et définira les clés étrangères appropriées dessus.
db.commande.belongsToMany(db.produit,{ through: 'contenir',foreignKey: "id_commande", constraints:true, onDelete:'CASCADE',onUpdate:'CASCADE' }); 

db.produit.belongsToMany(db.commande,{through: 'contenir',foreignKey: "id_produit", constraints:true, onDelete:'CASCADE',onUpdate:'CASCADE' }); 

db.produit.belongsToMany(db.fournisseur,{ through: 'fournir',foreignKey: "produit",constraints:true, onDelete:'CASCADE',onUpdate:'CASCADE'}); 
db.fournisseur.belongsToMany(db.produit,{through: 'fournir',foreignKey: "id_fournisseur",constraints:true, onDelete:'CASCADE',onUpdate:'CASCADE' }); 




/****************************************************   FIN DES RELATIONS   ***************************************************/

// fait réference à l'instance de la base de données
db.infobase = infobase;
//le module Sequelize fait reference à la ligne 6 
db.Sequelize = Sequelize;


/* Synchronisez tous les modèles définis avec la base de données.
* similaire pour la synchronisation: vous pouvez définir ceci pour toujours forcer la synchronisation pour les modèles
  */
/*force :true il efface tout */


//infobase.sync({force:true});

/* Le module.exports ou exports est un objet spécial inclus par défaut dans tous les fichiers JS de l'application Node.js.
* module est une variable qui représente le module actuel et exports est un objet qui sera exposé en tant que module.
* Ainsi, tout ce que vous affectez à module.exports ou à des exportations sera exposé en tant que module.
**/
module.exports = db;







