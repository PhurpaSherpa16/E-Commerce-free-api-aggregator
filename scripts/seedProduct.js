import { getAllProducts } from "../service/index.js"
import { insertToSupabase } from "../utils/insertToSupabase.js"

export async function SeedProduct() {
    const summary = {
        success : false,
        productInserted: 0,
        tagInserted: 0,
        relationInserted: 0
    }

    const data = await getAllProducts()
    
    for(const product of data){
        const result = await insertToSupabase(product)
        summary.productInserted += result.productInserted
        summary.tagInserted += result.tagInserted
        summary.relationInserted = result.relationInserted
        summary.success = result.success
    }
    
    return summary
}
