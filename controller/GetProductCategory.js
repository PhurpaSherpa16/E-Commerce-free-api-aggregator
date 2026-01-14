import CatchAsync from "../utils/CatchAsync.js";
import { supabase } from "../utils/supabaseClient.js";

// this catchAsync -> utlils/CatchAsync.js will help to make code clean
// try catch don require.
// can use try catch but dont use CatchAsync()

export const GetCategoryOnly = CatchAsync( async(req, res, next) =>{
    const {data: tempData, error:CategoryFetchError} = await supabase.from('category').select('*').order('rating',{ascending:false})

    if(CategoryFetchError){
        return res.status(500).json({
            success : false,
            message : 'Failed to fetch category',
            error : CategoryFetchError.message
        })
    }
    if(!tempData || tempData.length ===0){
        return res.status(404).json({
            success : false,
            message : 'No category found'
        })
    }

    console.log(tempData)

    const returnThisData = {
        success : true,
        result : tempData
    }

    res.json(returnThisData)
})