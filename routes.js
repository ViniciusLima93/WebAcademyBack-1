const express = require('express');
const router = express.Router();
const db = require('./db');
const cursoRoutes = require('./cursoRoutes');

router.use('/curso', cursoRoutes);

module.exports = router;