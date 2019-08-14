<template>
  <div class="music-list">
    <!-- 返回 -->
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <!-- 歌曲信息 -->
    <h1 class="music-title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="play-wrapper">
        <div class="play" v-show="songs.length>0" ref="playBtn">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter"></div>
    </div>
    <!-- 滑动辅助层，遮住背景图片 -->
    <div class="bg-layer" ref="layer"></div>
    <scroll
      :data="songs"
      @scroll="scroll"
      :probe-type="probeType"
      :listen-scroll="listenScroll"
      class="list"
      ref="list"
    >
      <div class="song-list-wrapper">
        <song-list :songs="songs" @select="songSelect"></song-list>
      </div>
    </scroll>
    <loading :flg="!songs.length>0"></loading>
  </div>
</template>
<script>
import Scroll from 'base/scroll/scroll'
import SongList from 'base/songs-list/songs-list'
import Loading from 'base/loading/loading'
import { mapActions } from 'vuex'
const RES_HEIGHT = 40
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    bgImage: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default: () => []
    },
    rank: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      scrollY: 0
    }
  },
  components: {
    Scroll,
    SongList,
    Loading
  },
  created () {
    this.probeType = 3
    this.listenScroll = true
  },
  mounted () {
    // 计算背景图的高度,计算scroll的偏移量
    this.imageHeight = this.$refs['bgImage'].clientHeight
    this.minTtanslateY = -this.imageHeight + RES_HEIGHT
    this.$refs['list'].$el.style.top = `${this.imageHeight}px`
  },
  computed: {
    bgStyle () {
      return `background-image:url(${this.bgImage})`
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    scroll (pos) {
      this.scrollY = pos.y
    },
    songSelect (item, index) {
      this.selectPlay({
        list: this.songs,
        index: index
      })
    },
    ...mapActions([
      'selectPlay'
    ])
  },
  watch: {
    scrollY (newVal) {
      let translateY = Math.max(this.minTtanslateY, newVal)
      let zIndex = 0
      let scale = 1
      // 细线下拉图片无缝贴合放大效果
      const percent = Math.abs(newVal / this.imageHeight)
      if (newVal > 0) {
        scale = 1 + percent
        zIndex = 10
      }
      this.$refs.layer.style['transform'] = `translate3d(0,${translateY}px,0)`
      // 实现图片overflow hidden 效果
      if (newVal < this.minTtanslateY) {
        zIndex = 10
        this.$refs['bgImage'].style.paddingTop = 0
        this.$refs['bgImage'].style.height = `${RES_HEIGHT}px`
        this.$refs['playBtn'].style.display = 'none'
      } else {
        this.$refs['bgImage'].style.paddingTop = '70%'
        this.$refs['bgImage'].style.height = 0
        this.$refs.playBtn.style.display = ''
      }
      this.$refs['bgImage'].style.zIndex = zIndex
      this.$refs['bgImage'].style['transform'] = `scale(${scale})`
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  @import "~common/stylus/mixin"
  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: $color-background
    .back
      position: absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .music-title
      position: absolute
      top: 0
      left: 10%
      width: 80%
      z-index: 40
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        height: 100%
        width: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
</style>
