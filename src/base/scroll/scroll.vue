<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    },
    refreshDelay: {
      type: Number,
      default: 20
    },
    listenScroll: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    initialScroll () {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      })
      if (this.listenScroll) {
        let me = this
        this.scroll.on('scroll', (pos) => {
          me.$emit('scroll', pos)
        })
      }
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    disable () {
      this.scroll && this.scroll.disable()
    },
    enable () {
      this.scroll && this.scroll.enable()
    },
    scrollTo () {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement () {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  mounted () {
    setTimeout(() => {
      this.initialScroll()
    }, 20)
    // this.initialScroll()
  },
  watch: {
    data () {
      setTimeout(() => {
        this.scroll.refresh()
      }, this.refreshDelay)
    }
  }
}
</script>

<style>

</style>
