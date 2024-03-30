import axios from "axios"

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/"


const getAll = () => {
    // return axios.get(`${baseUrl}all`)
    return axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
}

const getCountry = () => {
    // return axios.get(`${baseUrl}all`)
    return axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/finland`)
}



export default {
    getAll: getAll,
    getCountry: getCountry

}