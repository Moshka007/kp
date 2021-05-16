const Router = require('express');
const deviceController = require('../controllers/deviceController');
const router = new Router();
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), deviceController.create);
router.delete('/:id',deviceController.deleteOne)
router.put('/:id', deviceController.updatePrice)
router.get('/', deviceController.getAll);
router.get('/:id', deviceController.getOne);

module.exports = router;