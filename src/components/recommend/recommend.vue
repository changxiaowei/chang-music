<template>
  <div class="recommend">
    <scroll :data="discList" class="recommend-content">
    <div>
      <div v-if="slider.length" class="slider-wrapper" ref="sliderWrapper">
      <sliders>
        <div v-for="item in slider">
          <a :href="item.linkUrl">
            <img class="needsclick" :src="item.picUrl" alt="">
          </a>
        </div>
      </sliders>
    </div>
    <div class="recommend-list">
      <h1 class="list-title">热门歌曲推荐</h1>
      <ul>
        <li v-for="item in discList" class="item">
          <div class="icon">
            <img width="60" height="60" v-lazy="item.imgurl" alt="">
          </div>
          <div class="text">
            <h2 class="name" v-html="item.creator.name"></h2>
            <p class="desc" v-html="item.dissname"></p>
          </div>
        </li>
      </ul>
    </div>
    </div>
    </scroll>
  </div>
</template>

<script>
import {sliderData, getDiscList} from 'api/recommend'
import {ERR_OK} from 'api/config'
import sliders from 'components/slider/slider'
import Scroll from 'base/scroll/scroll'
export default {
  components: {
    sliders,
    Scroll
  },
  data () {
    return {
      slider: [],
      discList: []
    }
  },
  created () {
    this.initSlider()
    this.intialList()
  },
  methods: {
    initSlider () {
      sliderData().then((res) => {
        if (ERR_OK === res.code) {
          this.slider = res.data.slider
        }
      })
    },
    intialList () {
      getDiscList().then((res) => {
        if (ERR_OK === res.code) {
          this.discList = res.data.list
          // console.log(this.discList)
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
 @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
