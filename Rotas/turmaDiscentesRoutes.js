const express = require('express');
const router = express.Router();
const db = require('../db');

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


router.get('/', (req, res) => {
    const query = "SELECT * FROM Turma_Discente";

    db.query(query, (err, result) => {
        if (err) {
            console.error("Erro ao obter discentes nas turmas:", err);
            res.status(500).send("Erro ao obter discentes nas turmas");
        } else {
            res.json(result);
        }
    });
});


router.get('/:idTurma', (req, res) => {
    const idTurma = req.params.idTurma;

    const query = `SELECT * FROM Turma_Discente WHERE ID_Turma = ${idTurma}`;

    db.query(query, (err, result) => {
        if (err) {
            console.error("Erro ao obter discentes da turma:", err);
            res.status(500).send("Erro ao obter discentes da turma");
        } else {
            res.json(result);
        }
    });
});


router.put('/:idTurma/:matriculaDiscente', (req, res) => {
    const { idTurma, matriculaDiscente } = req.params;
    const { novoID_Turma, novaMatricula_Discente } = req.body;

    const query = `UPDATE Turma_Discente 
                   SET ID_Turma=${novoID_Turma}, Matricula_Discente='${novaMatricula_Discente}' 
                   WHERE ID_Turma=${idTurma} AND Matricula_Discente='${matriculaDiscente}'`;

    db.query(query, (err, result) => {
        if (err) {
            console.error("Erro ao atualizar relação turma-discente:", err);
            res.status(500).send('Erro ao atualizar relação turma-discente');
        } else {
            console.log("Relação turma-discente atualizada com sucesso:", result);
            res.status(200).send('Relação turma-discente atualizada com sucesso');
        }
    });
});

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