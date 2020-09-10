import axios from './instance'
const query = (code = []) => {
  code = code.join(',')
  return axios.get('/fund', { params: { code } })
}

export {
  query
}
