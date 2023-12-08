const mongoose = require('mongoose');

const scoreSchema =mongoose.Schema({
    idUser:{
        type:String
    },
    user: { 
        type: String
    },
    score:{
        type: Number
    },
    nivel:{
        type: Number
    },
    jugador:{
        type: Number
    }
},{ collection: 'Score' })

const Score = mongoose.model("Score",scoreSchema)
module.exports = Score;