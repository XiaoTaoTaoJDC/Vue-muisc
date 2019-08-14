<template>
  <div class="singer-detail">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getSingerDetail, ERR_OK } from 'api/singer'
import { createSong } from 'common/js/song'
import MusicList from 'components/music-list/music-list'
export default {
  data () {
    return {
      songs: []
    }
  },
  computed: {
    ...mapGetters([
      'singer'
    ]),
    title () {
      return this.singer.name
    },
    bgImage () {
      return this.singer.avatar
    }
  },
  components: {
    MusicList
  },
  created () {
    this._getSingerDetail()
  },
  methods: {
    _getSingerDetail () {
      if (!this.singer.value) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.value).then((res) => {
        if (res.data.code === ERR_OK) {
          this.songs = this._nomalizeSong(res.data.data.list)
          // console.log(this.songs)
        }
      })
    },
    _nomalizeSong (list) {
      let ret = []
      list.forEach((item) => {
        let {musicData} = item
        if (musicData.songid && musicData.albumid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  // .singer-detail
  //   position: fixed
  //   z-index: 100
  //   top: 0
  //   left: 0
  //   right: 0
  //   bottom: 0
  //   background: $color-background
</style>
