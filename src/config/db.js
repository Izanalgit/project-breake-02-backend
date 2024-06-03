const mongoose = require('mongoose');
require('dotenv').config();

const BD = process.env.MONGO_BBDD || 'local-pb2-products';
const URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/';

module.exports = async function (){
    try{
        await mongoose.connect(URI + BD);
        console.log('DB-CONNECTION : CONNECT');
    }catch(err){
        console.error('DB-CONNECTION : ERROR : ',err);
        throw new Error ('ERROR : can not initialize data base');
    }
}

