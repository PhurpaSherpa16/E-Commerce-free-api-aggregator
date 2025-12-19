import { normalizeCatogery, normalizeImages, normalizePublishedDate, normalizeThumbnail } from "../../utils/sanatizeNormalizer.js"

export function normalizeDummyProduct(item) {
  return {
    main: {external_id : item.id,
      title: item.title,
      description: item.description || 'N/A',
      price: item.price !== undefined? item.price : null,
      stock: item.stock !== undefined?  item.stock : null,
      rating: item.rating !== undefined? item.rating : null,
      brand: item.brand || 'unknown',
      type: normalizeCatogery(item.category) || 'unknown',
      category: normalizeCatogery(item.category) || 'unknown',
      tags: Array.isArray(item.tags) ? item.tags : ['unknown'],
      thumbnail: normalizeThumbnail(item.thumbnail) || '',
      images: normalizeImages(item.images),
      source : 'dummy-JSON'
    },
    type : 'product',
    extensions : null
  }
}

export function normalizeEscuelaProduct(item){
  return {
    main: {
      external_id : item.id,
      title: item.title,
      description: item.description || 'N/A',
      price: item.price !== undefined? item.price : null,
      stock: item.stock !== undefined?  item.stock : null,
      rating: item.rating !== undefined? item.rating : null,
      brand: item.brand || 'unknown',
      type: normalizeCatogery(item.category?.slug) || 'unknown',
      category: normalizeCatogery(item?.category?.name) || 'unknown',
      tags: item.tags || ['unknown'],
      thumbnail: item.thumbnail || (Array.isArray(item.images) ? normalizeThumbnail(item.images[0]) : normalizeThumbnail('')),
      images: normalizeImages(item.images),
      source : 'Escuela-JSON'
    },
    type : 'product',
    extensions : null
  }
}

export function normalizeFakeProducts(item){
  return {
    main: {
      external_id : item.id,
      title: item.title,
      description: item.description || 'N/A',
      price: item.price !== undefined? item.price : null,
      stock: item.stock !== undefined?  item.stock : null,
      rating: item.rate !== undefined? item.rate : null,
      brand: item.brand || 'unknown',
      type: normalizeCatogery(item?.category) || 'unknown',
      category: normalizeCatogery(item?.category) || 'unknown',
      tags: item.tags || ['unknown'],
      thumbnail: normalizeThumbnail(item.thumbnail),
      images: normalizeImages(item.images),
      source : 'Fake-JSON'
    },
    type : 'product',
    extensions : null
  }
}

export function normalizeFreeAPIProducts(item){
  return{
    main:{external_id : item.id,
      title: item.title,
      description: item.description || 'N/A',
      price: item.price !== undefined? item.price : null,
      stock: item.stock !== undefined?  item.stock : null,
      rating: item.rate !== undefined? item.rate : null,
      brand: item.brand || 'unknown',
      type: normalizeCatogery(item?.category) || 'unknown',
      category: normalizeCatogery(item?.category) || 'unknown',
      tags: item.tags || ['unknown'],
      thumbnail: normalizeThumbnail(item.thumbnail),
      images: normalizeImages(item.images),
      source : 'FreeAPI-JSON'
    },
    type : 'product',
    extensions : null
  }
}

export function normalizeFreeAPIBooks(item){
  return{ 
      main : {
        external_id : item.id,
        title: item.volumeInfo?.title,
        description: item.volumeInfo?.description || 'N/A',
        price: item.saleInfo.retailPrice?.amount !== undefined ? item.saleInfo.retailPrice?.amount : null,
        stock: item.stock !== undefined?  item.stock : null,
        rating: item.rate !== undefined? item.rate : null,
        brand: item.brand || 'unknown',
        type: 'book',
        category: normalizeCatogery(item.volumeInfo?.categories),
        tags: item.tags || ['unknown'],
        thumbnail: normalizeThumbnail(item.volumeInfo.imageLinks?.smallThumbnail),
        images: normalizeImages(item.volumeInfo.imageLinks?.thumbnail),
        source : 'FreeAPI-Book-JSON'
    },
    type : 'book',
    extensions : {
      author : item.volumeInfo?.authors || ['unknown'],
      subtitle : item.volumeInfo?.subtitle || 'unknown',
      publisher : item.volumeInfo?.publisher || 'unknown',
      publishedDate : normalizePublishedDate(item.volumeInfo?.publishedDate),
      industryIdentifiers : item.volumeInfo?.industryIdentifiers || ['unknown'],
      pageCount : item.volumeInfo?.pageCount || null,
      language : item.volumeInfo?.language || 'unknown',
      isbn_10: item.volumeInfo?.industryIdentifiers?.find(i => i.type === 'ISBN_10')?.identifier || 'unknown',
      isbn_13: item.volumeInfo?.industryIdentifiers?.find(i => i.type === 'ISBN_13')?.identifier || 'unknown',
    }
  }
}