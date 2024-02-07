const express = require('express');
const router = express.Router();
const db = require('./db');
const cursoRoutes = require('./cursoRoutes');
const materiaRoutes = require('./materiaRoutes');

router.use('/curso', cursoRoutes);
router.use('/materia', materiaRoutes);

module.exports = router;