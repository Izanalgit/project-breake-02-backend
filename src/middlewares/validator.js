const {validationResult} = require('express-validator');

const validate = (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
        return res
            .status(422)
            .send(`<h1>Error al introducir los datos:</h1>
                        ${errors
                            .array()
                            .map(err=>{
                                return `<h2>${err.msg}</h2>`
                            })
                            .join('')
                        }
                `);
    next();
}

const validate_API_REST = (req,res,next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
		return res
            .status(422)
            .json({ errors: errors.array()});

	next();
}

module.exports = {validate,validate_API_REST}