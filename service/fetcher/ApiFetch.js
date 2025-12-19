export async function ApiFetch({url, src}) {
    try {
        const result = await fetch(url)
        if(!result.ok) {
            throw new Error(
                `Api Fetch Failed - ${src}`
            )
        }
        const data = await result.json()
        return data
    } catch (error) {
        error.source = src
        throw error
    }
}
