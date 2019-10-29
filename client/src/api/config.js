import axios from 'axios'
console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
const base = process.env.NODE_ENV === 'production' ? '' : `http://${window.location.hostname}:7000`

function getService() {
    const baseURL = base
    console.log(`Creating service with endpoint: ${baseURL}`)
    return axios.create({
        baseURL,
        withCredentials: true,
    })
}

export default getService()