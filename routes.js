const express = require('express');
const router = express.Router();
const db = require('./db');

//GET
router.get('/curso', (req, res) => {
    const query = "SELECT * FROM Curso";

    db.query(query, (err, result) => {
        if (err) {
            res.status(500).send("Erro ao obter cursos");
        } else {
            res.json(result);
        }
    });
});

//POST
router.post('/curso', (req, res) => {
    const { nome } = req.body;

    const query = `INSERT INTO Curso (Nome) VALUES ('${nome}')`;

    console.log("Query:", query);

    db.query(query, (err, result) => {
        if (err) {
            console.error("Erro ao criar curso:", err);
            res.status(500).send('Erro ao criar curso');
        } else {
            console.log("Curso criado com sucesso:", result);
            res.status(201).send('Curso criado com sucesso');
        }
    });
});

//PUT
router.put('/curso/:id', (req, res) => {
    const courseId = req.params.id;
    const { nome } = req.body;

    const query = `UPDATE Curso SET Nome='${nome}' WHERE ID=${courseId}`;

    db.query(query, (err, result) => {
        if (err) {
            console.error("Erro ao atualizar curso:", err);
            res.status(500).send('Erro ao atualizar curso');
        } else {
            console.log("Curso atualizado com sucesso:", result);
            res.status(200).send('Curso atualizado com sucesso');
        }
    });
});

// DELETE
router.delete('/curso/:id', (req, res) => {
    const courseId = req.params.id;

    const query = `DELETE FROM Curso WHERE ID=${courseId}`;

    db.query(query, (err, result) => {
        if (err) {
            console.error("Erro ao excluir curso:", err);
            res.status(500).send('Erro ao excluir curso');
        } else {
            console.log("Curso excluído com sucesso:", result);
            res.status(200).send('Curso excluído com sucesso');
        }
    });
});

module.exports = router;