const express = require('express');
const router = express.Router();

const cursoRoutes = require('./Rotas/cursoRoutes');
const materiaRoutes = require('./Rotas/materiaRoutes');
const usuarioRoutes = require('./Rotas/usuarioRoutes');
const aulaRoutes = require('./Rotas/aulaRoutes');
const turmaRoutes = require('./Rotas/turmaRoutes');
const turmaDiscentesRoutes = require('./Rotas/turmaDiscentesRoutes');
const discenteRoutes = require('./Rotas/discenteRoutes');
const docenteRoutes = require('./Rotas/docenteRoutes');
const cursoMateria  = require('./Rotas/cursoMateria');

router.use('/aula', aulaRoutes);
router.use('/usuario', usuarioRoutes);
router.use('/curso', cursoRoutes);
router.use('/materia', materiaRoutes);
router.use('/turma', turmaRoutes);
router.use('/turmaDiscentes', turmaDiscentesRoutes);
router.use('/discente', discenteRoutes);
router.use('/docente', docenteRoutes);
router.use('/curso-materia',cursoMateria);

module.exports = router;