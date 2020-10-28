import axios from 'axios'
import { getBaseUrl } from './'

export default axios.create({
  baseURL: getBaseUrl(),
  responseType: 'json',
})
