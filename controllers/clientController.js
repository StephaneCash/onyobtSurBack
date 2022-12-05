const db = require('../models');
const { ValidationError, UniqueConstraintError } = require('sequelize');

const Client = db.clients;

const addClient = async (req, res) => {
    try {
        let client = await Client.create(req.body);
        let message = 'Client ajouté avec succès';
        if (client) {
            res.status(201).json({ message, data: client })
        } else {
            return res.status(400).json({ message: "Client non ajouté" })
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

const getAllClients = async (req, res) => {
    try {
        let client = await Client.findAll({});
        let taille = client.length;
        let message = "La liste des clients a été bien trouvée";

        if (taille > 0) {
            res.status(200).json({ message, data: client, taille });
        } else {
            return res.status(400).json({ message: "Aucun client trouvé." });
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getOneClient = async (req, res) => {
    let id = req.params.id;
    try {
        let client = await Client.findOne({ where: { id: id } });

        if (client) {
            let message = "Le client a été trouvé avec succès";
            res.status(200).json({ message, data: client })
        } else {
            let message = "Aucun client n'a été trouvé avec l'identifiant : " + id;
            return res.status(404).json({ message, data: client })
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
}

const updateClient = async (req, res) => {

    let id = req.params.id;

    try {
        let findClientById = await Client.findOne({ where: { id: id } });
        if (findClientById) {
            let message = "Le client a été modifié avec succès";

            let clientgUpdated = await Client.update(req.body, { where: { id: id } });

            if (clientgUpdated) {
                let client = await Client.findOne({ where: { id: id } });
                res.status(200).json({ message, data: client });
            } else {
                res.status(301).json({ message: "Pas de mofication" });
            }
        } else {
            let message = "Aucun client n'a été trouvé avec l'identifiant : " + id;
            return res.status(404).json({ message })
        }

    } catch (error) {
        return res.status(500).json({ error });
    }
}

const deleteClient = async (req, res) => {
    let id = req.params.id;

    try {
        let findClientById = await Client.findOne({ where: { id: id } });

        if (findClientById) {
            let clientDeleted = await Client.destroy({ where: { id: id } });

            if (clientDeleted) {
                let message = "Client a été supprimé avec succès : ";
                return res.status(200).json({ message })
            } else {
                let message = "Client n'a pa été supprimé ";
                return res.status(400).json({ message })
            }

        } else {
            let message = "Aucun client n'a été trouvé avec l'identifiant : " + id;
            return res.status(400).json({ message });
        }

    } catch (error) {
        return res.status(500).json({ error: "Erreur interne" });
    }
}

const editPhoto = async (req, res) => {
    try {

        const id = req.params.id;
        const file = req.files.file;

        file.mv('../front/public/' + file.name);
        let findClientById = await Client.findOne({ where: { id: id } });

        if (findClientById) {

            let message = "Le client a été modifié avec succès";
            let clientgUpdated = await Client.update({ photo: file.name }, { where: { id: id } });

            if (clientgUpdated) {
                let client = await Client.findOne({ where: { id: id } });
                res.status(200).json({ message, data: client });
            } else {
                res.status(301).json({ message: "Pas de mofication" });
            }
        } else {
            let message = "Aucun client n'a été trouvé avec l'identifiant : " + id;
            return res.status(404).json({ message })
        }
    } catch (error) {
        return res.status(500).json({ error: "Erreur interne" });
    }
}

module.exports = {
    addClient, getAllClients, getOneClient, updateClient, deleteClient, editPhoto
}