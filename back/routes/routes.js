const {Router} = require('express');
const router = Router();
const midsUSer = require('../middlewares/userMiddlewares');
const vJwt = require('../middlewares/validarJwt');
// const mids = require("../middlewares/userMiddlewares");

const auth = require('../controllers/authController');
const user = require('../controllers/userController');

// auth routes

router.post('/login', auth.login);
router.post('/register', auth.register);
router.get('/activarCorreo/:id', auth.activarCorreo);
router.get('/activarNewsletter/:id', auth.activarNewsletter);


// user routes
router.post('/suscripcionNewsletter', user.suscripcionNewsletter);



module.exports = router;