const clientController = require('../controllers/clientController');
const router = require('express').Router();
const auth = require('../auth/auth');

router.post("/", clientController.addClient);
router.get('/', clientController.getAllClients);
router.get('/:id', clientController.getOneClient);
router.put("/:id", clientController.updateClient);
router.put("/edit-photo/:id", clientController.editPhoto);
router.delete('/:id', clientController.deleteClient);

module.exports = router;