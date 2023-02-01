const {Router} = require('express');
const router = Router();
const midsUSer = require('../middlewares/userMiddlewares');
const vJwt = require('../middlewares/validarJwt');
// const mids = require("../middlewares/userMiddlewares");

const auth = require('../controllers/authController');
const {midEjemplo} = require('../middlewares/userMiddlewares');

// auth routes

router.post('/login', auth.login);
router.post('/register', auth.register);

module.exports = router;