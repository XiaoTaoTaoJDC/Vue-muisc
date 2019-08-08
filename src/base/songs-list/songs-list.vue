<template>
  <div class="song-list">
    <ul>
      <li v-for="(item, index) in songs" :key="index" class="item" @click="songSelect(item, index)">
        <div class="content">
          <h1 class="name">{{item.name}}</h1>
          <p class="desc">{{getDesc(item)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: {
    songs: {
      type: Array,
      default: () => []
    }
  },
  created () {},
  methods: {
    getDesc (song) {
      return `${song.singer},${song.album}`
    },
    songSelect (item, index) {
      this.$emit('select', item, index)
    }
  }
}
</script>
<style lang="stylus" scoped>
 @import '~common/stylus/variable'
  .song-list
    .item
      display: flex
      align-items: center
      box-sizing: border-box
      height: 64px
      font-size: $font-size-medium
      .content
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          no-wrap()
          color: $color-text
        .desc
          no-wrap()
          margin-top: 4px
          color: $color-text-d
</style>
