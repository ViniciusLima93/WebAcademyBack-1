const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/', (req, res) => {
    const query = "SELECT * FROM Usuario";

    db.query(query, (err, result) => {
        if (err) {
            res.status(500).send("Erro ao obter usuários");
        } else {
            res.json(result);
        }
    });
});


router.get('/:id', (req, res) => {
    const usuarioId = req.params.id;
    const query = `SELECT * FROM Usuario WHERE Id_Usuario = ${usuarioId}`;

    db.query(query, (err, result) => {
        if (err) {
            res.status(500).send("Erro ao obter usuário");
        } else {
            res.json(result[0]);
        }
    });
});


router.post('/', (req, res) => {
    const { Login, Senha } = req.body;

    const query = `INSERT INTO Usuario (Login, Senha) VALUES ('${Login}', '${Senha}')`;

    db.query(query, (err, result) => {
        if (err) {
            console.error("Erro ao criar usuário:", err);
            res.status(500).send('Erro ao criar usuário');
        } else {
            console.log("Usuário criado com sucesso:", result);
            res.status(201).send('Usuário criado com sucesso');
        }
    });
});


router.put('/:id', (req, res) => {
    const usuarioId = req.params.id;
    const { Login, Senha } = req.body;

    const query = `UPDATE Usuario SET Login='${Login}', Senha='${Senha}' WHERE Id_Usuario=${usuarioId}`;

    db.query(query, (err, result) => {
        if (err) {
            console.error("Erro ao atualizar usuário:", err);
            res.status(500).send('Erro ao atualizar usuário');
        } else {
            console.log("Usuário atualizado com sucesso:", result);
            res.status(200).send('Usuário atualizado com sucesso');
        }
    });
});

router.delete('/:id', (req, res) => {
    const usuarioId = req.params.id;

    const query = `DELETE FROM Usuario WHERE Id_Usuario=${usuarioId}`;

    db.query(query, (err, result) => {
        if (err) {
            console.error("Erro ao excluir usuário:", err);
            res.status(500).send('Erro ao excluir usuário');
        } else {
            console.log("Usuário excluído com sucesso:", result);
            res.status(200).send('Usuário excluído com sucesso');
        }
    });
});

module.exports = router;
