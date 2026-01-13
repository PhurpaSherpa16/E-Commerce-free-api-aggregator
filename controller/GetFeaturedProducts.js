import CatchAsync from "../utils/CatchAsync.js";
import { pagination } from "../utils/pagination.js";
import { supabase } from "../utils/supabaseClient.js";

export const GetFeaturedProducts = CatchAsync(async(req, res, next)=>{
    const {limit, page, start, end} = pagination(req, 10, 50)

    const returnData = 'title, category, product_id, price, thumbnail_image_url, stock'

    const {data: tempData, error, count} = await supabase.from('featured_products')
    .select(`priority, start_at, end_at, products(${returnData}, product_images(image_url))`, {count: "exact"})
    .order('priority', {ascending: false}).range(start, end)

    if(error){
        const err = new Error('Error fetching featured products.')
        err.status = 500
        console.log(error)
        return next(err)
    }

    if(!tempData || tempData.length === 0){
        const err = new Error('No featured products found for this page.')
        err.status = 404
        return next(err)
    }

    const result = tempData.map(item => 
        ({...item.products,
        product_images: item.products.product_images?.[0]?.image_url || null,
        featured_priority: item.priority, 
        featured_start_at: item.start_at, 
        featured_end_at: item.end_at})
    )

    const returnThisData = {
        success : true,
        total : count,
        page : page,
        total_items : tempData.length,
        total_pages : Math.ceil(count/limit),
        result : result
    }

    res.json(returnThisData);
})
