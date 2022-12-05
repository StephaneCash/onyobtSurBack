const hopitalController = require('../controllers/hopitalController');
const router = require('express').Router();
const auth = require('../auth/auth');

router.post("/", hopitalController.addHopital);
router.get('/', hopitalController.getAllHopitaux);

/*

router.get('/:id', clientController.getOneClient);
router.put("/:id", clientController.updateClient);
router.put("/edit-photo/:id", clientController.editPhoto);
router.delete('/:id', clientController.deleteClient);

*/

module.exports = router;