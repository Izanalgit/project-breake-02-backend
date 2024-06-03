const express = require('express');
const dbConecction = require('./config/db');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

//Mongo DB connection
dbConecction();

//Root middlewares
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//Routes
app.use('/',require('./routes/productRoutes'));
// app.use('/auth',require('./routes/authRoutes'));

//Health (marco polo es epico ahora que viene el verano y lo sabeis)
app.use('/marco',(req,res)=>res.send('<h2>polo</h2>'));


app.listen(PORT, ()=>console.log(`Server on port : http://localhost:${PORT}`));