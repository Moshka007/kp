const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.get('/', basketController.getAll );
router.delete('/:id', basketController.deleteOne)
router.post('/', basketController.create)

module.exports = router;