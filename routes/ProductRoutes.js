import express from 'express'
import { GetCategoryOnly} from '../controller/GetProductCategory.js'
import { GetAllProducts } from '../controller/GetAllProducts.js'
import { GetProductByCategory } from '../controller/GetProductByCategory.js'
import { GetSearchProduct } from '../controller/GetSearchProduct.js'
import { GetFeaturedProducts } from '../controller/GetFeaturedProducts.js'
import { GetSingleProduct } from '../controller/GetSingleProdct.js'
import { GetProductByTags } from '../controller/GetProductByTags.js'

const router = express.Router()

//Get all product 
router.get('/products', GetAllProducts)

//Get by product id 
router.get('/product', GetSingleProduct)

//Get all the product category
router.get('/category', GetCategoryOnly)

//Get product specific product category
router.get('/product/category', GetProductByCategory)

// Get product by search term
router.get('/products/search', GetSearchProduct)

// Get featured products
router.get('/products/featured', GetFeaturedProducts)

// Get product by tags
router.get('/products/tags', GetProductByTags)

export default router