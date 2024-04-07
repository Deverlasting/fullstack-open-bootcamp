import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'


// const getAll = () => {
//     return axios.get(baseUrl)
// }

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

// const create = newObject => {
//     return axios.post(baseUrl, newObject)
// }

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

// const update = (id, newObject) => {
//     return axios.put(`${baseUrl}/${id}`, newObject)
// }

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

// const update = (id, newObject) => {
//     return axios.put(`${baseUrl}/${id}`, newObject)
//         .then(response => {
//             return response.data;
//         })
//         .catch(error => {
//             throw error; //se lanza el error para que se pueda capturar más adelante
//         });
// }

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default {
    getAll: getAll,
    create: create,
    update: update,
    deletePerson: deletePerson
}