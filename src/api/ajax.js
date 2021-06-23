import axios from 'axios'

function ajax (url, data = {}, type = 'get') {
  /*  eslint-disable no-new */
  return new Promise((resolve, reject) => {
    let promise
    if (type === 'get') {
      let str = ''
      for (let key in data) {
        str += key + '=' + data[key] + '&'
      }
      if (str !== '') {
        str = str.substring(0, str.length - 1)
        url = url + '?' + str
      }
      promise = axios.get(url)
    } else {
      promise = axios.post(url, data)
    }
    promise.then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export default ajax
