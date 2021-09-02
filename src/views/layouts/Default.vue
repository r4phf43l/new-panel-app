<template>
  <div class="layout-content" :style="{ 'background-color': pageBgColor, 'color': pageFontColor }">
    <div class="columns is-gapless">
      <div class="column is-multiline featured-column">        
        <header class="column">
          <video-player :options="videoOptions"/>
        </header>
        <footer class="column" :style="{ 'background-color': config.footerBgColor, 'color': config.footerFontColor }">
          <h2 class="title" :style="{ 'color': config.sidebarFontColor }">
            {{ 'history.title'|trans }}
          </h2>
          <history :messages="messages" v-if="lastMessage" :fontColor="config.sidebarFontColor"></history>
        </footer>
      </div>
      <div class="column history-column" :style="{ 'background-color': config.sidebarBgColor, 'color': config.sidebarFontColor }">
        <header>          
          <featured :message="lastMessage" v-if="lastMessage" @blink="playAudio" :fontColor="pageFontColor"></featured>
        </header>
        <footer :style="{ 'background-color': config.clockBgColor, 'color': config.clockFontColor }">
          <img :src="logoUrl">
          <clock :locale="config.locale" :dateFormat="'date_format'|trans" :fontColor="config.clockFontColor"></clock>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
  import Clock from '@/components/Clock.vue'
  import Featured from '@/components/Featured.vue'
  import History from '@/components/History.vue'
  import VideoPlayer from '@/components/VideoPlayer.vue'
  
  import 'videojs-youtube/dist/Youtube.min.js'
  import 'video.js/dist/video-js.min.css'

  import audio from '@/services/audio'
  import storage from '@/services/storage'
  import Speech from '@/services/speech.js'

  export default {
    name: 'Default',
    components: {
      Clock,
      Featured,
      History,
      VideoPlayer
    },
    computed: {
      messages () {
        return this.$store.getters.history
      },
      lastMessage () {
        let msgs = this.$store.getters.message
        if (this.config.vocalize && msgs.title) {
          if (!sessionStorage.getItem('painel-web.v2.speech')) {
            this.$swal('NovoSGA', this.$root.$store.state.dict['speech.activate'], 'info').then(() => {
              sessionStorage.setItem('painel-web.v2.speech', true)
            })
          }
          let msg = {
            pattern: this.config.vocalizeText,
            priority: msgs.description,
            ticket: msgs.title,
            local: msgs.subtitle,
            service: msgs.service
          }
          Speech.speechAll(this.config.locale, Speech.composeMessage(msg))
        }
        return msgs
      },
      config () {
        return this.$store.state.config
      },
      logoUrl () {
        return this.config.logo || 'images/logo.png'
      },
      pageBgColor () {
        const peso = this.lastMessage.$data ? this.lastMessage.$data.peso : 1
        return peso > 0 ? this.config.pageBgColorPriority : this.config.pageBgColorNormal
      },
      pageFontColor () {
        const peso = this.lastMessage.$data ? this.lastMessage.$data.peso : 1
        return peso > 0 ? this.config.pageFontColorPriority : this.config.pageFontColorNormal
      }
    },
    methods: {
      playAudio () {
        audio.playAlert(this.config.alert)
      },
      overflowRemoval () {
        document.querySelector('html').style.overflow = 'auto'
      }
    },
    mounted () {
      this.overflowRemoval()
    },
    data () {
      return {
        videoOptions: {
          autoplay: true,
          controls: true,
          loop: true,
          sources: [
            {
              src: storage.get('config').video || '/video/intro.mp4',
              type: storage.get('config').video.includes('youtube') ? 'video/youtube' : 'video/mp4'
            }
          ]
        }
      }
    }
  }
</script>

<style lang="sass">
  .layout-content
    position: fixed
    width: 100%
    height: 100%
    .columns
      height: 100%
  .clock
    padding: 1.5vw
    .time
      span
        font-size: 3vmax
        font-weight: bold
    .date
      text-align: right
      span
        font-size: 2vmax
        font-weight: bold
      span.second
        color: #CCCCCC
  .featured-column
      header
        height: 70vh
        padding: 0 !important
        div
          .video-js
            height: 70vh
            width: 60vw
      footer
        height: 30vh
        padding: 0 !important
        h2
          font-size: 1.5vw
          text-align: center
        .history
          width: 100%
          display: flex
          flex-flow: row
          justify-content: center
          flex-basis: 25%
          overflow: hidden
          .message
            padding: 5px
            text-align: center
            width: 25%
            overflow: hidden
            margin: 2px
            cursor: default
            span
              display: block
            .title
              font-size: 4vw
              font-weight: bold
            .subtitle
              font-size: 2vw
              font-style: italic
  .history-column    
    height: 100vh
    header
      height: 80vh
      padding: 0.5vw 0
      text-align: center             
    footer
      height: 20vh      
      text-align: right
      background: rgba(0,0,0,.1)
      img
        max-height: 20vh
        float: right
        padding: 1vw
        max-width: 20vh
    *
      color: #2c3e50
    .title
      text-align: center
      font-weight: bold
      margin-bottom: 3vh
    .message
      background-color: transparent
      border-left: 8px solid rgba(0,0,0,.3)
      padding-left: 1vh
      margin-bottom: 0.5vh
    .empty
      p
        font-style: italic
        text-align: center
    .featured-message
        text-align: center
        .title
          font-size: 10vw
          font-weight: bold
        .subtitle
          font-size: 4vw
        .description
          font-size: 4vw
</style>
