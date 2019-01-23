import axios from 'axios'
import { toast } from 'react-toastify'
import logger from '../logger'

// Api modules
// import UserApi from './User'
import ChatApi from './Chat'

// Todo:: move to config file
const BASE_URL = 'https://keeper-ops.herokuapp.com/'

const axiosInstance = axios.create({
    baseURL: BASE_URL
})

axiosInstance.interceptors.response.use(undefined, function(error) {

    if (!error.response) {
        logger.error(error)
        return Promise.reject(error)
    }

    if (error.response.status >= 500) {
        logger.error(error)
        toast.error(`[${error.response.status}] ${error.response.statusText}`)
        return Promise.reject(error)
    }

    if (error.response.status === 401) {
        // Todo:: localization
        toast.error('Not authenticated or session expired. Please login/register before making this request')
        return Promise.reject(error)
    }

    // Todo:: specific error handling
    let message = `[${error.response.status}] An error occurred`
    toast.error(message)

    return Promise.reject(error)
})

axiosInstance.interceptors.request.use(function(config) {
    return config
})

class HttpClient {
    constructor(client) {
        this.client = client
        this.initHttpVerbsWrapper()
    }

    initHttpVerbsWrapper = () => {
        const verbs = ['get', 'post', 'put', 'patch', 'delete']
        verbs.forEach((verb) => {
            this[verb] = (...params) => {
                // Todo:: global loading feedback implementation
                // let loaderCompleteCallback = startLoader()

                return new Promise((resolve, reject) => {
                    this.client[verb](...params)
                        .then(resolve)
                        .catch(reject)
                        // .then(loaderCompleteCallback)
                })
            }
        })
    }

    // Todo:: Authentication
    // setAccessToken = (accessToken = null) => {
    //     this.client.defaults.headers.common['Authorization'] = accessToken
    //         ? `Bearer ${accessToken}`
    //         : ''
    // }
}

let httpClient = new HttpClient(axiosInstance)

export default {
    httpClient,
    // user: new UserApi(httpClient),
    chat: new ChatApi(httpClient)
}