import CatchAsync from "../utils/CatchAsync.js"
import { pagination } from "../utils/pagination.js"
import { supabase } from "../utils/supabaseClient.js"

export const GetProductByTags = CatchAsync(async (req, res, next) =>{
    const { limit, page, start, end } = pagination(req, 10, 50)

    const tag = String(req.query.name)

    if (!tag) {
        const err = new Error("Invalid tag")
        err.status = 400
        return next(err)
    }

    const returnData = 'title, category, product_id, price, thumbnail_image_url, stock, description'

    const {data : tempData, error: SingleDataError, count} = await supabase.from('products')
            .select(`${returnData}, product_tags!inner(tags!inner(tag_name))`, { count: 'exact' })
            .eq('product_tags.tags.tag_name', tag)
            .range(start, end)
            
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

    const tempResult = tempData.map(item =>({
        ...item, 
        product_tags : item.product_tags.map(tag => tag.tags.tag_name)
    }))

    console.log(tempResult)

    const returnThisData = {
        success : true,
        total : count,
        page : page,
        total_items : tempData.length,
        total_pages : Math.ceil(count/limit),
        result : tempResult
    }

    res.json(returnThisData);

})