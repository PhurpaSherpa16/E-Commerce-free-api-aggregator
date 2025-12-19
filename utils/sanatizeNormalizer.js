let deaultImage = 'https://img.freepik.com/premium-vector/image-gallery-icon-picture-icon-vector-isolated-white-background-picture-vector-icon_1256048-6756.jpg'

export function normalizePublishedDate(value){
    if(!value) return null

    // only 2016
    if (/^\d{4}$/.test(value)) {
        return `${value}-01-01`
    }

    // 2016-01
    if(/^\d{4}-\d{2}$/.test(value)){
        return `${value}-01`
    }

    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return value
    }

    return null
}

export function normalizeImages(value){

    // if array
    if(Array.isArray(value)){
        const result = value.filter(Boolean)
        return result.length > 0 ? result : [deaultImage]
    }
    // if string
    if(typeof value === 'string'){
        return value ? [value] : [deaultImage]
    }
    // if null / undefined / anything else
    return [deaultImage]
}

export function normalizeCatogery(value){
    if(Array.isArray(value)) return value[0] ?? 'unknown'
    return value ?? 'unknown'
}

export function normalizeThumbnail(value){
    return typeof value === 'string' && value.length ? value : deaultImage
}