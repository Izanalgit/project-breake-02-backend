require('dotenv').config();

const express = require('express');
const methodOverride = require('method-override');
const dbConecction = require('./config/db');
const swaggerUI = require('swagger-ui-express');
const docs = require('./docs/index');
const {createSession} = require('./middlewares/authMiddleware');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 8080;

//Mongo DB connection
dbConecction();

//Root middlewares
app.use(express.urlencoded({extended:false}));//Set flase for method-override
app.use(express.json());
app.use(express.static(__dirname + '/../public'));

//Methods forms middleware(methodOverride docs)
app.use(
    methodOverride((req, res)=>{
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            let method = req.body._method
            delete req.body._method
            return method
        }
    })
)

//Session init
app.use(session(createSession()));

//Routes
app.use('/',require('./routes/productRoutes').router);
app.use('/auth',require('./routes/authRoutes').router);

//Routes API REST
app.use('/api',require('./routes/productRoutes').router_API);
app.use('/api/auth',require('./routes/authRoutes').router_API);

//Health & Documentation (marco polo es epico ahora que viene el verano y lo sabeis)
app.use('/marco',(req,res)=>res.status(200).send('<h2>polo</h2>'));
app.use('/api-docs', swaggerUI.serve,swaggerUI.setup(docs));

app.listen(PORT, ()=>console.log(`Server on port : http://localhost:${PORT}`));


module.exports = app;