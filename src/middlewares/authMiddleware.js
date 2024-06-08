const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const secret = process.env.SECRET;

//Session config
const createSession= ()=>{
    return{
      secret: secret,
      resave: false,
      saveUninitialized: true,
      cookie: {secure: false} //Free services dont accept encrypted cookies? ):
    }
}

//Token generator
function generateToken(id) {
    return jwt.sign({id}, secret, { expiresIn: '1h' });
}

//Token middleware
async function verifyToken(req, res, next) {
  const token = req.session.token;

  if (!token) {
    return res.status(401).send('<h1>Error de autentificación.</h1>');
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res
        .redirect('/login');
    }

    const admin = Admin.findById(decoded.id)
        .then(adm=>adm)
        .catch(()=>{
            return res
                .status(500)
                .send('<h1>Ups! algo pasa con la base de datos de administradores.</h1>');
        })

    admin?
        req.admin = true:
        req.admin = false;

    next();
  });
}
//Token middleware API REST
async function verifyToken_API(req, res, next) {
  const token = req.session.token;

  if (!token) {
    return res.status(401).json({error:'Error de autentificación.'});
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res
        .status(400)
        .json({message:'Ya estás logueado.'});
    }

    const admin = Admin.findById(decoded.id)
        .then(adm=>adm)
        .catch(()=>{
            return res
                .status(500)
                .json({error:'Ups! algo pasa con la base de datos de administradores'});
        })

    next();
  });
}


module.exports={
  createSession,
  generateToken,
  verifyToken,
  verifyToken_API
};