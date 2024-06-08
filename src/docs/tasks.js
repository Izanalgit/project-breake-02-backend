module.exports = {
    paths: {
        "/api/products": {
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
        "/api/products/{productId}": {
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
        "/api/dashboard": {
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
        "/api/dashboard/{productId}": {
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
        "/api/dashboard/{productId}/delete": {
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
        "/api/auth/login": {
            post: {
                tags: ["Auth View"],
                description: "Login as Admin",
                operationId: "loginAdmin",
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Admin" },
                        },
                    },
                },
                responses: {
                    200: {description: "User loged out successfully"},
                    500: {description: "Server error"},
                },
            },
        },
        "/api/auth/regis": {
            post: {
                tags: ["Auth View"],
                description: "Regist as a new Admin",
                operationId: "regisAdmin",
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Admin" },
                        },
                    },
                },
                responses: {
                    201: {description: "Successfull admin regist"},
                    400: {description: "Invalid input"},
                    500: {description: "Server error"},
                },
            },
        },
        "/api/auth/logout": {
            get: {
                tags: ["Auth View"],
                description: "Logout admin session",
                operationId: "logoutAdmin",
                parameters: [],
                requestBody: {},
                responses: {
                    200: {description: "Successfull request"},
                    401: {description: "Unauthorized"},
                    500: {description: "Server error"},
                },
            },
        },
    },  
  };