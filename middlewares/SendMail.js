const nodemailer = require('nodemailer');
const primaryKey = require('../auth/private_key');


module.exports = async (email, subject, text) => {
    try {
        const transpoter = nodemailer.createTransport({
            host: process.env.HOST_EMAIL,
            service: process.env.SERVICE,
            port: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth: {
                user: "kikonistephane@gmail.com",
                pass: "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",
                type: "OAuth2",
                clientSecret: primaryKey,
                refreshToken: primaryKey,
                accessToken: primaryKey,
                clientId: "305100541711-j1nsec3ceugdtkbjcoee6q03cvn3ep15.apps.googleusercontent.com"
            }
        });

        await transpoter.sendMail({
            from: "kikonistephane@gmail.com",
            to: "kikonistephane@gmail.com",
            subject: subject,
            text: text,
        });

        console.log('Email envoyé avec succès')

    } catch (error) {
        console.log("Erreurs :: ", error)
    }
};