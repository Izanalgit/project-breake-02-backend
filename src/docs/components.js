module.exports = {
    components:{
        schemas:{
            Product:{
                type:'object',
                properties:{

                    name:{
                        type:'string',
                        description:"product name",
                        example:"Gorrocóptero"
                    },
                    description:{
                        type:'string',
                        description:"product description",
                        example:"Para salir volando con Doraimon"
                    },
                    category:{
                        type:'string',
                        description:"product category",
                        enum:[
                            'Camisetas',
                            'Pantalones',
                            'Zapatos',
                            'Accesorios'
                        ]
                    },
                    size:{
                        type:'string',
                        description:"product sizes",
                        enum:[
                            'XS',
                            'S',
                            'M',
                            'LS',
                            'XL'
                        ]
                    },
                    price:{
                        type:'objectId',
                        description:"product price",
                        example: 4.17
                    }
                }
            },
            productId:{
                type:'objectId',
                description:"An id of a product",
                example: "6301064b0028de7866e2b2c4"
            },
        }
    }
}