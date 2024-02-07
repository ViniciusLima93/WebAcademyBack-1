const express = require('express');
const router = express.Router();
const db = require('./db');


router.get('/', (req, res) => {
    const query = "SELECT * FROM Materia";

    db.query(query, (err, result) => {
        if (err) {
            res.status(500).send("Erro ao obter matérias");
        } else {
            res.json(result);
        }
    });
});

router.get('/:id', (req, res) => {
    const materiaId = req.params.id;
    const query = `SELECT * FROM Materia WHERE ID_Materia = ${materiaId}`;

    db.query(query, (err, result) => {
        if (err) {
            res.status(500).send("Erro ao obter matéria");
        } else {
            res.json(result[0]);
        }
    });
});

router.post('/', (req, res) => {
    const { Nome, CargaHoraria, Ementa, fk_Curso_ID_Curso } = req.body;

    const query = `INSERT INTO Materia (Nome, CargaHoraria, Ementa, fk_Curso_ID_Curso) VALUES ('${Nome}', '${CargaHoraria}', '${Ementa}', ${fk_Curso_ID_Curso})`;

    db.query(query, (err, result) => {
        if (err) {
            console.error("Erro ao criar matéria:", err);
            res.status(500).send('Erro ao criar matéria');
        } else {
            console.log("Matéria criada com sucesso:", result);
            res.status(201).send('Matéria criada com sucesso');
        }
    });
});


router.put('/:id', (req, res) => {
    const materiaId = req.params.id;
    const { Nome, CargaHoraria, Ementa, fk_Curso_ID_Curso } = req.body;

    const query = `UPDATE Materia SET Nome='${Nome}', CargaHoraria='${CargaHoraria}', Ementa='${Ementa}', fk_Curso_ID_Curso=${fk_Curso_ID_Curso} WHERE ID_Materia=${materiaId}`;

    db.query(query, (err, result) => {
        if (err) {
            console.error("Erro ao atualizar matéria:", err);
            res.status(500).send('Erro ao atualizar matéria');
        } else {
            console.log("Matéria atualizada com sucesso:", result);
            res.status(200).send('Matéria atualizada com sucesso');
        }
    });
});


router.delete('/:id', (req, res) => {
    const materiaId = req.params.id;

    const query = `DELETE FROM Materia WHERE ID_Materia=${materiaId}`;

    db.query(query, (err, result) => {
        if (err) {
            console.error("Erro ao excluir matéria:", err);
            res.status(500).send('Erro ao excluir matéria');
        } else {
            console.log("Matéria excluída com sucesso:", result);
            res.status(200).send('Matéria excluída com sucesso');
        }
    });
});

module.exports = router;
