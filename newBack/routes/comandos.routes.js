const express = require("express");
const router = express.Router();

//const authMiddleware = require('../middlewaree/authMiddleware');
const commandosController = require('../controller/comandos_controller')
const db = require("../db");
const { v4: uuidv4 } = require("uuid");

router.post('/create', commandosController.CreateComandos)
// router.post('/login', commandosController.loginComac)

module.exports = router;