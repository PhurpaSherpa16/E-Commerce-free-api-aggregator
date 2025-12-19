import { createClient } from "@supabase/supabase-js"
import 'dotenv/config'

const supabase_Url = process.env.SUPABASE_URL
const supabase_key = process.env.SUPABASE_SERVICE_ROLE_KEY

if(!supabase_Url || !supabase_key){
    throw new Error('Credentials missing.')
}

export const supabase = createClient(
    supabase_Url, supabase_key
)
