<template>
  <scroll 
  @scroll="scroll"
  :probe-type="probeType"
  :listen-scroll="listenScroll" 
  :data="data" class="listview" 
  ref="listview">
    <ul>
      <li v-for="group in data" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li @click="select(item)" class="list-group-item" v-for="item in group.its">
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div @touchstart.stop.prevent="onShortcutTouchStart"
    @touchmove.stop.prevent ="onShortcutTouchMove"

     class="list-shortcut">
      <ul>
        <li :data-index="index" :class="{current : currentIndex === index}"
         v-for="(shortitem,index) in shortList" class="item">{{shortitem}}</li>
      </ul>
    </div>
    <div class="list-fixed" ref="fixed" v-show="fixedTitle">
      <div class="fixed-title">{{fixedTitle}}</div>
    </div>  
    <div v-show="!data.length">
      <loading></loading>
    </div>

  </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import {getData} from 'common/js/dom'
import loading from 'base/loading/loading'
const ANXHOE_HEIGHT = 18
const TITLE_HEIGHT = 30
export default {
  data () {
    return {
      currentIndex: 0,
      scrollY: -1,
      diff: -1
    }
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  components: {
    Scroll,
    loading
  },
  created () {
    this.probeType = 3
    this.listenScroll = true
    this.touch = {}
    this.listHeight = []
  },
  computed: {
    shortList () {
      return this.data.map((item) => {
        return item.title.substr(0, 1)
      })
    },
    fixedTitle () {
      if (this.scrollY > 0) {
        return ''
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  methods: {
    select (item) {
      this.$emit('select', item)
    },
    scroll (pos) {
      this.scrollY = pos.y
    },
    _calculateHeight () {
      this.listHeight = []
      let list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        height += list[i].clientHeight
        this.listHeight.push(height)
      }
    },
    _scrollTo (index) {
      let listH = this.listHeight
      if (index < 0) {
        index = 0
      } else if (index > listH.length - 2) {
        index = listH.length - 2
      }
      this.scrollY = -listH[index]
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
    },
    onShortcutTouchStart (e) {
      let anchorIndex = getData(e.target, 'index')
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },
    onShortcutTouchMove (e) {
      let endTouch = e.touches[0]
      this.touch.y2 = endTouch.pageY
      let delta = (this.touch.y2 - this.touch.y1) / ANXHOE_HEIGHT | 0
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta
      this._scrollTo(anchorIndex)
    }
  },
  watch: {
    data () {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    scrollY (newY) {
      let listH = this.listHeight
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      for (let i = 0; i < listH.length; i++) {
        let height1 = listH[i]
        let height2 = listH[i + 1]
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          this.diff = height2 + newY
          return
        }
      }
      this.currentIndex = listH.length - 2
    },
    diff (newVal) {
      let fixTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
      this.$refs.fixed.style.transform = `translate3d(0,${fixTop}px,0)`
    }
  }
}
</script>






<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
