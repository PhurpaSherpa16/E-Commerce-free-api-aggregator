import express from 'express'
import {GetCategory, GetCategoryOnly, GetProduct, GetSingleProduct} from '../controller/GetProduct.js'

const router = express.Router()

//Get all product 
router.get('/products', GetProduct)

//Get by product id 
router.get('/product', GetSingleProduct)

//Get all the product category
router.get('/category', GetCategoryOnly)

//Get product specific product category
router.get('/product_category/category', GetCategory)



export default router