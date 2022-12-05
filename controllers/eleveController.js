const db = require('../models');
const { ValidationError, UniqueConstraintError } = require('sequelize');

const Eleve = db.etudiants;

const addEleve = async (req, res) => {
    try {
        let eleve = await Eleve.create(req.body);
        let message = 'Etudiant ajouté avec succès';
        if (eleve) {
            res.status(201).json({ message, data: eleve })
        } else {
            return res.status(400).json({ message: "Etudiant non ajouté" })
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

const getAllEleves = async (req, res) => {

    try {
        let eleves = await Eleve.findAll({
            include: [{
                model: db.filieres,
                as: "filieres"
            }, {
                model: db.manipulations,
                as: "manipulations"
            }]
        });
        let taille = eleves.length;
        let message = "La liste des élèves a été bien trouvée";

        if (taille > 0) {
            res.status(200).json({ message, data: eleves, taille });
        } else {
            return res.status(400).json({ message: "Aucun élève trouvé." });
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getOneEleve = async (req, res) => {
    let id = req.params.id;
    try {
        let eleve = await Eleve.findOne({ where: { id: id } });

        if (eleve) {
            let message = "L'élève a été trouvé avec succès";
            res.status(200).json({ message, data: eleve })
        } else {
            let message = "Aucun élève n'a été trouvé avec l'identifiant : " + id;
            return res.status(404).json({ message, data: eleve })
        }

    } catch (error) {
        return res.status(500).json({ error });
    }
}

const updateEleve = async (req, res) => {

    let id = req.params.id;
    let data = req.body;

    try {
        let findEleveById = await Eleve.findOne({ where: { id: id } });

        if (findEleveById) {
            let message = "L'élève a été modifié avec succès";

            let eleveUpdated = await Eleve.update({ data }, { where: { id: id } });

            if (eleveUpdated) {
                let eleve = await Eleve.findOne({ where: { id: id } });
                res.status(200).json({ message, data: eleve });
            } else {
                res.status(301).json({ message: "Pas de mofication" });
            }

        } else {
            let message = "Aucun élève n'a été trouvé avec l'identifiant : " + id;
            return res.status(404).json({ message })
        }

    } catch (error) {
        return res.status(500).json({ error });
    }
}

const deleteEleve = async (req, res) => {
    let id = req.params.id;

    try {
        let findEleveById = await Eleve.findOne({ where: { id: id } });

        if (findEleveById) {
            let eleveDeleted = await Eleve.destroy({ where: { id: id } });

            if (eleveDeleted) {
                let message = "Elève a été supprimé avec succès : ";
                return res.status(200).json({ message })
            } else {
                let message = "Elève n'a pa été supprimé ";
                return res.status(400).json({ message })
            }

        } else {
            let message = "Aucun élève n'a été trouvé avec l'identifiant : " + id;
            return res.status(400).json({ message });
        }

    } catch (error) {
        return res.status(500).json({ error: "Erreur interne" });
    }
}

module.exports = {
    addEleve, getAllEleves, getOneEleve, updateEleve, deleteEleve
}