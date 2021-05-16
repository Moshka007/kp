const Router = require('express');
const router = new Router();
const brandRouter = require('./brandRouter');
const userRouter = require('./userRouter');
const deviceRouter = require('./deviceRouter');
const typeRouter = require('./typeRouter');
const basketRoute = require('./basketRoute');

router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/device', deviceRouter);
router.use('/user', userRouter);
router.use('/basket', basketRoute);


module.exports = router;