//Todo Alejandro

const { Router } = require('express');
const controlador = require('../controllers/aptoSangreController');
const router = Router();
// const middleware = require('../middlewares/middleware');
// const midsJWT = require("../middlewares/validarJWT");
// const midsRoles = require("../middlewares/validarRoles");
router.get('/mostrarPreguntas', controlador.mostrarPreguntas);
router.get('/mostrarPregunta/:id', controlador.mostrarPregunta);
router.post('/generarPregunta', controlador.generarPregunta);
// router.get('/mostrarPartida/:id', [midsJWT.validarJWT, midsRoles.esAdmin], controlador.mostrarPartida);
// router.post('/crearJugador',[middleware.datosJugador, middleware.rolBienEscrito], controlador.crearJugador);
// router.post('/empezarPartida', [midsJWT.validarJWT, midsRoles.esJugador], controlador.empezarPartida);
// router.post('/jugar', [middleware.objetoEscritoBien, midsJWT.validarJWT, midsRoles.esJugador], controlador.jugarPartida);

module.exports = router;
