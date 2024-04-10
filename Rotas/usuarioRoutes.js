const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require("jsonwebtoken");

const secretKey = 'secret';

function verifyTokenInRoutes (req, res,next) {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    console.log('Receveid token:', token)

    if (!token) {
        return res.status(403).send({message: "No token provided!"})
    }

    jwt.verify(token,secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).send({message:"Unauthorized", err })
        }
        res.userId = decoded.userId;
        next()

    })

}


router.get('/', verifyTokenInRoutes, (req, res) => {
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
    

    // if (!Login || !Senha) {
    //     return res.status(400).send('Por favor, forneça Login e Senha!')
    // }

    const query = `INSERT INTO Usuario (Login, Senha) VALUES ('${Login}', '${Senha}')`;

    db.query(query, (err, result) => {
        if (err) {
            console.error("Erro ao criar usuário:", err);
            res.status(500).send('Erro ao criar usuário');
        } 
            
        if (result) {
            const userId = result.insertId;
            const token  = jwt.sign({userId}, secretKey)
            console.log("Usuário criado com sucesso:", result);
            return res.json({"message": "Usuário Criado com sucesso", token});
        } else {
            return res.status(401).send('Login ou Senha Inválidos')
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
