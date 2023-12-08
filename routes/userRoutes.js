var express = require('express');
var router = express.Router();
const User = require("../models/user");
const Score = require("../models/score");

/* GET users listing. */
router.post('/login', async function(req, res, next) {
    try {
        const nombre = req.body.nombre;
        const contrasena = req.body.contrasena;
        console.log(nombre, contrasena);
        const user = await User.find({"Usuario": nombre, "Contrasena": contrasena}).exec();
        res.json(user);
    } catch (err) {
        res.status(500).send('Error obteniendo usuarios: ' + err);
    }
});

router.post('/registro', async function(req, res, next) {
    try {
        // Validación de los datos recibidos en el cuerpo de la solicitud
        const { usuario, correo, contrasena } = req.body;

        if (!usuario || !correo || !contrasena) {
            return res.status(400).json({ message: "Por favor, proporciona todos los campos requeridos." });
        }

        // Creación del nuevo usuario utilizando el modelo User
        const newUser = new User({
            Usuario: usuario,
            Correo: correo,
            Contrasena: contrasena
        });

        // Guardar el nuevo usuario en la base de datos
        const savedUser = await newUser.save();

        // Enviar respuesta con el usuario recién creado
        res.status(201).json(savedUser);
    } catch (err) {
        // Manejo de errores
        res.status(500).json({ message: 'Error al registrar usuario', error: err.message });
    }
});

router.get('/score/:nivel', async function(req, res, next) {
    try {
        const { nivel } = req.params;
        const users = await Score.find({"nivel":nivel}).limit(10).exec();
        res.json(users);
    } catch (err) {
        res.status(500).send('Error obteniendo usuarios: ' + err);
    }
});

router.post('/nuevo-puntaje', async function(req, res, next) {
    try {
        // Validación de los datos recibidos en el cuerpo de la solicitud
        const { idUser, user, score, nivel, jugador } = req.body;

        if (!idUser || !user || !score || !nivel || !jugador) {
            return res.status(400).json({ message: "Por favor, proporciona todos los campos requeridos." });
        }

        // Creación del nuevo registro de puntaje utilizando el modelo Score
        const newScore = new Score({
            idUser: idUser,
            user: user,
            score: score,
            nivel: nivel,
            jugador: jugador
        });

        // Guardar el nuevo registro de puntaje en la base de datos
        const savedScore = await newScore.save();

        // Enviar respuesta con el registro de puntaje recién creado
        res.status(201).json(savedScore);
    } catch (err) {
        // Manejo de errores
        res.status(500).json({ message: 'Error al crear nuevo puntaje', error: err.message });
    }
});


module.exports = router;