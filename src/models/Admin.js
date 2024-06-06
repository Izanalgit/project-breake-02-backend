const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name : {
        type:String,
        unique:[true, 'Nombre no válido'],
        required:[true, 'Nombre requerido'],
    },
    pswd : {
        type:String,
        required:[true, 'Contraseña requerida'],
    },
    

})

const Admin = mongoose.model('Admin',adminSchema);

module.exports = Admin;