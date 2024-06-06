require('dotenv').config();

const express = require('express');
const methodOverride = require('method-override');
const dbConecction = require('./config/db');
const swaggerUI = require('swagger-ui-express');
const docs = require('./docs/index');

const app = express();
const PORT = process.env.PORT || 8080;

//Mongo DB connection
dbConecction();

//Root middlewares
app.use(express.urlencoded({extended:false}));//Set flase for method-override
app.use(express.json());
app.use(express.static('../public'));//needs config !!!!!

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

//Routes
app.use('/',require('./routes/productRoutes'));
// app.use('/auth',require('./routes/authRoutes'));

//Health & Documentation (marco polo es epico ahora que viene el verano y lo sabeis)
app.use('/marco',(req,res)=>res.status(200).send('<h2>polo</h2>'));
app.use('/api-docs', swaggerUI.serve,swaggerUI.setup(docs));

app.listen(PORT, ()=>console.log(`Server on port : http://localhost:${PORT}`));


module.exports = app;