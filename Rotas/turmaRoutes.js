const express = require('express');
const router = express.Router();
const db = require('../db');


router.post('/', (req, res) => {
    const { Nome, ID_Materia, Matricula_Docente } = req.body;

    const query = `INSERT INTO Turma (Nome, ID_Materia, Matricula_Docente) VALUES (?, ?, ?)`;
    const values = [Nome, ID_Materia, Matricula_Docente];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error("Erro ao adicionar turma:", err);
            res.status(500).send('Erro ao adicionar turma');
        } else {
            console.log("Turma adicionada com sucesso:", result);
            res.status(201).send('Turma adicionada com sucesso');
        }
    });
});


router.get('/', (req, res) => {
    const query = "SELECT * FROM Turma";

    db.query(query, (err, result) => {
        if (err) {
            console.error("Erro ao obter turmas:", err);
            res.status(500).send("Erro ao obter turmas");
        } else {
            res.json(result);
        }
    });
});


router.get('/:id', (req, res) => {
    const turmaId = req.params.id;

    const query = "SELECT * FROM Turma WHERE ID_Turma = ?";
    const values = [turmaId];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error("Erro ao obter turma por ID:", err);
            res.status(500).send("Erro ao obter turma por ID");
        } else {
            if (result.length === 0) {
                res.status(404).send("Turma não encontrada");
            } else {
                res.json(result[0]);
            }
        }
    });
});

router.put('/:id', (req, res) => {
    const turmaId = req.params.id;
    const { Nome, ID_Materia, fMatricula_Docente } = req.body;

    const query = `UPDATE Turma SET Nome=?, ID_Materia=?, Matricula_Docente=? WHERE ID_Turma=?`;
    const values = [Nome, ID_Materia, Matricula_Docente, turmaId];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error("Erro ao atualizar turma:", err);
            res.status(500).send('Erro ao atualizar turma');
        } else {
            console.log("Turma atualizada com sucesso:", result);
            res.status(200).send('Turma atualizada com sucesso');
        }
    });
});


router.delete('/:id', (req, res) => {
    const turmaId = req.params.id;

    const query = `DELETE FROM Turma WHERE ID_Turma=?`;
    const values = [turmaId];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error("Erro ao excluir turma:", err);
            res.status(500).send('Erro ao excluir turma');
        } else {
            console.log("Turma excluída com sucesso:", result);
            res.status(200).send('Turma excluída com sucesso');
        }
    });
});

module.exports = router;
