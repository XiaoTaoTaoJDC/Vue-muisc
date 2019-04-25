<template>
  <div class="singer-detail">我是详情</div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getSingerDetail, ERR_OK } from 'api/singer'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapGetters([
      'singer'
    ])
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
          console.log(res.data.data.list)
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  .singer-detail
    position: fixed
    z-index: 100
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: $color-background
</style>
