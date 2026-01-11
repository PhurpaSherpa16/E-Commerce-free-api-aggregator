import CatchAsync from "../utils/CatchAsync.js"
import { supabase } from "../utils/supabaseClient.js"

export const GetSingleProduct = CatchAsync(async (req, res, next) =>{
    const product_id = Number(req.query.id) 
    if (!product_id) {
        const err = new Error("Invalid product id")
        err.status = 400
        return next(err)
    }

    // Fetching sinlge product 
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

    // Fetching product images
    const {data : tempImageData, error: ImageDataError} = await supabase.from('product_images').select('image_url').eq('product_id_fk', tempData.product_id)
    
    if(ImageDataError){
        ImageDataError.status = 500
        throw ImageDataError
    }

    // Fetching Tags
    let tagData = null
    let TagDataError = null
    const tagSelect = 'tags(tag_name)'
    const {data: tags, error: tagError} = await supabase.from('product_tags').select(tagSelect).eq('product_id_fk', tempData.product_id)
    tagData = tags
    TagDataError = tagError

    if(TagDataError){
        TagDataError.status = 500
        throw TagDataError
    }

    const tagsList = tagData ? tagData.map(item => item.tags.tag_name) : []
    tempData.tags = tagsList

    console.log(tagData)

    // Fetching Book details if product type is book
    let bookData = null
    let BookDataError = null
    const bookDetailsReturn = 'book_id, subtitle, publisher, publisheddate, pagecount, language, isbn_10, isbn_13, book_category'
    if(tempData.category.toLowerCase() === 'book'){
       const {data, error} = await supabase.from('book').select(bookDetailsReturn).eq('product_id_fk', tempData.product_id).maybeSingle()
       bookData = data
       BookDataError = error
    }
    if(BookDataError){
        ImageDataError.status = 500
        throw ImageDataError
    }

    // fetching author details if book
    let authorData = null
    let AuthorDataError = null
    if(tempData.category.toLowerCase() === 'book' && bookData){
        const {data, error} = await supabase.from('book_author').select('author(*)').eq('book_id_fk', bookData.book_id)
        authorData = data
        AuthorDataError = error
    }

    if(AuthorDataError){
        AuthorDataError.status = 500
        throw AuthorDataError
    }

    const authors = authorData ? authorData.map(item => item.author.author_name) : []
    if(tempData.category.toLowerCase() === 'book' && bookData){
        bookData.authors = authors
    }
    
    const tempResult = {
        ...tempData,
        images: tempImageData.map(i => i.image_url),
    }
    if(tempData.category.toLowerCase() === 'book'){
        tempResult.bookDetalils = bookData || null
    }

    const returnThisData = {
        success : true,
        total_items : 1,
        result : tempResult
    }

    res.json(returnThisData)
})