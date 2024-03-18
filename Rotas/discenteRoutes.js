const express = require('express');
const router = express.Router();
const db = require('../db');


router.post('/', (req, res) => {
    const { Nome,Nascimento,Email} = req.body;

    const query = `INSERT INTO Discente (Nome,Nascimento,Email) VALUES ('${Nome}', '${Nascimento}','${Email}')`;

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

router.get('/:matricula', (req, res) => {
    const matricula = req.params.matricula;

    const query = `SELECT Nome FROM Discente WHERE Matricula=${matricula}`;

    db.query(query, (err, result) => {
        if (err) {
            console.error("Erro ao obter discente:", err);
            res.status(500).send("Erro ao obter discente");
        } else {
            if (result.length > 0) {
                res.json(result[0].Nome);
            } else {
                res.status(404).send("Discente não encontrado");
            }
        }
    });
});
module.exports = router;
