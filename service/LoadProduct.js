import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const filePath = path.join(__dirname, '..', 'database', 'product.json')

export default function LoadProduct() {
    console.log('Load Product')
    let products = []

    try {
        products = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    } catch (error) {
        console.log('Error on loading', error)
    }

  return products
}


