import jsonp from 'common/js/jsonp'
import {CommonOption, parama} from './config'
import axios from 'axios'

export function sliderData () {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  var data = Object.assign({}, CommonOption, {
    platform: 'h5',
    uin: '0',
    needNewCode: 1
  })
  return jsonp(url, data, parama)
}

export function getDiscList () {
  const url = '/api/getDiscList'
  const data = Object.assign({}, CommonOption, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

