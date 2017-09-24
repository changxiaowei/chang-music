<template>
  <div class="singer">
    <list-view @select="selectSinger" :data="SingerList"></list-view>
    <router-view></router-view>

  </div>
</template>

<script>
import {getSingerList} from 'api/singer'
import {ERR_OK} from 'api/config'
import Singer from 'common/js/singer'
import listView from 'base/listview/listview'
import {mapMutations} from 'vuex'
const HOT_SINGER = '热门歌手'
const HOT_LINE = 10
export default {
  components: {
    listView
  },
  data () {
    return {
      SingerList: []
    }
  },
  mounted () {
    this._getSingerList()
    // console.log(this._normalizeData(this.SingerList))
  },
  methods: {
    selectSinger (singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    _getSingerList () {
      getSingerList().then((res) => {
        if (ERR_OK === res.code) {
          this.SingerList = this._normalizeData(res.data.list)
          // console.log(this.SingerList)
        }
      })
    },
    _normalizeData (data) {
      let res = {
        hot: {
          title: HOT_SINGER,
          its: []
        }
      }
      data.forEach((item, index) => {
        if (index < HOT_LINE) {
          res.hot.its.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        }
        var key = item.Findex
        if (!res[key]) {
          res[key] = {
            title: key,
            its: []
          }
        }
        res[key].its.push(new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        }))
      })
      let hot = []
      let ret = []
      for (var i in res) {
        var val = res[i]
        if (val.title === HOT_SINGER) {
          hot.push(val)
        } else if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 86px
    bottom: 0
    width: 100%
</style>

