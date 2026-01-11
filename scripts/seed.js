import { SeedProduct } from "./seedProduct.js";

async function Seed(){
    console.log('hello')
    try {
        console.log('loading...')
        const data = await SeedProduct()
        console.log(data)
        console.log('complete.')
    } catch (error) {
        console.log('seeding failed: ',error)
    }
}

Seed()
