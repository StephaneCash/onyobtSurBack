const db = require('../models');
const { ValidationError, UniqueConstraintError } = require('sequelize')
const bcrypt = require('bcrypt');

const USER = db.users;

const getAllUsers = (req, res) => {
    USER.findAll()
        .then(resp => {
            let taille = resp.length;
            const message = "La liste des utilisateurs a été bien trouvée.";
            res.status(200).json({ message: message, data: resp, taille });
        })
        .catch(err => {
            return res.send('Erreurs :: ' + err);
        });
};

const addUser = async (req, res) => {
    const { nom, email, numberPhone } = req.body;

    try {
        const password = await bcrypt.hash(req.body.password, 10);

        let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

        if (req.body.email.match(pattern)) {
            db.users.findOne({
                where: { email: req.body.email }
            }).then(user => {
                if (user) {
                    return res.status(404).json(`L'adresse email existe déjà, veuillez entrer une autre`);
                } else {
                    let dataUser = {};

                    dataUser.nom = nom;
                    dataUser.email = email;
                    dataUser.password = password;

                    USER.create(dataUser).then(value => {
                        let message = `Utilisateur créé avec succès`;
                        res.status(201).json({ message: message, data: value });
                    }).catch(err => {
                        if (err instanceof ValidationError) {
                            return res.status(400).json({
                                message: err.message.split(",\n")
                            });
                        };

                        if (err instanceof UniqueConstraintError) {
                            return res.status(400).json({
                                message: err.message
                            });
                        };
                    });
                };
            }).catch(err => {
                return res.status(500).json(`Erreur du serveur  ${err}`);
            });
        } else {
            return res.status(400).json({ message: `Adresse email non valide` });
        }
    }
    catch (err) {
        return res.status(400).json({ message: "Veuillez entrer vos données svp, email, nom et mot de passe !" });
    }

};

const getOneUser = async (req, res) => {
    let id = req.params.id;
    let user = await USER.findOne({ where: { id: id }, });

    if (user === null) {
        return res.status(404).json({ message: 'Aucun utilisateur n\'a été trouvé' });
    }
    res.status(200).json({ message: 'L\'utilisateur ' + id + ' a été trouvé avec succès', data: user });
};

const updateUser = (req, res) => {
    const { nom, email } = req.body;
    let id = req.params.id;
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    USER.findOne({ where: { id: id } })
        .then(response => {
            if (response) {
                if (email.match(pattern)) {
                    USER.update({ nom, email }, { where: { id: id } })
                        .then(resp => {
                            res.status(200).json({ message: 'L\'utilisateur ' + id + ' a été modifié avec succès', data: response });
                        })
                        .catch(err => {
                            return res.status(500).json({ message: `L'utilisateur n'a pas été modifié` });
                        });
                } else {
                    return res.status(400).json({ message: `Adresse email non valide.` });
                }
            } else {
                return res.status(404).json({ message: `L'utilisateur à modifier n'existe` });
            }
        })
        .catch(err => {
            return res.status(400).json({ message: `L'utilisateur n'existe pas.`, err: err });
        });
};

const deleteUser = (req, res) => {
    let id = req.params.id;
    USER.findOne({ where: { id: id } })
        .then(resp => {
            if (resp) {
                USER.destroy({ where: { id: id } })
                    .then(response => {
                        res.status(200).json({ message: 'L\'utilisateur ' + id + ' a été supprimé avec succès', data: resp });
                    })
            } else {
                res.status(404).json({ message: `L'utilisateur à supprimé n'existe pas` });
            }
        })
        .catch(err => {
            res.status(404).json({ message: `L'utilisateur à supprimé n'existe pas`, err: err });
        });
};

module.exports = {
    getAllUsers,
    addUser,
    getOneUser,
    updateUser,
    deleteUser
};