<template>
  <div class="music-list">
    <!-- 返回 -->
    <div class="back">
      <i class="icon-back"></i>
    </div>
    <!-- 歌曲信息 -->
    <h1 class="music-title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle"></div>
  </div>
</template>
<script>
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
  created () {
    console.log(this.songs)
  },
  computed: {
    bgStyle () {
      return `background-image:url(${this.bgImage})`
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/variable'
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
</style>
