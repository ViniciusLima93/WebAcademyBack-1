const express = require('express');
const router = express.Router();
const db = require('../db');


//para consultar lista de curso e materia

router.get('/', (req, res) => {
    const query = `SELECT Curso.cursoNome AS Nome_Curso, Materia.materiaNome AS Nome_Materia
    FROM Curso_Materia
    JOIN Curso ON Curso_Materia.fk_Curso_ID_Curso = Curso.ID_Curso
    JOIN Materia ON Curso_Materia.fk_Materia_ID_Materia = Materia.ID_Materia;`;

    db.query(query, (err, result) => {
        if (err) {
            console.error("Erro ao buscar cursos e matérias", err);
            res.status(500).send('Erro ao buscar cursos e matérias')
        }else {
            const formattedResult = result.map(row => ({
                Nome_Curso: row.Nome_Curso,
                Nome_Materia: row.Nome_Materia
            }))
            res.status(200).json(formattedResult)
        }
    })
})

module.exports = router;