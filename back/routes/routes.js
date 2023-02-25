const {Router} = require('express');
const router = Router();
const midsUSer = require('../middlewares/userMiddlewares');
const vJwt = require('../middlewares/validarJwt');
// const mids = require("../middlewares/userMiddlewares");
const auth = require('../controllers/authController');
const user = require('../controllers/userController');
const junta = require('../controllers/juntaController');
const citas = require('../controllers/citasController');

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

// Junta routes
router.get('/getIntegrantesCargo', junta.getIntegrantesCargo);


// pedir cita routes
// router.get('/citas/citasreservadas/:fecha', citas.getCitasReservadas);
// router.get('/citas/gethorariocitas', citas.getHorarioCitas);
router.get('/citas/gethorasdisponibles/:fecha', citas.getHorasDisponibles);
router.post('/citas/pedircita', citas.pedirCita);
router.get('/citas/usernotienecita/:id', citas.userNoTieneCita);
router.get('/citas/hayhuecohora/:fecha', citas.hayHuecoHora);
router.post('/citas/mandarcorreocita', citas.mandarCorreoFechaCita);
// router.get('/citas/getcitapendienteuser/:id', citas.);

module.exports = router;