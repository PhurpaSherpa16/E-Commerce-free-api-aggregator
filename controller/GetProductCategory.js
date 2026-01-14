import CatchAsync from "../utils/CatchAsync.js";
import { supabase } from "../utils/supabaseClient.js";

// this catchAsync -> utlils/CatchAsync.js will help to make code clean
// try catch don require.
// can use try catch but dont use CatchAsync()

export const GetCategoryOnly = CatchAsync( async(req, res, next) =>{
    const {data: tempData, error:CategoryFetchError} = await supabase.from('products').select('category')
    const tempResult = [...new Set(tempData.map(i => i.category.toLowerCase()))]
    const returnThisData = {
        success : true,
        result : tempResult
    }
    console.log(tempData)
    res.json(returnThisData)
})