const { Router } = require('express');
const router = Router();
const controlador = require('../controllers/chat-controller-routes');
const mid = require("../middlewares/userMiddlewares");
const vJwt = require('../middlewares/validarJwt');

//Todo Isa
router.get('/listado',controlador.Listado);
router.delete('/borrar', controlador.borrarMensajes);//Borra todo

module.exports = router;