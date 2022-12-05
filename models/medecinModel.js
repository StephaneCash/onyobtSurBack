module.exports = (sequelize, DataTypes) => {
    const Medecin = sequelize.define("medecin", {
        nom: {
            type: DataTypes.STRING,ll: { msg: "Filière manip est un champ obligatoire !" }
            
        },
        postnom: {
            type: DataTypes.STRING,
        },
        prenom: {
            type: DataTypes.STRING,
        },
        specialite: {
            type: DataTypes.STRING,
        },
        photo: {
            type: DataTypes.STRING,
        },
        numTel: {
            type: DataTypes.STRING,
        },
    })

    return Medecin
}