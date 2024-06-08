# Clothes catalogue

Node Express SSR API of clothes catalogue with admin dasboard.

## Index

  - [Deploy](#deploy)
  - [End Points](#end-points)
  - [Data Base](#data-base)
  - [Validations](#validations)
  - [Middlewares](#middlewares)
  - [Tests](#tests)
  - [Enviorement values](#enviorement-values)
  - [Modules](#modules)

## Deploy

This API is initialiced with npm, then in order to deploy on console (root directory):

```bash
  npm start
```

For dev deploy on local server:

```bash
  npm run dev
```

## End Points

- User end points:
  - GET /products: See all products
  + GET /products/:productId: See product details by id on request parameter.

* Admin end points:
  - GET /dashboard: Admin dasboard, can se all product plus admin actions like delete or update.
  * GET /dashboard/new: Trows create product form.
  * POST /dashboard: Creates a new product by object on request body.
  * GET /dashboard/:productId: Detailed product by id with admin actions.
  * GET /dashboard/:productId/edit: Trows update product form with previous values on default.
  * PUT /dashboard/:productId: Updates product by object on request body.
  + DELETE /dashboard/:productId/delete: Updates product by id on request parameter.

+ Auth end points:
  - GET /auth/login: Trows admin login form.
  * POST /auth/login: Logs in admin acout by object on request body with session.
  * GET /auth/regis: Trows admin regist form.
  * POST /auth/regis: Regists new admin acout by object on request body.
  + GET /auth/logut: Logs out admin and deletes session.

## Data Base

This API is feed with MongoDB on Atlas service with mongoose modules. Theres a local default configuration for dev but requires enviorement value for Atlas URI.

DB configuration on `/src/config` 

DB models of admin user and product on `/src/models` 

## Validations

User inputs validations are take it from express-validator module on `/src/models/bodyInputs.js`.
Theres some config for each user input, even request parameters.

***Remember to add validator middleware on last postition of config validations.***

## Middlewares

General middlewares are on directory `/src/middlewares` ...

- File `/src/middlewares/authMiddleware.js`: 

Contains all the functions that requires secret like session config plus admin authentification middleware, in order to require authentification just add `verifyToken` to the router endpoint.

- File `/src/middlewares/validator.js`:

Contains the validator middleware.


## Tests

All tests are made with jest module. Theres response test for all the products endpoints.
Test file : `/src/test/productController.test.js`

Is required to have mongo serevice active, automatic creates an extra date base for tests on localhost with mongo compass standard values.

Test command:
```bash
  npm test
```

***Because of session logics, dont forguet to comment or delete authentification middleware on endpoints !!***

## Enviorement values

- SERVER:
```
PORT=<prefered_server_port>
SECRET=<secure_own_secret>
```

- MONGO DB:
```
MONGO_DB=<bd_atlas>
MONGO_URI=<uri_bd_atlas>
```


## Modules

- General :
  - [Express](https://expressjs.com/)
  * [Mongoose](https://mongoosejs.com/)
  * [dotenv](https://www.npmjs.com/package/dotenv)
  * [express-session](https://www.npmjs.com/package/express-session)
  * [express-validator](https://www.npmjs.com/package/express-validator)
  * [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
  * [method-override](https://www.npmjs.com/package/method-override)
  + [swagger-ui-express](https://www.npmjs.com/package/dotenv)

+ Devolper:
  - [jest](https://www.npmjs.com/package/jest)
  + [supertest](https://www.npmjs.com/package/supertest)


