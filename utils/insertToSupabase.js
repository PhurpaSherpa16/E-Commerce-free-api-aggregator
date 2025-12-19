import { normalizePublishedDate } from "./sanatizeNormalizer.js"
import { supabase } from "./supabaseClient.js"

export async function insertToSupabase(item) {
    let productInserted = 0
    let tagInserted = 0
    let relationInserted = 0
    let AuthorInserted = 0

    const {data : insertedProduct, error: productError} = await supabase.from('products')
        .insert({
            title: item.main.title,
            external_id : item.main.id,
            description: item.main.description,
            category: item.main.category || '',
            price: item.main.price !== undefined? item.main.price : null,
            brand: item.main.brand || '',
            stock: item.main.stock !== undefined?  item.main.stock : null,
            thumbnail_image_url : item.main.thumbnail || '',
            source : item.main.source || '',
            external_id : item.main.external_id !== undefined?  item.main.external_id : null,
            type : item.main.type || '',
            rating : item.main.rating !== undefined? item.main.rating : null
        })
        .select()
        .single()
    
    if (productError) throw productError

    productInserted++

    const tempProductId = insertedProduct.product_id
    
    if(item.type === 'book'){
        const {data: insertedBook, error:BookError} = await supabase.from('book').insert({
            product_id_fk : tempProductId,
            author : item.extensions.author || 'unknown',
            subtitle : item.extensions.subtitle || 'unknown',
            publisher : item.extensions.publisher || 'unknown',
            publisheddate : item.extensions.publishedDate !== undefined? normalizePublishedDate(item.extensions.publishedDate) : null,
            industryidentifiers : item.extensions.industryIdentifiers || 'unknown',
            pagecount : item.extensions.pageCount !== undefined?  item.extensions.pageCount : null,
            language : item.extensions.language || 'unknown',
            isbn_10 : item.extensions.isbn_10 || 'unknown',
            isbn_13 : item.extensions.isbn_13 || 'unknown',
        }).select().maybeSingle()

        if(BookError) throw BookError

        const tempBookId = insertedBook.book_id

        for (const author of item.extensions.author){
            let tempAuthorId
            
            let {data : existingAuthor, error: AuthorError} = await supabase.from('author').select('*').eq('author_name',author).maybeSingle()
            if(AuthorError) throw AuthorError

            if(existingAuthor){
                tempAuthorId = existingAuthor.author_id
            }
            else{
                let {data: newAuthor} = await supabase.from('author').insert({author_name: author}).select().single()
                tempAuthorId = newAuthor.author_id
                AuthorInserted++
            }

            const {error: bookAuthorError} = await supabase.from('book_author').insert({ book_id_fk:tempBookId, author_id_fk: tempAuthorId})
            if(bookAuthorError) throw bookAuthorError
            relationInserted++
        }  
    }

    for (const tag of item.main.tags || []){
        let tempTagId
        let {data : exisitingTag, error:tagError} = await supabase.from('tags').select('*').eq('tag_name', tag).maybeSingle()
        
        if(tagError) throw tagError

        if(exisitingTag){
            tempTagId = exisitingTag.tag_id
        }
        else{
            let {data : newTag} = await supabase.from('tags').insert({tag_name : tag}).select().single()
            tempTagId = newTag.tag_id
            tagInserted++
        }

        const {error: relationError} = await supabase.from('product_tags').insert({product_id_fk : tempProductId, tag_id_fk: tempTagId})
        if(relationError) throw relationError
        relationInserted++
    }

    for(const image of item.main.images){
        let {error: imageError} = await supabase.from('product_images').insert({
            product_id_fk : tempProductId, image_url : image})
        if(imageError) throw imageError
        relationInserted++
    }

        
    return {
        success : true, 
        productInserted,
        tagInserted,
        relationInserted,
        AuthorInserted
    }
}
