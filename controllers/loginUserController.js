const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const primaryKey = require('../auth/private_key');


const loginUser = (req, res) => {
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (req.body.email) {
        if (req.body.email.match(pattern)) {
            db.users.findOne({
                where: { email: req.body.email }
            })
                .then((user => {
                    if (!user) {
                        const message = 'L\'utilisateur demandé n\'existe pas';
                        return res.status(404).json({ message })
                    }
                    bcrypt.compare(req.body.password, user.password)
                        .then(isPasswordValid => {
                            if (!isPasswordValid) {
                                const message = 'Le mot de passe est incorrect';
                                return res.status(401).json({ message })
                            }

                            let id = user.id;

                            // Création du jéton pour chaque user avec jwt
                            const jeton = jwt.sign(
                                { id: user.id },
                                primaryKey,
                                { expiresIn: "5h" }
                            );

                            db.users.update({ connect: 1 }, { where: { email: req.body.email } })
                                .then(responnse => {
                                    const message = `L'utilisateur a été connecté avec succès`;
                                    res.json({ message, jeton, id, });
                                })
                                .catch(errors => {
                                    return res.json({ Erreur: errors });
                                });

                        });
                }))
                .catch(err => {
                    const message = `L'utilisateur n'a pas pu être connecté`;
                    return res.status(401).json({ message, data: err })
                });
        } else {
            const message = "Adresse email non valide.";
            return res.status(400).json({ message });
        }
    } else {
        const message = "Adresse email vide.";
        return res.status(400).json({ message });
    }


}

module.exports = {
    loginUser
}