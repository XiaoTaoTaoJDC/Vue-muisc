<template>
  <div class="player" v-show="playList.length > 0">
    我是播放组件
    <div class="normal-player" v-show="fullScreen"></div>
    <div class="mini-player" v-show="!fullScreen"></div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['fullScreen', 'playList', 'currentIndex'])
  }
}
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .player
    .normal-player
      position: fixed
      top: 0
      left: 0
      right: 0
      bottom: 0
      z-index: 150
      background: $color-background
</style>
