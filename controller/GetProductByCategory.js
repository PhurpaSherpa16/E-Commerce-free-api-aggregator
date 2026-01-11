import CatchAsync from "../utils/CatchAsync.js"
import { pagination } from "../utils/pagination.js"
import { supabase } from "../utils/supabaseClient.js"

export const GetProductByCategory = CatchAsync(async (req, res, next) =>{
    const { limit, page, start, end } = pagination(req, 10, 50)

    const product_category = String(req.query.name)

    if (!product_category) {
        const err = new Error("Invalid product category")
        err.status = 400
        return next(err)
    }

    const returnData = 'title, category, product_id, price, thumbnail_image_url, stock'

    const {data : tempData, error: SingleDataError, count} = await supabase.from('products').select(returnData, {count:'exact'}).ilike('category', product_category).range(start, end)
    
    if(SingleDataError){
        const err = new Error('Error fetching products for the specified category.')
        SingleDataError.status = 500
        return next(err)
    }

    if(!tempData || tempData.length === 0){
        const err = new Error('No products found for this page.')
        err.status = 404
        return next(err)
    }

    const returnThisData = {
        success : true,
        total : count,
        page : page,
        total_items : tempData.length,
        total_pages : Math.ceil(count/limit),
        result : tempData
    }

    res.json(returnThisData);

})