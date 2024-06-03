const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : {
        type:String,
        // unique:[true, 'Product name have to be unique'], //Unique name?
        required:[true, 'Product name is required'],
    },
    description : {
        type:String,
    },
    image : {
        type:String,
    },
    category : {
        type:String,
        required:[true, 'Category of product is required'],
        enum : {
            values : [
                'Camisetas',
                'Pantalones',
                'Zapatos',
                'Accesorios'
            ],
            message : '{VALUE} is not available'
        }
    },
    size : [{
        type:String,
        required:[true, 'At least one size of product is required'],
        enum : {
            values : [
                'XS',
                'S',
                'M',
                'LS',
                'XL'
            ],
            message : '{VALUE} is not available'
        }
    }],
    price : {
        type:Number,
        required:[true, 'Product price is required'],
    }

})

const Product = mongoose.model('Product',productSchema);

module.exports = Product;