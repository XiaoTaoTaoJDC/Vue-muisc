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
export function getSingerDetail (singerId) {
  const url = '/getSingerDetail'
  const data = Object.assign({}, {
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    singermid: singerId,
    order: 'listen',
    begin: 0,
    num: 30,
    songstatus: 1
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res)
  })
}
export function getSongerVkey (songmid) {
  const url = '/getSingerVkey'
  const data = Object.assign({}, {
    loginUin: 3051522991,
    format: 'json',
    platform: 'yqq',
    needNewCode: 0,
    cid: 205361747,
    uin: 3051522991,
    guid: 5931742855,
    songmid: songmid,
    filename: `C400${songmid}.m4a`
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res)
  })
}
export const ERR_OK = 0
