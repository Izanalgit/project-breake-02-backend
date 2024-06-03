const request =require('supertest');
const app = require('../src/index');

const mongoose = require('mongoose');
const Product = require('../src/models/Product');

const db = 'test-pb2-Products-mongodb';
const url = 'mongodb://127.0.0.1:27017/';

beforeAll(async () => await mongoose
    .connect(url + db)
    .catch(err=>console.error(err)));

beforeEach(async () => await Product.deleteMany({}));
afterEach(async () => await Product.deleteMany({}));

afterAll(async () => await mongoose.connection.close());

const product = {
    name:"Gorrocóptero",
    description:"Para salir volando con DonRamón",
    category:"Accesorios",
    sizeS:"S",
    sizeXL:"XL",
    price:4.17,
}
const productb = {
    name:"Casquet Volador",
    description:"Para salir volando con Doraimon",
    category:"Accesorios",
    sizeS:"S",
    price:9.17,
}

describe('TEST OF PRODUCTS :',()=>{

    describe('RESPONSES SSR NORMAL :',()=>{
    
        test("View all products", async () => {
            await request(app).get('/products').expect(200);
        });
        test("View product by Id", async () => {
            const newProd = await Product.create(product);
            const prodId = newProd._id;

            await request(app).get(`/products/${prodId}`).expect(200);
            await request(app).get(`/products/Nimbus2000`).expect(400);
        });
    })
    describe('RESPONSES SSR ADMIN :',()=>{
    
        test("View all products", async () => {
            await request(app).get('/dashboard').expect(200);
        });
        test("View product by Id", async () => {
            const newProd = await Product.create(product);
            const prodId = newProd._id;

            await request(app).get(`/dashboard/${prodId}`).expect(200);
            await request(app).get(`/dashboard/Nimbus2000`).expect(400);
        });
    })
    describe('FORMS SSR ADMIN :',()=>{
    
        test("Send create product form", async () => {
            await request(app).get('/dashboard/new').expect(200);
        });
        test("Send update product form", async () => {
            const newProd = await Product.create(product);
            const prodId = newProd._id;

            await request(app).get(`/dashboard/${prodId}/edit`).expect(200);
            await request(app).get(`/dashboard/Nimbus2000/edit`).expect(400);
        });
    })
    describe('FUNCTIONS MONGO-DB :',()=>{
    
        test("Create a new product", async () => {

            let prodCount = await Product.countDocuments({});
            expect(prodCount).toBe(0);

            await request(app).post("/dashboard").send(product);

            prodCount = await Product.countDocuments({});
            expect(prodCount).toBe(1);

            const prod = await Product.findOne({name:product.name});

            expect(prod.description).toBe(product.description);
            expect(prod.size).toBeDefined(new Array()["S","XL"]);
            expect(prod.category).toBe(product.category);
            expect(prod.price).toBe(product.price);
            
        });
        test("Update a product", async () => {

            const newProd = await Product.create(product);
            const prodId = newProd._id;

            await request(app).put(`/dashboard/${prodId}`).send(productb);

            const prod = await Product.findOne({name:productb.name});

            expect(prod.description).toBe(productb.description);
            expect(prod.size).toBeDefined(new Array()["S"]);
            expect(prod.category).toBe(productb.category);
            expect(prod.price).toBe(productb.price);
            
        });
        test("Delete a product", async () => {

            let prodCount = await Product.countDocuments({});
            expect(prodCount).toBe(0);

            const newProd = await Product.create(product);
            const prodId = newProd._id;

            prodCount = await Product.countDocuments({});
            expect(prodCount).toBe(1);

            await request(app).delete(`/dashboard/${prodId}/delete`);

            prodCount = await Product.countDocuments({});
            expect(prodCount).toBe(0);
            
        });
    })
})