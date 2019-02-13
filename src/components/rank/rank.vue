<template>
    <div class="rank-content">
      <scroll :data="rankList" class="rank-scroll">
        <div>
          <div class="rank-list">
            <ul>
              <li class="rank-item" v-for="(item, index) in rankList" :key="index">
                <div class="rank-item-img">
                  <img v-lazy="item.picUrl" height="100" width="100">
                </div>
                <div class="rank-child-content">
                  <ul>
                    <li class="rank-child-list" v-for="(itemc, ide) in item.songList" :key="ide">
                      <span>{{itemc.songname}}</span>- <span>{{itemc.singername}}</span>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
         </div>
        </div>
      </scroll>
        <loading :flg="flg"></loading>
    </div>
</template>
<script>
import { getRank, ERR_OK } from 'api/rank.js'
import Loading from 'base/loading/loading.vue'
import Scroll from 'base/scroll/scroll'
export default {
  data () {
    return {
      flg: false,
      rankList: []
    }
  },
  created () {
    this._getRanks()
  },
  methods: {
    _getRanks () {
      this.flg = true
      getRank().then((res) => {
        if (res.data.code === ERR_OK) {
          this.flg = false
          console.log(res.data.data)
          this.rankList = res.data.data.topList
        }
      })
    }
  },
  components: {
    Loading,
    Scroll
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.rank-content
  position: fixed
  top: 88px
  bottom: 0
  width: 100%
  .rank-scroll
    height: 100%
    width: 100%
    overflow hidden
  .rank-list
   padding: 5px
   .rank-item
     height: 100px
     padding: 3px 0
     display: flex
     background: $color-background-highlight
     border-bottom: $border-1px
     .rank-item-img
        margin-left: 5px
        width: 100px
        border-radius: 3px
        overflow: hidden
        img
          width: 100%
     .rank-child-content
        margin-left: 15px
        width: 60%
        ul
          height: 100px
          display: flex
          flex-direction: column
          justify-content: center
          overflow: hidden
          .rank-child-list
            line-height: 30px
            font-size: $font-size-small
            no-wrap()
            color: color-text
</style>
