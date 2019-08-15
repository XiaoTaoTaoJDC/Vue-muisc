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
    url: `http://ws.stream.qqmusic.qq.com/C100${musicData.songmid}.m4a?fromtag=0&guid=263427534`
    // url: `http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C400${musicData.songmid}.m4a?guid=263427534&vkey=&fromtag=66`
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
