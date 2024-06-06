const {body,query} = require('express-validator');

const validCatergoy = (category )=>{
    const valids = [
        'Camisetas',
        'Pantalones',
        'Zapatos',
        'Accesorios'
    ];

    if(category && !valids.includes(category)){
        throw new Error ('Categoría no válida');
    }

    return true;
}
const validSize = (size)=>{
    const valids = [
        'XS',
        'S',
        'M',
        'LS',
        'XL'
    ];

    if(size && !valids.includes(size)){
        throw new Error ('Talla no válida');
    }

    return true;
}

const inputValidations = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('El nombre del producto es necesario.')
        .isLength({min:3, max: 15})
		.withMessage('El nombre del producto debe comprender de 3 a 15 caràcters')
        .isString()
        .withMessage('El nombre debe ser un string'),
    body('description')
        .trim()
        .isString()
        .withMessage('La descripción debe ser un string'),
    body('category')
        .trim()
        .notEmpty()
        .withMessage('La categorìa del producto es necesaria.')
        .custom(validCatergoy),
    body('price')
        .trim()
        .notEmpty()
        .withMessage('El producto necesita un precio.')
        .isDecimal({decimal_digits:2})
        .withMessage('El precio debe ser un numero con un máximo de 2 decimales.'),
    body('sizeXS').custom(validSize),
    body('sizeS').custom(validSize),
    body('sizeM').custom(validSize),
    body('sizeLS').custom(validSize),
    body('sizeXL').custom(validSize),
]

const categoryValidation = [
    query('cat').custom(validCatergoy),
]


module.exports = {inputValidations,categoryValidation}
