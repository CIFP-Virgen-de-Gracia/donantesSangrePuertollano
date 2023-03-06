const { Router } = require('express');
const router = Router();
const midsUser = require('../middlewares/userMiddlewares');
const vJwt = require('../middlewares/validarJwt');
const midsValidar = require('../middlewares/validarMiddlewares');
const auth = require('../controllers/authController');
const user = require('../controllers/userController');
const contenido = require('../controllers/contenidoController');
const { check } = require('express-validator');

// Mario y Alicia
// auth routes
router.post('/login', auth.login); //Mario
router.post('/register', auth.register); //Mario
router.get('/activarCorreo/:id', auth.activarCorreo); //Mario
router.get('/puedeModificar/:id', auth.puedeModificar); //Alicia
router.post('/solicitarrecpasswd', auth.mandarEmailRecuperarPasswd); //Mario
router.post('/recuperarpasswd/:id', auth.recuperarPasswd); //Mario
router.get('/activarNewsletter/:id', auth.activarNewsletter); //Alicia
router.get('/desactivarNewsletter/:id', auth.desactivarNewsletter); //Alicia

// user routes
router.post('/suscripcionNewsletter', [
        check('email', 'Formato de correo no válido').isEmail(),
        midsValidar.validarCampos
    ], user.suscripcionNewsletter); //Alicia


// Contenido routes
// Todo Alicia
router.get('/getHistoria', contenido.getHistoria);
router.get('/getCargosJunta', contenido.getCargosJunta);
router.get('/getIntegrantesCargo', contenido.getIntegrantesCargo);
router.put('/updateConfigHermandad', [ vJwt.validarJwt, midsUser.midAdmin ], contenido.updateConfigHermandad);




module.exports = router;