<template>
  <div class="home">
    <div class="menu">
      <router-link to="/settings">
        <span class="icon">
          <i class="fa fa-cog"></i>
        </span>
        {{ 'menu.settings'|trans }}
      </router-link>
      <a @click="toogleFS('body')">
        <span class="icon">
          <i class="fa fa-arrows-alt"></i>
        </span>
        FullScreen
      </a>
    </div>
    <layout-loader></layout-loader>
  </div>
</template>

<script>
  import LayoutLoader from '@/components/LayoutLoader.vue'
  import fullscreen from '@/util/fullscreen'

  export default {
    name: 'Home',
    components: {
      LayoutLoader
    },
    methods: {
      toogleFS (element) {
        element = document.querySelector(element)
        if (fullscreen.isFullScreen()) {
          fullscreen.exitFullScreen()
        } else {
          fullscreen.requestFullScreen(element)
        }
      }
    }
  }
</script>

<style lang="sass">
  @import '@/assets/css/app.scss'
  .home
    .menu
      position: fixed
      top: 2vh
      left: 2vw
      background-color: rgba(0,0,0,.5)
      padding: 10px
      border-radius: 8px
      opacity: 0
      z-index: 100  
      &:hover
        opacity: 1
        transition: opacity 0.2s ease-in-out
        background-color: rgba(0,0,0,1)
      a
        color: #ffffff
</style>
