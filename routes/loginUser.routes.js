const loginUserController = require('../controllers/loginUserController');
const router = require('express').Router();

router.post('/', loginUserController.loginUser);

module.exports = router;