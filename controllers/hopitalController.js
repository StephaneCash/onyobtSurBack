const db = require('../models');
const { ValidationError, UniqueConstraintError } = require('sequelize');

const Hopital = db.hopitals;

const addHopital = async (req, res) => {
    try {
        let hopital = await Hopital.create(req.body);
        let message = 'Hôpital ajoutée avec succès';
        if (hopital) {
            res.status(201).json({ message, data: hopital })
        } else {
            return res.status(400).json({ message: "Hôpital non ajoué" })
        }
    } catch (err) {
        if (err instanceof ValidationError) {
            return res.status(400).json({
                message: err
            });
        };

        if (err instanceof UniqueConstraintError) {
            return res.status(400).json({
                message: err
            });
        };
    }
}

const getAllHopitaux = async (req, res) => {

    try {
        let hopitaux = await Hopital.findAll();
        let taille = hopitaux.length;
        let message = "La liste d'hopitaux a été bien trouvée";

        if (taille > 0) {
            res.status(200).json({ message, data: hopitaux, taille });
        } else {
            return res.status(400).json({ message: "Aucun hôpital trouvé." });
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getOneHopital = async (req, res) => {
    let id = req.params.id;
    try {
        let hopital = await Hopital.findOne({ where: { id: id } });

        if (hopital) {
            let message = "L'hôpital a été trouvé avec succès";
            res.status(200).json({ message, data: hopital })
        } else {
            let message = "Aucun hopital n'a été trouvé avec l'identifiant : " + id;
            return res.status(404).json({ message, data: hopital })
        }

    } catch (error) {
        return res.status(500).json({ error });
    }
}

const updateHopital = async (req, res) => {

    let id = req.params.id;
    let data = req.body;

    try {
        let findHopitalById = await Hopital.findOne({ where: { id: id } });

        if (findHopitalById) {
            let message = "L'hôpital a été modifié avec succès";

            let hôpitalUpdated = await Filiere.update(data, { where: { id: id } });

            if (hôpitalUpdated) {
                let hopital = await Hopital.findOne({ where: { id: id } });
                res.status(200).json({ message, data: hopital });
            } else {
                res.status(301).json({ message: "Pas de mofication" });
            }

        } else {
            let message = "Aucun hopital n'a été trouvé avec l'identifiant : " + id;
            return res.status(404).json({ message })
        }

    } catch (error) {
        return res.status(500).json({ error });
    }
}

const deleteHopital = async (req, res) => {
    let id = req.params.id;

    try {
        let findHopitalById = await Hopital.findOne({ where: { id: id } });

        if (findHopitalById) {
            let hopitalDeleted = await Hopital.destroy({ where: { id: id } });

            if (hopitalDeleted) {
                let message = "Hôpital a été supprimé avec succès : ";
                return res.status(200).json({ message })
            } else {
                let message = "hopital n'a pa été supprimé ";
                return res.status(400).json({ message })
            }

        } else {
            let message = "Aucun hopital n'a été trouvé avec l'identifiant : " + id;
            return res.status(400).json({ message });
        }

    } catch (error) {
        return res.status(500).json({ error: "Erreur interne" });
    }
}

module.exports = {
    addHopital, getAllHopitaux, getOneHopital, updateHopital, deleteHopital
}