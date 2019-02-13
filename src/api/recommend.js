import axios from 'axios'
export function getRecommend () {
  const url = '/getRecommend'
  const data = Object.assign({}, {
    g_tk: 1631872066,
    uin: 1124823423,
    format: 'json',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    _: 1544796850880
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
export const ERR_OK = 0
