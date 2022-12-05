module.exports = (sequelize, DataTypes) => {
    const Client = sequelize.define("client", {
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Le champ 'Nom ' est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "Nom est un champ obligatoire !" }
            }
        },
        postnom: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Le champ 'postnom ' est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "postnom  est un champ obligatoire !" }
            }
        },
        prenom: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Le champ 'prenom ' est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "prenom  est un champ obligatoire !" }
            }
        },
        age: {
            type: DataTypes.INTEGER,
        },
        sexe: {
            type: DataTypes.STRING,
        },
        poids: {
            type: DataTypes.INTEGER,
        },
        adresse: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Le champ 'adresse ' est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "Adresse  est un champ obligatoire !" }
            }
        },
        numTel: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Le champ 'Numéro de téléphone ' est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "Num tél  est un champ obligatoire !" }
            }
        },
        email: {
            type: DataTypes.STRING,
        },
        photo: {
            type: DataTypes.STRING,
        },
        empreinte: {
            type: DataTypes.STRING,
        },
        isAbonne: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        etatCivile: {
            type: DataTypes.STRING,
        },
        nbreEnfants: {
            type: DataTypes.INTEGER,
        },
    })

    return Client
}