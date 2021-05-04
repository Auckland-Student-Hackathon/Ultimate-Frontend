import axios from 'axios'
import firebase from 'firebase/app'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

instance.interceptors.request.use(
  async (config) => {
    if (firebase.auth().currentUser != null) {
      const idTokenfinal = await firebase.auth().currentUser.getIdToken()
      // eslint-disable-next-line no-param-reassign
      config.headers['id-token'] = idTokenfinal
    }
    return Promise.resolve(config)
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default instance
