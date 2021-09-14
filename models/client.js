// exports table
module.exports = (infobase, Sequelize) => {

    return infobase.define(

        "tbl_client", {

            id_client: {

                // définir le type
                type: Sequelize.DataTypes.INTEGER,

                // définir la clé primaire
                primaryKey: true,

                // definir si oui ou non elle sera en mode autoIncrement
                autoIncrement: true,

            },

            // nom de domaine
            nom: {

                // définit le type de données avec une longueur maximale
                type: Sequelize.DataTypes.STRING(45),
                // définir allowNull sur false ajoutera NOT NULL à la colonne, ce qui signifie qu'une erreur se produira si vous ajoutez des informations dans cette colonne.
                allowNull: false
            },

            prenom: {

                // définit le type de données avec une longueur maximale
                type: Sequelize.DataTypes.STRING,
                // définir allowNull sur false ajoutera NOT NULL à la colonne, ce qui signifie qu'une erreur se produira si vous ajoutez des informations dans cette colonne.
                allowNull: false

            },

            email: {

                // définit le type de données avec une longueur maximale
                type: Sequelize.DataTypes.STRING(60),
                defaultValue:"serge",
                // définir allowNull sur false ajoutera NOT NULL à la colonne, ce qui signifie qu'une erreur se produira si vous ajoutez des informations dans cette colonne.
                allowNull: false
            },

            // nom de domaine
            numero_telephone: {

                // définit le type de données avec une longueur maximale
                type: Sequelize.DataTypes.STRING(15),
                // définir allowNull sur false ajoutera NOT NULL à la colonne, ce qui signifie qu'une erreur se produira si vous ajoutez des informations dans cette colonne.
                allowNull: false

            },
            ville: {

                // définit le type de données avec une longueur maximale
                type: Sequelize.DataTypes.STRING,
                // définir allowNull sur false ajoutera NOT NULL à la colonne, ce qui signifie qu'une erreur se produira si vous ajoutez des informations dans cette colonne.
                allowNull: false

            },
            code_postal: {

                // définit le type de données avec une longueur maximale
                type: Sequelize.DataTypes.INTEGER(5),
                // définir allowNull sur false ajoutera NOT NULL à la colonne, ce qui signifie qu'une erreur se produira si vous ajoutez des informations dans cette colonne.
                allowNull: false

            },
            adresse: {

                // définit le type de données avec une longueur maximale
                type: Sequelize.DataTypes.STRING(225),
                // définir allowNull sur false ajoutera NOT NULL à la colonne, ce qui signifie qu'une erreur se produira si vous ajoutez des informations dans cette colonne.
                allowNull: false

            },
            password: {

                // définit le type de données avec une longueur maximale
                type: Sequelize.DataTypes.STRING(225),
                // définir allowNull sur false ajoutera NOT NULL à la colonne, ce qui signifie qu'une erreur se produira si vous ajoutez des informations dans cette colonne.
                allowNull: false

            },
            confirmationpassword: {

                // définit le type de données avec une longueur maximale
                type: Sequelize.DataTypes.STRING,
                // définir allowNull sur false ajoutera NOT NULL à la colonne, ce qui signifie qu'une erreur se produira si vous ajoutez des informations dans cette colonne.
                allowNull: false

            },
           
              },
              {
                /* Par défaut, Sequelize ajoutera les attributs createdAt et updatedAt à votre modèle afin que 
                vous puissiez savoir quand l'entrée de la base de données a été insérée dans la base de données 
                et quand elle a été mise à jour pour la dernière fois.
                 */
                timestamps: false,
                /* Sequelize autoriser le réglage souligné l'option pour le modèle. Lorsque la valeur est true, 
                cette option définit l'option de champ de tous les attributs sur la version soulignée de son nom.
                  Ceci s'applique également aux clés étrangères générées par des associations.
                */
                underscored: true
            }
        );
    }




