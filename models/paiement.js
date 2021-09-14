// expots table
module.exports = (infobase, Sequelize) => {
    return infobase.define(
        // Le nom du modèle Le modèle sera stocké dans `sequelize.models` sous ce nom categories.
        "tbl_paiement",
        {
            // nom de domaine
            id_paiement: {
                // définir le type de données
                type: Sequelize.DataTypes.INTEGER,
                // primerKey
                primaryKey: true,
                // autoIncrement peut être utilisé pour créer des colonnes entières auto-incrémentées
                autoIncrement: true
            },
            modedepaiement:  {
                //set data type with max length
                type: Sequelize.DataTypes.STRING,
                // définir allowNull sur false ajoutera NOT NULL à la colonne, ce qui signifie qu'une erreur se produira si vous ajoutez des informations dans ce coulimn.
                allowNull: false
            },
            date: {
                type: Sequelize.DataTypes.DATE,
                allowNull: false
                 
            }
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