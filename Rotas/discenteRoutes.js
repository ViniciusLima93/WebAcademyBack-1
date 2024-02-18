const express = require('express');
const router = express.Router();
const db = require('../db');

// CREATE (Criar)
router.post('/', (req, res) => {
    const { Nome, fk_Usuario_Id_Usuario } = req.body;

    const query = `INSERT INTO Discente (Nome, fk_Usuario_Id_Usuario) VALUES ('${Nome}', ${fk_Usuario_Id_Usuario})`;

    db.query(query, (err, result) => {
        if (err) {
            console.error("Erro ao adicionar discente:", err);
            res.status(500).send('Erro ao adicionar discente');
        } else {
            console.log("Discente adicionado com sucesso:", result);
            res.status(201).send('Discente adicionado com sucesso');
        }
    });
});

// READ (Ler)
router.get('/', (req, res) => {
    const query = "SELECT * FROM Discente";

    db.query(query, (err, result) => {
        if (err) {
            console.error("Erro ao obter discentes:", err);
            res.status(500).send("Erro ao obter discentes");
        } else {
            res.json(result);
        }
    });
});

// UPDATE (Atualizar)
router.put('/:matricula', (req, res) => {
    const matricula = req.params.matricula;
    const { Nome, fk_Usuario_Id_Usuario } = req.body;

    const query = `UPDATE Discente SET Nome='${Nome}', fk_Usuario_Id_Usuario=${fk_Usuario_Id_Usuario} WHERE Matricula=${matricula}`;

    db.query(query, (err, result) => {
        if (err) {
            console.error("Erro ao atualizar discente:", err);
            res.status(500).send('Erro ao atualizar discente');
        } else {
            console.log("Discente atualizado com sucesso:", result);
            res.status(200).send('Discente atualizado com sucesso');
        }
    });
});

// DELETE (Apagar)
router.delete('/:matricula', (req, res) => {
    const matricula = req.params.matricula;

    const query = `DELETE FROM Discente WHERE Matricula=${matricula}`;

    db.query(query, (err, result) => {
        if (err) {
            console.error("Erro ao excluir discente:", err);
            res.status(500).send('Erro ao excluir discente');
        } else {
            console.log("Discente excluído com sucesso:", result);
            res.status(200).send('Discente excluído com sucesso');
        }
    });
});

module.exports = router;
