const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/materia/:idMateria', (req, res) => {
    const idMateria = req.params.idMateria;
    const query = 'SELECT Matricula_Discente FROM Turma_Discente WHERE ID_Turma IN (SELECT ID_Turma FROM Turma WHERE ID_Materia = ?)';

    db.query(query, [idMateria], (err, result) => {
        if (err) {
            res.status(500).send("Erro ao obter discentes matriculados na matéria");
        } else {
            res.json(result);
        }
    });
});

router.post('/', (req, res) => {
    const { ID_Turma, Matricula_Discente } = req.body;

    const query = `INSERT INTO Turma_Discente (ID_Turma, Matricula_Discente) VALUES (${ID_Turma}, '${Matricula_Discente}')`;

    db.query(query, (err, result) => {
        if (err) {
            console.error("Erro ao adicionar discente à turma:", err);
            res.status(500).send('Erro ao adicionar discente à turma');
        } else {
            console.log("Discente adicionado à turma com sucesso:", result);
            res.status(201).send('Discente adicionado à turma com sucesso');
        }
    });
});

// Read (Ler)
router.get('/', (req, res) => {
    const query = "SELECT * FROM Turma_Discente";

    db.query(query, (err, result) => {
        if (err) {
            res.status(500).send("Erro ao obter relação turma-discente");
        } else {
            res.json(result);
        }
    });
});

// Delete (Apagar)
router.delete('/:idTurma/:matriculaDiscente', (req, res) => {
    const { idTurma, matriculaDiscente } = req.params;

    const query = `DELETE FROM Turma_Discente WHERE ID_Turma=${idTurma} AND Matricula_Discente='${matriculaDiscente}'`;

    db.query(query, (err, result) => {
        if (err) {
            console.error("Erro ao remover discente da turma:", err);
            res.status(500).send('Erro ao remover discente da turma');
        } else {
            console.log("Discente removido da turma com sucesso:", result);
            res.status(200).send('Discente removido da turma com sucesso');
        }
    });
});

module.exports = router;
