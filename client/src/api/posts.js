import service from './config'

export const createPost = postData => {
    return service.post('/api/posts', postData)
        .then(result => {
            return result.data
        })
        .catch(error => {
            return error
        })

}

export const getPosts = (lat, lng, max) => {
    return service.get(`/api/posts/search?lat=${lat}&lon=${lng}&maxDist=${max || 2000000}`)
        .then(result => {
            return result.data
        })
        .catch(error => {
            return error
        })
}