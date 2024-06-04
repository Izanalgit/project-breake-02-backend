module.exports = {
    paths: {
        "/products": {
            get: {
                tags: ["Normal View"],
                description: "Shows all the products",
                operationId: "allProductsNormal",
                parameters: [],
                requestBody: {},
                responses: {
                    200: {description: "Successfull request"},
                    500: {description: "Server error"},
                },
            },
        },
        "/products/{productId}": {
            get: {
                tags: ["Normal View"],
                description: "Shows a product by Id",
                operationId: "productByIdNormal",
                parameters: [
                    {
                        name: "productId",
                        in: "path",
                        schema: {
                            $ref: "#/components/schemas/productId",
                        },
                        description: "Id of product to be on detaill",
                    },
                ],
                requestBody: {},
                responses: {
                    200: {description: "Successfull request"},
                    400: {description: "Invalid product id"},
                    500: {description: "Server error"},
                },
            },
        },
        "/dashboard": {
            get: {
                tags: ["Admin View"],
                description: "Shows all the products",
                operationId: "allProductsAdmin",
                parameters: [],
                requestBody: {},
                responses: {
                    200: {description: "Successfull request"},
                    401: {description: "Unauthorized"},
                    500: {description: "Server error"},
                },
            },
            post: {
                tags: ["Admin View"],
                description: "Create new product",
                operationId: "createProduct",
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Product" },
                        },
                    },
                },
                responses: {
                    200: {description: "User loged out successfully"},
                    401: {description: "Unauthorized"},
                    500: {description: "Server error"},
                },
            },
        },
        "/dashboard/{productId}": {
            get: {
                tags: ["Admin View"],
                description: "Shows a product by Id",
                operationId: "productByIdAdmin",
                parameters: [
                    {
                        name: "productId",
                        in: "path",
                        schema: {
                            $ref: "#/components/schemas/productId",
                        },
                        description: "Id of product to be on detaill",
                    },
                ],
                requestBody: {},
                responses: {
                    200: {description: "Successfull request"},
                    400: {description: "Invalid product id"},
                    401: {description: "Unauthorized"},
                    500: {description: "Server error"},
                },
            },
            put: {
                tags: ["Admin View"],
                description: "Updates a product by Id",
                operationId: "updateProduct",
                parameters: [
                    {
                        name: "productId",
                        in: "path",
                        schema: {
                            $ref: "#/components/schemas/productId",
                        },
                        description: "Id of product to be updated",
                    },
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Product" },
                        },
                    },
                },
                responses: {
                    200: {description: "Successfull request"},
                    400: {description: "Invalid product id"},
                    401: {description: "Unauthorized"},
                    500: {description: "Server error"},
                },
            },
        },
        "/dashboard/new": {
            get: {
                tags: ["Admin View"],
                description: "Trows create product form",
                operationId: "createProductForm",
                parameters: [],
                requestBody: {},
                responses: {
                    200: {description: "Successfull request"},
                    401: {description: "Unauthorized"},
                    500: {description: "Server error"},
                },
            },
        },
        "/dashboard/{productId}/edit": {
            get: {
                tags: ["Admin View"],
                description: "Trows update product form by Id",
                operationId: "updateProductForm",
                parameters: [
                    {
                        name: "productId",
                        in: "path",
                        schema: {
                            $ref: "#/components/schemas/productId",
                        },
                        description: "Id of product to be updated",
                    },
                ],
                requestBody: {},
                responses: {
                    200: {description: "Successfull request"},
                    400: {description: "Invalid product id"},
                    401: {description: "Unauthorized"},
                    500: {description: "Server error"},
                },
            },
        },
        "/dashboard/{productId}/delete": {
            delete: {
                tags: ["Admin View"],
                description: "Delete product by Id",
                operationId: "deleteProduct",
                parameters: [
                    {
                        name: "productId",
                        in: "path",
                        schema: {
                            $ref: "#/components/schemas/productId",
                        },
                        description: "Id of product to be updated",
                    },
                ],
                requestBody: {},
                responses: {
                    200: {description: "Successfull request"},
                    400: {description: "Invalid product id"},
                    401: {description: "Unauthorized"},
                    500: {description: "Server error"},
                },
            },
        },
    },  
  };