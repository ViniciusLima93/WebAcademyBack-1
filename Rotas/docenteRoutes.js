const express = require('express');
const router = express.Router();
const db = require('../db');

// CREATE (Criar)
router.post('/', (req, res) => {
    const { Nome} = req.body;

    const query = `INSERT INTO Docente (Nome) VALUES ('${Nome}')`;

    db.query(query, (err, result) => {
        if (err) {
            console.error("Erro ao adicionar docente:", err);
            res.status(500).send('Erro ao adicionar docente');
        } else {
            res.status(201).send({message:'Docente adicionado com sucesso'});
        }
    });
});

// GET por ID
router.get('/:matricula', (req, res) => {
    const matricula = req.params.matricula;

    const query = `SELECT * FROM Docente WHERE Matricula = ${matricula}`;

    db.query(query, (err, result) => {
        if (err) {
            console.error("Erro ao obter docente por ID:", err);
            res.status(500).send("Erro ao obter docente por ID");
        } else {
            if (result.length === 0) {
                res.status(404).send("Docente não encontrado");
            } else {
                res.json(result[0]);
            }
        }
    });
});

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

router.delete('/:matricula', (req, res) => {
    const matricula = parseInt(req.params.matricula);

    const query = `DELETE FROM Docente WHERE Matricula=${matricula}`;

    db.query(query, (err, result) => {
        if (err) {
            console.error("Erro ao excluir docente:", err);
            res.status(500).send('Erro ao excluir docente');
        } else {
            console.log("Docente excluído com sucesso:", result);
            res.status(200).send({message: 'Docente excluído com sucesso'});
        }
    });
});


module.exports = router;
