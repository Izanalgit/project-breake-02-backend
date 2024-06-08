const {generateToken} = require('../middlewares/authMiddleware');
const Admin = require('../models/Admin');


// - - - - - - - - - LOGIN ADMIN - - - - - - - - - 
async function loginAdmin (req,res){
    const { adminname, password } = req.body;
    const admin = await Admin.find({ name:adminname, pswd:password });

    if (admin[0]) {
        const token = generateToken(admin._id);
        req.session.token = token;
        res
            .status(200)
            .json({message:"Bienvenido !"});
    } else {
        res
            .status(401)
            .json({message:"Credenciales incorrectas !"});
    }
};
// - - - - - - - - - REGISTER ADMIN - - - - - - - - - 
async function regisAdmin (req,res){
    const { adminname, password } = req.body;
    
    const admin = await Admin.find({ name:adminname});
    if (admin.name) return res.status(401).json({message:"Este administrador ya existe !"});

    let newAdmin;

    try{
        newAdmin = await Admin.create({ name:adminname, pswd:password });
    }catch(err){
        return res
            .status(500)
            .json({message:"Ups! algo pasa con la base de datos."});
    }

    if(!newAdmin) 
        return res
            .status(500)
            .json({message:"No se ha podido crear el administrador."});

    
        res
            .status(201)
            .json({message:"Usuario registrado con exito !"});

};
// - - - - - - - - - LOGOUT ADMIN - - - - - - - - - 
function logout (req,res){
    req.session.destroy();
    res
        .status(200)
        .json({message:"Hasta pronto !"});
};


module.exports = {
    loginAdmin,
    regisAdmin,
    logout
}
