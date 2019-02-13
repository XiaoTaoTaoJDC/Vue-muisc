<template>
  <div class="singer-content">
    <singer-list v-if="singerList.length">
      <cube-index-list :data="singerList">
          <cube-index-list-group
            v-for="(group, index) in singerList"
            :key="index"
            :group="group">
            <cube-index-list-item
              v-for="(item, index) in group.items"
              :key="index"
              :item="item"
              >
              <div class="custom-item">
                <div class="singer-icon">
                  <img :src="item.avatar" height="50" width="50">
                </div>
                <div class="singer-name">
                  {{item.name}}
                </div>
              </div>
            </cube-index-list-item>
          </cube-index-list-group>
      </cube-index-list>
    </singer-list>
    <loading :flg="flg"></loading>
  </div>
</template>
<script>
import { getSingerList, ERR_OK } from 'api/singer.js'
import Singer from 'common/js/singers.js'
import SingerList from 'base/singerList/singerList.vue'
import Loading from 'base/loading/loading'
const HOT_NAME = '热门'
const HOT_SINGER_LENGTH = 10
export default {
  data () {
    return {
      singerList: [],
      flg: false
    }
  },
  components: {
    SingerList,
    Loading
  },
  methods: {
    _getSingerList () {
      this.flg = true
      getSingerList().then((res) => {
        if (ERR_OK === res.data.code) {
          this.flg = false
          // console.log(res.data.data.list)
          this._initSingerList(res.data.data.list)
        }
      })
    },
    _initSingerList (list) {
      let map = {
        name: HOT_NAME,
        items: []
      }
      let hot = []
      let map2 = {}
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LENGTH) {
          map.items.push(new Singer({
            name: item.Fsinger_name,
            value: item.Fsinger_mid
          }))
        }
        let k = item.Findex
        if (!map2[k]) {
          map2[k] = {
            name: k,
            items: []
          }
        }
        map2[k].items.push(new Singer({
          name: item.Fsinger_name,
          value: item.Fsinger_mid
        }))
      })
      hot.push(map)
      // 数据处理后需要排序
      let ret = []
      for (var i in map2) {
        let val = map2[i]
        ret.push(val)
      }
      ret.sort((a, b) => {
        return a.name.charCodeAt(0) - b.name.charCodeAt(0)
      })
      this.singerList = hot.concat(ret)
      console.log(this.singerList)
    }
  },
  created () {
    this._getSingerList()
  }
}
</script>
<style lang="stylus" scoped>
  .singer-content
    position: fixed
    top 88px
    bottom: 0
    width: 100%
</style>
<style lang="stylus">
@import '~common/stylus/variable'
// 自定义项的样式
.custom-item
  position: relative
  height: 70px
  line-height: 70px
  padding: 0 16px
  display: flex
  align-items: center
  .singer-name
    font-size: $font-size-medium
    margin-left: 10px
  .singer-icon
    height: 50px
    width: 50px
    border-radius: 50%
    overflow: hidden
// 用自定义样式，覆写内置的默认样式
.cube-index-list-content
  background-color: #222
  color: $color-text-l
.cube-index-list-anchor
  background-color: #333
  height: 30px
  line-height: 30px
  padding: 0 0 0 20px
.cube-index-list-nav
  right: 0
  padding: 20px 0
  border-radius: 10px
  background: rgba(0,0,0,.3)
  >ul
    >li
      padding: 3px
      font-size: 12px
      color: $color-text-l
      &.active
        color: #ffcd32
.cube-index-list-item-def
  color: $color-text-l
</style>
