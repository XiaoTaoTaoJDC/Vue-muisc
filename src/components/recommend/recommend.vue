<template>
  <div class="recommend">
    <scroll class="recommend-content" :data="data">
      <div>
        <slider v-if="recommends.length">
          <cube-slide :options="options">
            <cube-slide-item
              v-for="(item, index) in recommends"
              :key="index"
            >
              <a :href="item.linkUrl">
                <img :src="item.picUrl">
              </a>
            </cube-slide-item>
          </cube-slide>
        </slider>
        <!-- <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
        </div> -->
        <!-- 电台 -->
        <div class="recommend_twocol_list">
            <h1 class="list-title">电台</h1>
            <ul class="list-content">
              <li v-for="(item, index) in radio" :key="index" class="list-item">
                <img v-lazy="item.picUrl">
                <div class="list-content-title">
                    {{item.Ftitle}}
                </div>
                <span class="recommend-player icon-play-mini"></span>
              </li>
            </ul>
        </div>
        <!-- 热门歌单 -->
        <div class="recommend-songs-list" v-if="songList.length">
          <h1 class="list-title">热门歌单</h1>
          <ul class="list-content">
            <li class="list-item" v-for="(item, index) in songList" :key="index">
              <div class="list-image">
                <img v-lazy="item.picUrl">
                <span class="list-count">
                  <i class="list-rj"></i>
                  <span>{{item.accessnum/10000}}万</span>
                </span>
                <span class="recommend-player icon-play-mini"></span>
              </div>
              <div class="list-desc">
                {{item.songListDesc}}
              </div>
              <div class="list-title-x">
                {{item.songListAuthor}}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
    <loading :flg="loadingFlg"></loading>
  </div>
</template>
<script>
import { getRecommend, ERR_OK } from 'api/recommend.js'
import Slider from 'base/slider/slider.vue'
import Scroll from 'base/scroll/scroll.vue'
import Loading from 'base/loading/loading'
export default {
  data () {
    return {
      recommends: [],
      radio: [],
      songList: [],
      data: [],
      loadingFlg: false,
      options: {
        interval: 5000
      }
    }
  },
  created () {
    this._getRecommend()
  },
  components: {
    Slider,
    Scroll,
    Loading
  },
  methods: {
    _getRecommend () {
      this.loadingFlg = true
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.loadingFlg = false
          this.recommends = res.data.slider
          this.radio = res.data.radioList
          this.songList = res.data.songList
          this.data.push(res.data.radioList)
          this.data.push(res.data.songList)
        }
        console.log(res)
      })
    }
  }
}
</script>
<style>
  .recommend .cube-slide-dots{
    bottom: 5px
  }
  .recommend .cube-slide-dots span{
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin: 0 2px;
  }
  .recommend .cube-slide-dots span.active{
    transition:ease .5s cubic-bezier(0.075, 0.82, 0.165, 1);
    width: 15px;
    border-radius: 8px;
    background: #fff
  }
</style>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
  .slider-group
    height: 150px
    img
      width: 100%
  .recommend-list
    .list-title
      height: 65px
      line-height: 65px
      text-align: center
      font-size: $font-size-medium
      color: $color-theme
  .recommend_twocol_list
    margin-top: 20px
    padding: 0 10px 0 10px
    margin-bottom: 7px
    .list-title
      font-size: $font-size-medium-x
      color: $color-theme
      margin-bottom: 10px
    .list-content
      overflow: hidden
      display: flex
      justify-content: space-between
      .list-item
        width: 49%
        position: relative
        img
          width: 100%
        .list-content-title
          height: 36px
          line-height: 18px
          font-size: $font-size-medium
          white-space: normal
          word-warp: break-word
        .recommend-player
          display: block
          height: 16px
          width: 16px
          position: absolute
          right: 10px
          bottom: 45px
  .recommend-songs-list
    padding: 0 10px 10px 10px
    .list-title
      color: $color-theme
      font-size: $font-size-medium-x
      margin-bottom: 10px
    .list-content
      display: flex
      justify-content: space-between
      flex-wrap: wrap
      .list-item
        width: 49%
        .list-image
          position: relative
          img
            width: 100%
          .list-count
            position: absolute
            left: 5px
            bottom: 7px
            font-size: $font-size-small
          .recommend-player
            display: block
            height: 24px
            width: 24px
            position: absolute
            right: 5px
            bottom 5px
            extend-click()
          .list-rj
            display: inline-block
            height: 10px
            width: 10px
            background-image: url($background-url-rj)
            background-repeat: no-repeat
        .list-desc
          font-size: $font-size-medium
          no-wrap()
          margin-top: 5px
        .list-title-x
          font-size: $font-size-small
          margin-top: 5px
          margin-bottom: 5px
.recommend
  position: fixed
  width: 100%
  top: 88px
  bottom: 0
  .recommend-content
    height: 100%
    width: 100%
    overflow: hidden
</style>
