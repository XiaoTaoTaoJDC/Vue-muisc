export default class Song {
  constructor ({id, mid, singer, name, album, duration, img, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.img = img
    this.url = url
  }
}
export function createSong (musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSonger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    img: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://111.202.85.150/amobile.music.tc.qq.com/C400${musicData.songmid}.m4a?guid=263427534&vkey=3738151029242D531256BDDF99A760E3482966D989879B90B883D685B5B399DB13D657704F907DD1557F3B6A9DFA8EF1C30E1FA8DD0A26D3&fromtag=66`
  })
}
function filterSonger (singer) {
  let ret = []
  if (!singer) return ''
  singer.forEach((item, index) => {
    ret.push(item.name)
  })
  return ret.join('/')
}
