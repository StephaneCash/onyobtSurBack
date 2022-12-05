const express = require('express');
const app = express();
require('dotenv').config({ path: './config/.env' });
const fileUpload = require("express-fileupload");

const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extend: true }));
app.use(
    fileUpload({
        createParentPath: true
    })
);

const routerUser = require('./routes/users.routes');
app.use('/api/users', routerUser);

const loginUser = require('./routes/loginUser.routes');
app.use('/api/user/authentification', loginUser);

const clientsRouter = require('./routes/client.routes');
app.use('/api/clients', clientsRouter);

const hopitalRouter = require('./routes/hopital.routes');
app.use('/api/hopitals', hopitalRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log('Le serveur tourne sur le port ' + PORT);
});