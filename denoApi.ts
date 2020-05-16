import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import {serve} from "https://deno.land/std/http/server.ts";

// File: Model
interface Products {
    id: number,
    name: string,
    price: number,
    isCashOnDelivery: boolean
}

//File: Data (mocking the database)
let products: Array<Products> = [
    {   
        id: 0,
        name: "Apple MacBook Air",
        price: 85000,
        isCashOnDelivery: true

    }, 
    {
        id: 1,
        name: "Lenovo Ideapad",
        price: 50000,
        isCashOnDelivery: true
    }, 
    {
        id: 2,
        name: "Nike Sneakers",
        price: 4000,
        isCashOnDelivery: false
    }, 
    {
        id: 3,
        name: "Redmi Note 8",
        price: 12000,
        isCashOnDelivery: true
    },  
];

// File: Controllers
export const getProducts = ({response} : {response: any}) => {
    response.body = products;
}

export const addProduct = async ( {request, response} : 
    {request: any, response: any}) => {
    const body = await request.body();
    const course: Products = body.value;

    products.push(course);
    response.body = {productAdded: "Success"};
    response.status = 200;
};

// File: Server
const router = new Router();
const app = new Application();

// File: Routers
router
    .get("/product", getProducts)
    .post("/create", addProduct);

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 5000});