export default class Singer {
  constructor ({name, value}) {
    this.value = value
    this.name = name
    this.avatar = `https://y.gtimg.cn/music/photo_new/T001R150x150M000${value}.jpg?max_age=2592000`
  }
}
