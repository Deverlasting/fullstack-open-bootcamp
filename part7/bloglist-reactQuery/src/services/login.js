import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

// const login = async (username, password) => {
//     const response = await axios.post(baseUrl, { username, password })
//     return response.data
// }

export default { login }