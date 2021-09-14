// expots table
module.exports = (infobase, Sequelize) => {
    return infobase.define(
        // Le nom du modèle Le modèle sera stocké dans `sequelize.models` sous ce nom categories.
        "tbl_produit",
        {
            // nom de domaine
            id_produit: {
                // définir le type de données
                type: Sequelize.DataTypes.INTEGER,
                // primerKey
                primaryKey: true,
                // autoIncrement peut être utilisé pour créer des colonnes entières auto-incrémentées
                autoIncrement: true
            },
            modele:{
                 // définir le type de données
                 type: Sequelize.DataTypes.STRING,
                 },
            nom:  {
                //set data type with max length
                type: Sequelize.DataTypes.STRING,
                // définir allowNull sur false ajoutera NOT NULL à la colonne, ce qui signifie qu'une erreur se produira si vous ajoutez des informations dans ce coulimn.
               
            },
            marque:  {
                //set data type with max length
                type: Sequelize.DataTypes.STRING,
                // définir allowNull sur false ajoutera NOT NULL à la colonne, ce qui signifie qu'une erreur se produira si vous ajoutez des informations dans ce coulimn.
               
            },
            prix :  {
                //set data type with max length
                type: Sequelize.DataTypes.STRING(45),
                // définir allowNull sur false ajoutera NOT NULL à la colonne, ce qui signifie qu'une erreur se produira si vous ajoutez des informations dans ce coulimn.
              
            },
            datedesortie:  {
                //set data type with max length
                type: Sequelize.DataTypes.DATE,
                // définir allowNull sur false ajoutera NOT NULL à la colonne, ce qui signifie qu'une erreur se produira si vous ajoutez des informations dans ce coulimn.
                
            },
            taille:  {
                //set data type with max length
                type: Sequelize.DataTypes.STRING(45), 
                // définir allowNull sur false ajoutera NOT NULL à la colonne, ce qui signifie qu'une erreur se produira si vous ajoutez des informations dans ce coulimn.
              
            },
            photo:  {
                //set data type with max length
                type: Sequelize.DataTypes.STRING,
                // définir allowNull sur false ajoutera NOT NULL à la colonne, ce qui signifie qu'une erreur se produira si vous ajoutez des informations dans ce coulimn.
               
            },
            photohover:  {
                //set data type with max length
                type: Sequelize.DataTypes.STRING,
                // définir allowNull sur false ajoutera NOT NULL à la colonne, ce qui signifie qu'une erreur se produira si vous ajoutez des informations dans ce coulimn.
               
            },
        },
        {
             // Par défaut, Sequelize ajoutera les attributs createdAt et updatedAt à votre modèle afin que vous puissiez savoir quand l'entrée de la base de données a été
            // insérée dans la base de données et quand elle a été mise à jour pour la dernière fois.
            timestamps: true,
            /**
             * Sequelize permet de régler l’option soulignée pour le modèle. Lorsque la valeur est true, cette option définit l'option de champ de tous les attributs sur la version soulignée de son nom.


             * Ceci s'applique également aux clés étrangères générées par des associations.
             * */

            underscored: true
        }
    );
};

