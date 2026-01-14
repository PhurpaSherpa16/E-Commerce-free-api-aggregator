import CatchAsync from "../utils/CatchAsync.js"
import { pagination } from "../utils/pagination.js"
import { supabase } from "../utils/supabaseClient.js"

export const GetProductByCategory = CatchAsync(async (req, res, next) =>{
    const { limit, page, start, end } = pagination(req, 10, 50)
    const product_category = req.query.q
    
    if (!product_category) {
        const err = new Error("Invalid product category")
        err.status = 400
        return next(err)
    }
    
    const isNumber = !isNaN(product_category)
    const returnData = 'title, category, product_id, price, thumbnail_image_url, stock, description'
    let tempData, SingleDataError, count

    // checking if category is number e.g http://localhost:9000/product/category?name=126
    if(isNumber){
        const category_id = Number(product_category)
        const result = await supabase.from('products')
                .select(`${returnData}, product_category!inner(category!inner(category_id))`, { count: 'exact' })
                .eq('product_category.category.category_id', category_id)
                .range(start, end)
        tempData = result.data
        count = result.count
    }
    // if category is string e.g http://localhost:9000/product/category?name=Electronics
    else{
        const category_name = product_category.toLowerCase()
        const result = await supabase.from('products')
            .select(`${returnData}, product_category!inner(category!inner(category_name))`, { count: 'exact' })
            .eq('product_category.category.category_name', category_name)
            .range(start, end)
        tempData = result.data
        count = result.count
    }

    if(SingleDataError){
        console.log('error', SingleDataError)
        const err = new Error('Error fetching products for the specified category.')
        SingleDataError.status = 500
        return next(err)
    }

    if(!tempData || tempData.length === 0){
        const err = new Error('No products found for this page.')
        err.status = 404
        return next(err)
    }

    const tempResult = tempData.map((item)=>{
        const category_id = item.product_category?.[0]?.category?.category_id || null

        const {product_category, ...rest} = item

        return {
            ...rest,
            category_id : category_id
        }
    })

    console.log('result',tempResult)

    const returnThisData = {
        success : true,
        total : count,
        page : page,
        total_items : tempResult.length,
        total_pages : Math.ceil(count/limit),
        result : tempResult
    }

    res.json(returnThisData);

})