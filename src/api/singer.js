import axios from 'axios'
import { commonParams } from './config'
export function getSingerList () {
  const _url = '/getSingerList'
  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    page: 'list',
    channel: 'singer',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    loginUin: 0,
    needNewCode: 0,
    format: 'json'
  })
  return axios.get(_url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res)
  })
}
export const ERR_OK = 0
