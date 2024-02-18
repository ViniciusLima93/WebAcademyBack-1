const express = require('express');
const router = express.Router();
const db = require('../db');

// CREATE (Criar)
router.post('/', (req, res) => {
    const { Nome, fk_Usuario_Id_Usuario } = req.body;

    const query = `INSERT INTO Docente (Nome, fk_Usuario_Id_Usuario) VALUES ('${Nome}', ${fk_Usuario_Id_Usuario})`;

    db.query(query, (err, result) => {
        if (err) {
            console.error("Erro ao adicionar docente:", err);
            res.status(500).send('Erro ao adicionar docente');
        } else {
            console.log("Docente adicionado com sucesso:", result);
            res.status(201).send('Docente adicionado com sucesso');
        }
    });
});

// READ (Ler)
router.get('/', (req, res) => {
    const query = "SELECT * FROM Docente";

    db.query(query, (err, result) => {
        if (err) {
            console.error("Erro ao obter docentes:", err);
            res.status(500).send("Erro ao obter docentes");
        } else {
            res.json(result);
        }
    });
});

// UPDATE (Atualizar)
router.put('/:matricula', (req, res) => {
    const matricula = req.params.matricula;
    const { Nome, fk_Usuario_Id_Usuario } = req.body;

    const query = `UPDATE Docente SET Nome='${Nome}', fk_Usuario_Id_Usuario=${fk_Usuario_Id_Usuario} WHERE Matricula=${matricula}`;

    db.query(query, (err, result) => {
        if (err) {
            console.error("Erro ao atualizar docente:", err);
            res.status(500).send('Erro ao atualizar docente');
        } else {
            console.log("Docente atualizado com sucesso:", result);
            res.status(200).send('Docente atualizado com sucesso');
        }
    });
});

// DELETE (Apagar)
router.delete('/:matricula', (req, res) => {
    const matricula = req.params.matricula;

    const query = `DELETE FROM Docente WHERE Matricula=${matricula}`;

    db.query(query, (err, result) => {
        if (err) {
            console.error("Erro ao excluir docente:", err);
            res.status(500).send('Erro ao excluir docente');
        } else {
            console.log("Docente excluído com sucesso:", result);
            res.status(200).send('Docente excluído com sucesso');
        }
    });
});

module.exports = router;
