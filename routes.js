const express = require('express');
const router = express.Router();

// Rota para obter todos os cursos (GET)
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

// Rota para criar um novo curso (POST)
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

module.exports = router;