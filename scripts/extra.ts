
import { getAllProducts } from "../service/index.js";
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { SeedProduct } from "./seedProduct.js";



// console.log('ENV CHECK:', process.env.SUPABASE_SERVICE_ROLE_KEY)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const sanitizePath = path.join(__dirname, '..', 'database', 'products.json')

async function Seed(){
    const products = await getAllProducts()
    const res = fs.writeFileSync(sanitizePath, JSON.stringify(products, null, 2))
    console.log('success')
    // try {
    //     const data = await SeedProduct()
    //     console.log(data)
    // } catch (error) {
    //     console.log('seeding failed: ',error)
    // }
}

Seed()


// data =[
//     {"title": "Eyeshadow Palette with Mirror", 
//     "description": "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for",
//     "category": "beauty", "price": 449, "stock": 34, 
//     "brand": "Lakame",
//     "tags": [ "beauty", "eyeshadow"]},
//     {"title": "iPhone 9", 
//     "description": "An apple mobile which is nothing like apple",
//     "price": 549,  "stock": 94, 
//     "brand": "Apple", "category": "smartphones", 
//     "tags": [ "beauty", "mascara" ]}
// ]

// let { data : existingTag} = await supabase.from('tags').select('*').eq('tag_name', tags).single()
// let {data : newTag} = await supabase.from('tags').insert({'tag_name':tags}).select().single()

// const {result, error} = await supabase.from('product_tags').insert({product_id_fk: product_id, tag_id_fk:tag_id})

