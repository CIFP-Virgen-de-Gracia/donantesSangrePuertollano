const {Router} = require('express');
const router = Router();
const midsUSer = require('../middlewares/userMiddlewares');
const vJwt = require('../middlewares/validarJwt');
// const mids = require("../middlewares/userMiddlewares");
const auth = require('../controllers/authController');
const user = require('../controllers/userController');

// const {midEjemplo} = require('../middlewares/userMiddlewares');
const controlador=require('../controllers/noticiasController');

// Mario y Alicia
// auth routes
router.post('/login', auth.login);
router.post('/register', auth.register);
router.get('/activarCorreo/:id', auth.activarCorreo);
router.post('/solicitarrecpasswd', auth.mandarEmailRecuperarPasswd);
router.post('/recuperarpasswd/:id', auth.recuperarPasswd);

router.get('/activarNewsletter/:id', auth.activarNewsletter);


// user routes
router.post('/suscripcionNewsletter', user.suscripcionNewsletter);




module.exports = router;