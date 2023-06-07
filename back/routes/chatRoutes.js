const { Router } = require('express');
const router = Router();
const controlador = require('../controllers/chatController');
const mid = require("../middlewares/userMiddlewares");
const vJwt = require('../middlewares/validarJwt');

//Todo Isa
router.get('/listado',controlador.Listado);
router.get('/listadobloqueados',controlador.ListadoBloqueados);
router.get('/listadodesbloqueados',controlador.ListadoDesbloqueados);
module.exports = router;