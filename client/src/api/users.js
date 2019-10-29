import service from './config'

export const isLoggedIn = () => {
    return localStorage.getItem('user') != null
}

export const getLocalStorageUser = () => {
    return JSON.parse(localStorage.getItem('user'))
}

export const logout = () => {
    localStorage.removeItem('user')
    return service.get('/api/logout')
}

export const updateUserLocation = (pos) => {
    return service.patch('/api/users/me', {
            location: {
                coordinates: [pos.lng, pos.lat]
            }
        })
        .then(result => {
            return result.data
        })
        .catch(error => {
            return error
        })
}

export const loginUser = (username, password) => {
    return service.post('/api/login', { username, password })
        .then(result => {
            localStorage.setItem('user', JSON.stringify(result.data))
            return result.data
        })
        .catch(error => {
            return error
        })
}

export const signupUser = (userData) => {
    return service.post('/api/signup', userData)
        .then(result => {
            localStorage.setItem('user', JSON.stringify(result.data))
            return result.data
        })
        .catch(error => {
            return error
        })
}

export const getCurrentUser = () => {
    return service.get('/api/users/me?populate=chats')
        .then(result => {
            if (result.error) throw new Error('User not found.')
            return result.data
        })
        .catch(error => {
            return error
        })
}