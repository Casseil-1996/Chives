import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.doctorxiong.club/v1',
})
instance.interceptors.response.use(res => res.data)
export default instance 
