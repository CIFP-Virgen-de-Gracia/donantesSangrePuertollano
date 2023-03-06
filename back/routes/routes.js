const { Router } = require('express');
const router = Router();
const midsUser = require('../middlewares/userMiddlewares');
const midsCitas = require('../middlewares/citasMiddlewares');
const vJwt = require('../middlewares/validarJwt');
const midsValidar = require('../middlewares/validarMiddlewares');
const auth = require('../controllers/authController');
const user = require('../controllers/userController');
const contenido = require('../controllers/contenidoController');
// const junta = require('../controllers/juntaController');
const citas = require('../controllers/citasController');

// const {midEjemplo} = require('../middlewares/userMiddlewares');
const controlador=require('../controllers/noticiasController');
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

// pedir cita routes
router.get('/citas/gethorasdisponibles/:fecha', citas.getHorasDisponibles);
router.post('/citas/pedircita', [midsCitas.yaHaPedidoUnaCita], citas.pedirCita);
router.put('/citas/cancelarcita/', citas.cancelarCita);
router.get('/citas/usernotienecita/:id', citas.userNoTieneCita);
router.get('/citas/hayhuecohora/:fecha', citas.hayHuecoHora);
router.get('/citas/getcitapendienteuser/:id', citas.getCitaPendienteUser);
router.get('/citas/getcitaspasadasuser/:id', citas.getCitasPasadasUser);
router.get('/citas/yatienecita/:id', citas.yaHaPedidoUnaCita);

module.exports = router;