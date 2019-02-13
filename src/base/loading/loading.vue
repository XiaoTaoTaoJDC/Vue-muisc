<template>
  <div class="loading" v-show="flg">
    <cube-loading :size="this.size"></cube-loading>
    <p class="desc">{{title}}</p>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '正在加载中...'
    },
    size: {
      type: Number,
      default: 45
    },
    flg: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  .loading
    position: fixed
    top: 0
    left: 0
    z-index: 100
    height: 100%
    width: 100%
    text-align: center
    background: $color-background-dd
    .desc
      margin-top: 5px
      line-height: 20px
      font-size $font-size-small
      color: $color-text-l
</style>
<style lang="stylus">
.cube-loading
  .cube-loading-spinners
    margin: auto
    margin-top:50%
</style>
