const {generateToken} = require('../middlewares/authMiddleware');
const Admin = require('../models/Admin');

const {
    baseHtmlHead,
    baseHtmlFoot,
} = require('./ssr')

// - - - - - - - - - LOGIN FORM - - - - - - - - - 
function loginForm (req,res){
    const loginForm = `
        <form class="formAdmin" action="/auth/login" method="post">
            <label for="adminname">Nombre:</label>
            <input type="text" id="adminname" name="adminname" required><br>
        
            <label for="password">Contraseña:</label>
            <input type="password" id="password" name="password" required><br>
    
            <button type="submit">Iniciar sesión</button>
        </form> 
        <a id="regLink" href="/auth/regis">Ahun no te has registrado?</a>
    `;
  
    if(req.session.token)res.redirect("/dashboard");
    else res.send(baseHtmlHead() + loginForm + baseHtmlFoot());
};
// - - - - - - - - - LOGIN ADMIN - - - - - - - - - 
async function loginAdmin (req,res){
    const { adminname, password } = req.body;
    const admin = await Admin.find({ name:adminname, pswd:password });

    if (admin[0]) {
        const token = generateToken(admin._id);
        req.session.token = token;
        res.redirect('/dashboard');
    } else {
        res.status(401).send('<h2>Credenciales incorrectas !</h2>');
    }
};

// - - - - - - - - - REGISTER FORM - - - - - - - - - 
function regisForm (req,res){
    const regisForm = `
        <form class="formAdmin" action="/auth/regis" method="post">
            <label for="adminname">Nombre:</label>
            <input type="text" id="adminname" name="adminname" required><br>
        
            <label for="password">Contraseña:</label>
            <input type="password" id="password" name="password" required><br>
    
            <button type="submit">Crear administrador</button>
        </form> 
    `;
  
    if(req.session.token)res.redirect("/dashboard");
    else res.send(baseHtmlHead() + regisForm + baseHtmlFoot());
};

// - - - - - - - - - REGISTER ADMIN - - - - - - - - - 
async function regisAdmin (req,res){
    const { adminname, password } = req.body;
    
    const admin = await Admin.find({ name:adminname});
    if (admin.name) return res.status(401).send('<h2>Este administrador ya existe!</h2>');

    let newAdmin;

    try{
        newAdmin = await Admin.create({ name:adminname, pswd:password });
    }catch(err){
        return res
            .status(500)
            .send('<h1>Ups! algo pasa con la base de datos.</h1>');
    }

    if(!newAdmin) 
        return res
            .status(500)
            .send('<h1>No se ha podido crear el administrador.</h1>');

    
    res.redirect('/auth/login');

};
// - - - - - - - - - LOGOUT ADMIN - - - - - - - - - 
function logout (req,res){
    req.admin = false;
    req.session.destroy();
    res.redirect('/products');
};


module.exports = {
    loginForm,
    loginAdmin,
    regisForm,
    regisAdmin,
    logout
}
