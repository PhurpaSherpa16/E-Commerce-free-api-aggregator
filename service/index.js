import { fetchDymmyProducts, fetchEscuelaProducts, fetchFakeProducts, fetchFreeApi, fetchFreeApiBook } from './fetcher/data.fetcher.js'
import { normalizeDummyProduct, normalizeEscuelaProduct, normalizeFakeProducts, normalizeFreeAPIBooks, normalizeFreeAPIProducts } from './normalizer/data.normalizer.js'

export async function getAllProducts() {
    const [dummy, esceula, fake, freeAPI, freeAPIBook] = await Promise.all([
        fetchDymmyProducts(),
        fetchEscuelaProducts(),
        fetchFakeProducts(),
        fetchFreeApi(),
        fetchFreeApiBook()
    ])
    const merged = [
        ...dummy.products.map(normalizeDummyProduct),
        ...esceula.map(normalizeEscuelaProduct),
        ...fake.map(normalizeFakeProducts),
        ...freeAPI.data?.data.map(normalizeFreeAPIProducts),
        ...freeAPIBook.data?.data.map(normalizeFreeAPIBooks)
    ]
    return merged
}