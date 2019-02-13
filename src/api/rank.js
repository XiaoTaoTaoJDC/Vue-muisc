import axios from 'axios'
import { commonParams } from './config'
export function getRank () {
  const _url = '/getRank'
  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    uin: 0,
    format: 'json',
    platform: 'h5',
    needNewCode: 1,
    _: 1513161782839
  })
  return axios.get(_url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res)
  })
}
export const ERR_OK = 0
