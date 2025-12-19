import { ApiFetch } from "./ApiFetch.js"

export async function fetchDymmyProducts() {
    const url = `https://dummyjson.com/products?limit=194`
    const data = await ApiFetch({url, src:'Dummy JSON'})
    return data
}

export async function fetchEscuelaProducts(){
    const url = `https://api.escuelajs.co/api/v1/products?offset=0&limit=22`
    const data = await ApiFetch({url, src:'Escuela JSON'})
    return data
}

export async function fetchFakeProducts() {
    const url = 'https://fakestoreapi.com/products'
    const data = await ApiFetch({url, src:'Fake JSON'})
    return data
}

export async function fetchFreeApi(){
    const url = 'https://api.freeapi.app/api/v1/public/randomproducts?page=1&limit=1000'
    const data = await ApiFetch({url, src:'FreeAPI JSON'})
    return data
}

export async function fetchFreeApiBook(){
    const url = 'https://api.freeapi.app/api/v1/public/books?page=1&limit=500'
    const data = await ApiFetch({url, src:'FreeAPI JSON'})
    return data
}