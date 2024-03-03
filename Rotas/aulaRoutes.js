const express = require('express');
const router = express.Router();
const db = require('../db');

// CREATE - Adicionar uma nova aula
router.post('/', (req, res) => {
    const { conteudo, data } = req.body;

    const query = `INSERT INTO Aula (Conteudo, Data) VALUES (?, ?)`;
    const values = [conteudo, data];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error("Erro ao adicionar aula:", err);
            res.status(500).send('Erro ao adicionar aula');
        } else {
            console.log("Aula adicionada com sucesso");
            res.status(201).send('Aula adicionada com sucesso');
        }
    });
});

// READ - Obter todas as aulas
router.get('/', (req, res) => {
    const query = "SELECT * FROM Aula";

    db.query(query, (err, result) => {
        if (err) {
            console.error("Erro ao obter aulas:", err);
            res.status(500).send('Erro ao obter aulas');
        } else {
            res.json(result);
        }
    });
});

router.get('/:id', (req, res) => {
    const query = "SELECT * FROM Aula";

    db.query(query, (err, result) => {
        if (err) {
            console.error("Erro ao obter aulas:", err);
            res.status(500).send('Erro ao obter aulas');
        } else {
            res.json(result);
        }
    });
});
// UPDATE - Atualizar uma aula
router.put('/:id', (req, res) => {
    const aulaId = req.params.id;
    const { conteudo, data } = req.body;

    const query = `UPDATE Aula SET Conteudo=?, Data=? WHERE ID_Aula=?`;
    const values = [conteudo, data, aulaId];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error("Erro ao atualizar aula:", err);
            res.status(500).send('Erro ao atualizar aula');
        } else {
            console.log("Aula atualizada com sucesso");
            res.status(200).send('Aula atualizada com sucesso');
        }
    });
});

// DELETE - Excluir uma aula
router.delete('/:id', (req, res) => {
    const aulaId = req.params.id;

    const query = `DELETE FROM Aula WHERE ID_Aula=?`;
    const values = [aulaId];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error("Erro ao excluir aula:", err);
            res.status(500).send('Erro ao excluir aula');
        } else {
            console.log("Aula excluída com sucesso");
            res.status(200).send('Aula excluída com sucesso');
        }
    });
});

module.exports = router;
