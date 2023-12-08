const mongoose = require('mongoose');

const userSchema =mongoose.Schema({
    Correo:{
        type:String
    },
    Usuario: { 
        type: String
    },
    Contrasena:{
        type: String
    }
},{ collection: 'Users' });

const User= mongoose.model("Users",userSchema)
module.exports=User;