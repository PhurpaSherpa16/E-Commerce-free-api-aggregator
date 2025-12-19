import CatchAsync from "../utils/CatchAsync.js";
import { supabase } from "../utils/supabaseClient.js";

// this catchAsync -> utlils/CatchAsync.js will help to make code clean
// try catch don require.
// can use try catch but dont use CatchAsync()
export const GetProduct = CatchAsync( async(req, res, next) => {

        const {data: tempData, error} = await supabase.from('products').select('*').order('product_id', {ascending: false})

        if(error) {
            console.log('error',error)
            return
        }

        if(!tempData || !Array.isArray(tempData)){
            const err = new Error('Products are unavailable now. Please try later. Thank You!')
            err.status = 404
            return next(err)
        }

        let data = [...tempData]

        const limit = parseInt(req.query.limit) || 10
        const page = parseInt(req.query.page) || 1

        const start = (page - 1) * limit
        const end = start + limit
        const tempResult = data.slice(start, end)

        if(tempResult.length === 0){
            const err = new Error('Products not found.')
            err.status = 404
            return next(err)
        }

        const returnThisData = {
            success : true,
            total : data.length,
            page : page,
            total_items : tempResult.length,
            total_pages : Math.ceil(data.length/limit),
            result : tempResult
        }
        res.json(returnThisData);
})

export const GetSingleProduct = CatchAsync(async (req, res, next) =>{
    const product_id = Number(req.query.id) 
    if (!product_id) {
        const err = new Error("Invalid product id")
        err.status = 400
        return next(err)
    }

    const {data : tempData, error: SingleDataError} = await supabase.from('products').select('*').eq('product_id', product_id).maybeSingle()
    
    if(SingleDataError){
        SingleDataError.status = 500
        throw SingleDataError
    }

    if(!tempData){
        const err = new Error('Invalid product id')
        err.status = 404
        return next(err)
    }
    const returnThisData = {
        success : true,
        total_items : 1,
        result : tempData
    }

    res.json(returnThisData)
})

export const GetCategory = CatchAsync(async (req, res, next) =>{
    const product_category = String(req.query.name)

    if (!product_category) {
        const err = new Error("Invalid product category")
        err.status = 400
        return next(err)
    }

    const {data : tempData, error: SingleDataError} = await supabase.from('products').select('*').ilike('category', product_category)
    
    if(SingleDataError){
        SingleDataError.status = 500
        throw SingleDataError
    }

    if(!tempData){
        const err = new Error('Invalid')
        err.status = 404
        return next(err)
    }

    let data = [...tempData]
    console.log(tempData)
    const limit = parseInt(req.query.limit) || 10
    const page = parseInt(req.query.page) || 1

    const start = (page - 1) * limit
    const end = start + limit
    const tempResult = data.slice(start, end)

    if(tempResult.length === 0){
        const err = new Error('Products not found.')
        err.status = 404
        return next(err)
    }

    const returnThisData = {
        success : true,
        total : data.length,
        page : page,
        total_items : tempResult.length,
        total_pages : Math.ceil(data.length/limit),
        result : tempResult
    }

    res.json(returnThisData);

})

export const GetCategoryOnly = CatchAsync( async(req, res, next) =>{
    const {data: tempData, error:CategoryFetchError} = await supabase.from('products').select('category')
    const tempResult = [...new Set(tempData.map(i => i.category.toLowerCase()))]
    const returnThisData = {
        success : true,
        result : tempResult
    }
    res.json(returnThisData)
})