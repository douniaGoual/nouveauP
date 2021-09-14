 /************************************************ DEBUT DU REQUIRE MODULES************************************************$/

 * Express.js est un framework de js pour la constuction des applications web basée sur Node.js */
const express = require("express");

/*bodyParser est un paquet permettant de lire les données JSON envoyé à notre server */
const bodyParser = require("body-parser");
const cors = require("cors")

/* Pour utiliser CORS, il est nécessaire d'envoyer au server les en-tetes de controles d'acces qu'il inspectera afin d'approuver ou non la demande  */


/* Le partage de ressources inter-origines (CORS) permet les requêtes inter-domaines provenant de navigateurs compatibles.
 // CORS CEST EN FRANCAIS Partage des Ressources entre Origines Multiples   ///// Cross-Origin Resource Sharing en anglais 

const cors = require("./node_modules/cors");



// require cors
/************************************************* FIN DU REQUIRE MODULES *************************************/


/*************** LANCE LE SERVEUR AVEC TOUS LES PARAMETRES ********************/

// Le port sur lequel on peut appelez pour utiliser votre server en local 
// Prend le premier port libre, la priorité est a celui qui est libre en premier // POUR NODE IL PREND PAR DÉFAULT 3000
const port = process.env.PORT || 3000;


// app = express
const app = express();

// dans notre application, nous utilisons cors
// app.use(cors());

// dans notre application, nous utilisons bodyParser en json
// on utilise que du json
app.use(bodyParser.json());


/* le stocker dans une variable nommée bodyParser. Le middleware permettant de gérer les données encodées en URL est renvoyé par bodyParser.urlencoded ({extended: false}).
 * extended = false est une option de configuration qui demande à l'analyseur d'utiliser le codage classique. 
 * Lors de son utilisation, les valeurs ne peuvent être que des chaînes ou des tableaux.
 * nous pouvons faire notre propre encodage si on met true
 * c'est preferable de laisse false / pour evite les probleme divers
 */

app.use(bodyParser.urlencoded({ extended: false
}));
app.use(cors({origin:'*'}));


// nous appellerons ici tous les itinéraires dont nous avons besoin dans cette application

/*require router*/

const client= require("./routes/client");
const commande= require("./routes/commande");
const fournisseur= require("./routes/fournisseur");
const note= require("./routes/note");
const paiement= require("./routes/paiement");
const produit= require("./routes/produit");
const remise= require("./routes/remise");
const transporteur= require("./routes/transporteur");

app.use("/client", client);
app.use("/commande", commande);
app.use("/fournisseur", fournisseur);
app.use("/note", note) ;
app.use("/paiement", paiement) ;
app.use("/produit", produit) ;
app.use("/remise", remise) ;
app.use("/transporteur", transporteur);


// nous disons à notre application de commencer à écouter le port et de nous renvoyer le message contenant les informations sur le port
app.listen(port, function () {
    console.log("server start on " + port)
});


/********************************** FIN DU LANCE LE SERVEUR AVEC TOUS LES PARAMETRES *********************************/