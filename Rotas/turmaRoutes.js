const express = require('express');
const router = express.Router();
const db = require('../db');

// CREATE (Criar)
router.post('/', (req, res) => {
    const { Nome, ID_Materia, fk_Docente_Matricula } = req.body;

    const query = `INSERT INTO Turma (Nome, ID_Materia, fk_Docente_Matricula) VALUES (?, ?, ?)`;
    const values = [Nome, ID_Materia, fk_Docente_Matricula];

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

// READ (Ler)
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

// UPDATE (Atualizar)
router.put('/:id', (req, res) => {
    const turmaId = req.params.id;
    const { Nome, ID_Materia, fk_Docente_Matricula } = req.body;

    const query = `UPDATE Turma SET Nome=?, ID_Materia=?, fk_Docente_Matricula=? WHERE ID_Turma=?`;
    const values = [Nome, ID_Materia, fk_Docente_Matricula, turmaId];

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

// DELETE (Apagar)
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
