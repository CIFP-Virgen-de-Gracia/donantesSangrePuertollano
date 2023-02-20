const { Router } = require('express');
const router = Router();
const midsUSer = require('../middlewares/userMiddlewares');
const vJwt = require('../middlewares/validarJwt');
const validarCampos = require('../middlewares/validarCampos');
// const mids = require("../middlewares/userMiddlewares");
const auth = require('../controllers/authController');
const user = require('../controllers/userController');
const junta = require('../controllers/juntaController');
const { check } = require('express-validator');
// const {midEjemplo} = require('../middlewares/userMiddlewares');


// Mario y Alicia
// auth routes
router.post('/login', auth.login); //Mario
router.post('/register', auth.register);//Mario
router.get('/activarCorreo/:id', auth.activarCorreo);//Mario
router.post('/solicitarrecpasswd', auth.mandarEmailRecuperarPasswd);//Mario
router.post('/recuperarpasswd/:id', auth.recuperarPasswd);//Mario
router.get('/activarNewsletter/:id', auth.activarNewsletter);//Alicia


// user routes
router.post('/suscripcionNewsletter', [
        check('email', 'Formato de correo no válido').isEmail(),
        check('email').custom( emailExiste ),
        validarCampos
    ], user.suscripcionNewsletter); //Alicia

// Junta routes
router.get('/getIntegrantesCargo', junta.getIntegrantesCargo); //Alicia




module.exports = router;