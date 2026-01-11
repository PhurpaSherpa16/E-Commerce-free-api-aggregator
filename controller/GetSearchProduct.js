import CatchAsync from "../utils/CatchAsync.js"
import { pagination } from "../utils/pagination.js"
import { supabase } from "../utils/supabaseClient.js"

export const GetSearchProduct = CatchAsync(async (req, res, next) =>{
    const searchParam = req.query.q.trim() || ''
    
    if(!searchParam){
        const err = new Error('Search parameter cannot be empty.')
        err.status = 400
        return next(err)
    }

    // Pagination
    const {limit, page, start, end} = pagination(req, 10, 50)

    // Fetching products based on search parameter
    const returnData = 'title, category, product_id, price, thumbnail_image_url, stock'
    const {data: tempData, error, count} = await supabase.from('products').select(returnData, {count: 'exact'}).order('product_id', {ascending: false}).ilike('title', `%${searchParam}%`).range(start, end)

    if(!tempData || tempData.length === 0){
        const err = new Error('No products found matching your search criteria.')
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
