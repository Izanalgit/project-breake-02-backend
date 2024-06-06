const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

const createSession= ()=>{
    return{
      secret: secret,
      resave: false,
      saveUninitialized: true,
    }
}

function generateToken(id) {
    return jwt.sign({id}, secret, { expiresIn: '1h' });
}

function verifyToken(req, res, next) {
  const token = req.session.token;

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: 'Token inválido', error: err.message });
    }

    req.id = decoded.id;
    next();
  });
}


module.exports={createSession,generateToken,verifyToken};