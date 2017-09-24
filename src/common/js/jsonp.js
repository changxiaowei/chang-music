import originJsonp from 'jsonp'

export default function jsonp (url, option, param) {
  url += (url.indexOf('?') === -1 ? '?' : '') + detailOption(option)
  return new Promise((resolve, reject) => {
    originJsonp(url, param, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}
function detailOption (option) {
  var url = ''
  for (var k in option) {
    let value = option[k] !== undefined ? option[k] : ''
    url += '&' + k + '=' + value
  }
  return url ? url.substr(1) : ''
}
