module.exports = (sequelize, DataTypes) => {
    const Hopital = sequelize.define("hopital", {
        nom: {
            type: DataTypes.STRING,
        },
        nbreMedecin: {
            type: DataTypes.INTEGER,
        },
        commune: {
            type: DataTypes.STRING,
        },
        numTel: {
            type: DataTypes.STRING,
        }
    })

    return Hopital
}