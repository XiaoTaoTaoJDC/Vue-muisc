<template>
  <div id="app" @touchmove.prevent>
    <m-header></m-header>
    <tab></tab>
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header.vue'
import Tab from 'components/tab/tab.vue'
export default {
  data () {
    return {
      transitionName: 'slide-left'
    }
  },
  components: {
    MHeader,
    Tab
  },
  watch: {
    '$route' (to, from) {
      if (to.path === '/') {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
    }
  }
}
</script>
<style scoped>
/* 路由添加切换动画 */
.child-view {
  transition: all .5s cubic-bezier(.55,0,.1,1)
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  transform: translate(100, 0)
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  transform: translate(-100%, 0)
  }
</style>
