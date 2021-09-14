// Expots table
module.exports = (infobase , Sequelize) => {
    return infobase.define(

        "contenir", {

            statut: {

                // Définit le type de données
                // sy on veux faire des request par la suite on met boolean 
                type: Sequelize.DataTypes.BOOLEAN,
            },
        }, {

            // Par défaut, Sequelize ajoutera les attributs createdAt et updatedAt à votre modèle afin que vous puissiez savoir quand l'entrée de la base de données a été insérée dans la base de données et quand elle a été mise à jour pour la dernière fois.
            timestamps: true,

            // Sequelize permet de mettre en surbrillance l'option soulignée pour le modèle. Lorsque la valeur est true, cette option définit l'option de champ de tous les attributs sur la version soulignée de son nom.
            //  Ceci s'applique également aux clés étrangères générées par des associations.
            underscored: true
        }
    );
};