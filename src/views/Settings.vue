<template>
  <div class="container">
    <div class="columns">
      <div class="column is-2-desktop is-3-tablet is-3-mobile column-menu">
        <aside class="menu">
          <img src="/images/logo.png">
          <p>by <b>RAFA</b>ANTONIO</p>
          <hr>
          <router-link to="/">
            <span class="icon">
              <i class="fa fa-chevron-left"></i>
            </span>
            {{ 'menu.go_back'|trans }}
          </router-link>

          <p class="menu-label">
            {{ 'menu.general'|trans }}
          </p>

          <ul class="menu-list">
            <li>
              <a @click="showTab('interface')" :class="{'is-active': tab==='interface'}">
                {{ 'menu.interface'|trans }}
              </a>
            </li>
            <li>
              <a @click="showTab('server')" :class="{'is-active': tab==='server'}">
                {{ 'menu.server'|trans }}
              </a>
            </li>
            <li>
              <a @click="showTab('services')" v-if="unities.length" :class="{'is-active': tab==='services'}">
                {{ 'menu.services'|trans }}
              </a>
            </li>
            <li>
              <a @click="showTab('sound')" :class="{'is-active': tab==='sound'}">
                {{ 'menu.sound'|trans }}
              </a>
            </li>
            <li>
              <a @click="showTab('bkp_json')" :class="{'is-active': tab==='bkp_json'}">
                {{ 'menu.bkp_json'|trans }}
              </a>
            </li>            
          </ul>
        </aside>        
      </div>
      <div class="column">
        <div class="heading">
          <h1 class="title">
            {{ 'settings.title'|trans }}
          </h1>
          <h2 class="subtitle">
            {{ 'settings.subtitle'|trans }}
          </h2>
        </div>

        <hr>

        <form @submit.prevent="save" v-if="tab==='interface'">
          <div class="columns">
            <div class="column is-4">
              <div class="field">
                <label class="label">
                  {{ 'settings.label.locale'|trans }}
                </label>
                <div class="control is-expanded has-icons-left">
                  <span class="select is-fullwidth">
                    <select v-model="config.locale">
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="pt_BR">Português (Brasil)</option>
                    </select>
                  </span>
                  <span class="icon is-left">
                    <i class="fa fa-globe"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label">
                  {{ 'settings.label.logo'|trans }}
                </label>
                <div class="control">
                  <input class="input is-medium" type="url" placeholder="https://" v-model="config.logo">
                </div>
              </div>
              <div class="field">
                <label class="label">
                  {{ 'settings.label.video'|trans }}
                </label>
                <div class="control">
                  <input class="input is-medium" type="url" placeholder="https://" v-model="config.video">
                </div>
              </div>
            </div>
          </div>

          <h3 class="title">{{ 'settings.interface.colors'| trans }}</h3>

          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label">
                  {{ 'settings.label.page_bg_color_normal'|trans }}
                </label>
                <div class="control">
                  <input class="input is-medium" type="text" placeholder="#000000" v-model="config.pageBgColorNormal">
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label">
                  {{ 'settings.label.page_font_color_normal'|trans }}
                </label>
                <div class="control">
                  <input class="input is-medium" type="text" placeholder="#000000" v-model="config.pageFontColorNormal">
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label">
                  {{ 'settings.label.page_bg_color_priority'|trans }}
                </label>
                <div class="control">
                  <input class="input is-medium" type="text" placeholder="#000000" v-model="config.pageBgColorPriority">
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label">
                  {{ 'settings.label.page_font_color_priority'|trans }}
                </label>
                <div class="control">
                  <input class="input is-medium" type="text" placeholder="#000000" v-model="config.pageFontColorPriority">
                </div>
              </div>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label">
                  {{ 'settings.label.sidebar_bg_color'|trans }}
                </label>
                <div class="control">
                  <input class="input is-medium" type="text" placeholder="#000000" v-model="config.sidebarBgColor">
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label">
                  {{ 'settings.label.sidebar_font_color'|trans }}
                </label>
                <div class="control">
                  <input class="input is-medium" type="text" placeholder="#000000" v-model="config.sidebarFontColor">
                </div>
              </div>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label">
                  {{ 'settings.label.footer_bg_color'|trans }}
                </label>
                <div class="control">
                  <input class="input is-medium" type="text" placeholder="#000000" v-model="config.footerBgColor">
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label">
                  {{ 'settings.label.footer_font_color'|trans }}
                </label>
                <div class="control">
                  <input class="input is-medium" type="text" placeholder="#000000" v-model="config.footerFontColor">
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label">
                  {{ 'settings.label.clock_bg_color'|trans }}
                </label>
                <div class="control">
                  <input class="input is-medium" type="text" placeholder="#000000" v-model="config.clockBgColor">
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label">
                  {{ 'settings.label.clock_font_color'|trans }}
                </label>
                <div class="control">
                  <input class="input is-medium" type="text" placeholder="#000000" v-model="config.clockFontColor">
                </div>
              </div>
            </div>
          </div>

          <hr>

          <div class="field is-grouped is-grouped-right">
            <div class="control">
              <button type="submit" class="button is-primary is-large">
                {{ 'settings.btn.save'|trans }} &nbsp;
                <span class="icon is-small">
                  <i class="fa fa-save"></i>
                </span>
              </button>
            </div>
          </div>
        </form>

        <form @submit.prevent="save" v-if="tab==='server'">
          <div class="field">
            <label class="label">
              {{ 'settings.label.server'|trans }}
            </label>
            <div class="control">
              <input class="input is-medium" type="url" placeholder="https://" v-model="config.server" @change="changeServer">
            </div>
          </div>

          <div class="field">
            <label class="label">
              {{ 'settings.label.username'|trans }}
            </label>
            <div class="control">
              <input class="input is-medium" type="text" placeholder="" v-model="config.username">
            </div>
          </div>

          <div class="field">
            <label class="label">
              {{ 'settings.label.password'|trans }}
            </label>
            <div class="control">
              <input class="input is-medium" type="password" placeholder="" v-model="config.password">
            </div>
          </div>

          <div class="field">
            <label class="label">
              {{ 'settings.label.client_id'|trans }}
            </label>
            <div class="control">
              <input class="input is-medium" type="text" placeholder="" v-model="config.clientId">
            </div>
          </div>

          <div class="field">
            <label class="label">
              {{ 'settings.label.client_secret'|trans }}
            </label>
            <div class="control">
              <input class="input is-medium" type="password" placeholder="" v-model="config.clientSecret">
            </div>
          </div>

          <div class="field">
            <label class="label">
              {{ 'settings.label.retries'|trans }}
            </label>
            <div class="control">
              <input class="input is-medium" type="text" placeholder="" v-model="config.retries">
            </div>
          </div>

          <hr>

          <div class="field is-grouped is-grouped-right">
            <div class="control">
              <button type="submit" class="button is-primary is-large">
                {{ 'settings.btn.save'|trans }} &nbsp;
                <span class="icon is-small">
                  <i class="fa fa-save"></i>
                </span>
              </button>
            </div>
          </div>
        </form>

        <form @submit.prevent="save" v-if="tab==='services'">
          <div class="field">
            <label class="label">
              {{ 'settings.label.unity'|trans }}
            </label>
            <div class="control">
              <div class="select">
                <select v-model="config.unity" @change="loadServices">
                  <option></option>
                  <option v-for="unity in unities" :value="unity.id" :key="unity.id">
                    {{ unity.nome }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="field">
            <label class="label">
              {{ 'settings.label.services'|trans }}
            </label>
            <div class="control" v-for="service in services" :key="service.id">
              <label class="checkbox">
                <input type="checkbox" :value="service" v-model="config.services">
                {{service.prefix}} - {{service.name}}
              </label>
            </div>
            <div class="control" v-if="!services || !services.length">
              {{ 'settings.services.empty'|trans }}
            </div>
          </div>

          <hr>

          <div class="field is-grouped is-grouped-right">
            <div class="control">
              <button type="submit" class="button is-primary is-large">
                {{ 'settings.btn.save'|trans }} &nbsp;
                <span class="icon is-small">
                  <i class="fa fa-save"></i>
                </span>
              </button>
            </div>
          </div>
        </form>

        <form @submit.prevent="save" v-if="tab==='sound'">
          <div class="field">
            <label class="label">
              {{ 'settings.label.alert'|trans }}
            </label>
            <div class="control has-addons">
              <div class="select">
                <select v-model="config.alert">
                  <option v-for="(i, alert) in alerts" :value="i" :key="i">
                    {{ alert }}
                  </option>
                </select>
              </div>
              <a class="button" title="Play">
                <span class="icon is-small" @click.prevent="testAlert">
                  <i class="fa fa-play"></i>
                </span>
              </a>
            </div>
          </div>
          <!-- VOICE -->
          <div class="field">
            <div class="control has-addons">
              <label class="checkbox">
                <input type="checkbox" v-model="config.vocalize">
                {{ 'settings.label.speech_enabled'|trans }}
              </label>
              <a class="button" title="Play">
                <span class="icon is-small" @click.prevent="testSpeech">
                  <i class="fa fa-play"></i>
                </span>
              </a>
            </div>
          </div>
          <div class="field" v-if="config.vocalize===true">
            <label class="label">
              {{ 'settings.label.vocalizeText'|trans }}
            </label>
            <div class="control">
              <input class="input is-medium" type="text" placeholder="[Priority] [Ticket] [Local] [Service]" v-model="config.vocalizeText">
            </div>
            <span>
              {{ 'settings.label.infoVocalizeText'|trans }}
              <p>{{ 'settings.label.exampleVocalizeText'|trans }}</p>
            </span>
          </div>          
          <!-- END VOICE -->
          <hr>

          <div class="field is-grouped is-grouped-right">
            <div class="control">
              <button type="submit" class="button is-primary is-large">
                {{ 'settings.btn.save'|trans }} &nbsp;
                <span class="icon is-small">
                  <i class="fa fa-save"></i>
                </span>
              </button>
            </div>
          </div>
        </form>

        <form @submit.prevent="uploadJSON" v-if="tab==='bkp_json'">
          <div class="field">
            <label class="label">
              {{ 'settings.label.upload'|trans }}
            </label>
            <div class="control">
              <input class="input is-medium" type="file" accept=".json" required>
            </div>
            <div v-if="getURL">
              {{ 'settings.label.defaultSettings'|trans }}
            </div>
          </div>
          <hr>
          <div class="field is-grouped is-grouped-right">
            <div class="control">
              <button type="button" class="button is-primary is-large" v-on:click.self="defaultJSON" v-if="getURL">
                {{ 'settings.btn.default'|trans }} &nbsp;
                <span class="icon is-small">
                  <i class="fa fa-server"></i>
                </span>
              </button>
              <button type="button" class="button is-primary is-large" v-on:click.self="genJSON">
                {{ 'settings.btn.download'|trans }} &nbsp;
                <span class="icon is-small">
                  <i class="fa fa-cloud-download"></i>
                </span>
              </button>
              <button type="submit" class="button is-primary is-large">
                {{ 'settings.btn.upload'|trans }} &nbsp;
                <span class="icon is-small">
                  <i class="fa fa-cloud-upload"></i>
                </span>
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<script>
  import audio from '@/services/audio'
  import speech from '@/services/speech'
  import { log } from '@/util/functions'
  import storage from '@/services/storage'
  import axios from 'axios'

  function load (ctx, isInit) {
    ctx.config = JSON.parse(JSON.stringify(ctx.$store.state.config))
    // defaults
    ctx.config.locale = ctx.config.locale || 'en'
    ctx.config.retries = ctx.config.retries || 5
    ctx.config.services = ctx.config.services || []
    ctx.config.alert = ctx.config.alert || audio.alertsAvailable.Default
    ctx.config.vocalize = ctx.config.vocalize || false
    ctx.config.video = ctx.config.video || ''
    ctx.config.pageBgColorNormal = ctx.config.pageBgColorNormal || '#FFFFFF'
    ctx.config.pageFontColorNormal = ctx.config.pageFontColorNormal || '#000000'
    ctx.config.pageBgColorPriority = ctx.config.pageBgColorPriority || '#FFFFFF'
    ctx.config.pageFontColorPriority = ctx.config.pageFontColorPriority || '#FF0000'
    ctx.config.sidebarBgColor = ctx.config.sidebarBgColor || '#4FC08D'
    ctx.config.sidebarFontColor = ctx.config.sidebarFontColor || '#000000'
    ctx.config.footerBgColor = ctx.config.footerBgColor || '#F1F1F1'
    ctx.config.footerFontColor = ctx.config.footerFontColor || '#000000'
    ctx.config.clockBgColor = ctx.config.clockBgColor || '#44A075'
    ctx.config.clockFontColor = ctx.config.clockFontColor || '#000000'

    if (ctx.$store.getters.isAuthenticated) {
      const forceLoad = (
        isInit ||
        !ctx.unities ||
        ctx.unities.length === 0
      )

      ctx.fetchUnities = forceLoad
      ctx.fetchServices = forceLoad

      if (ctx.$store.getters.isExpired) {
        log('token expired, trying to refresh')
        ctx.$store.dispatch('token').then(() => {
          log('token refreshed successfully!')
          ctx.loadData()
        }, () => {
          log('error on refresh token')
        })
      } else {
        ctx.loadData()
      }
    }

    ctx.initialClientId = ctx.config.clientId
    ctx.initialClientSecret = ctx.config.initialClientSecret
    ctx.initialUsername = ctx.config.initialUsername
    ctx.initialPassword = ctx.config.initialPassword
  }

  export default {
    name: 'Settings',
    data () {
      return {
        tab: 'interface',
        config: {
          speechList: []
        },
        initialClientId: null,
        initialClientSecret: null,
        initialUsername: null,
        initialPassword: null,
        fetchUnities: !this.unities,
        fetchServices: !this.services
      }
    },
    computed: {
      unities () {
        return this.$store.state.settings.unities
      },
      services () {
        return this.$store.state.settings.services.map(e => { return { id: e.servico.id, name: e.servico.nome, prefix: e.sigla } })
      },
      alerts () {
        return audio.alertsAvailable
      },
      speechList () {
        return speech.orderMessage
      },
      isCredentialChanged () {
        return (
          this.initialClientId !== this.config.clientId ||
          this.initialClientSecret !== this.config.initialClientSecret ||
          this.initialUsername !== this.config.initialUsername ||
          this.initialPassword !== this.config.initialPassword
        )
      },
      getURL () {
        let serverURL = document.location.protocol
        return serverURL === 'http:' || serverURL === 'https:'
      }
    },
    methods: {
      showTab (tab) {
        this.tab = tab
      },
      changeServer () {
        this.config.unity = null
        this.fetchUnities = true
        this.fetchServices = false
      },
      loadData () {
        if (this.fetchUnities && this.config.server) {
          this.$store
            .dispatch('fetchUnities')
            .then(() => {}, error => {
              this.$swal('Oops!', `${error}`, 'error')
            })
          this.fetchUnities = false
        }
        if (this.fetchServices && this.config.unity) {
          this.$store.dispatch('fetchServices', this.config.unity)
          this.fetchServices = false
        }
      },
      loadServices () {
        this.$store.dispatch('fetchServices', this.config.unity)
      },
      save () {
        this.$store.dispatch('saveConfig', this.config)

        const token = (
          !this.$store.getters.isAuthenticated ||
          this.$store.getters.isExpired ||
          this.isCredentialChanged
        )

        let promise

        if (token) {
          promise = this.$store.dispatch('token')
        } else {
          promise = Promise.resolve()
        }

        promise.then(() => {
          this.$swal(this.$root.$store.state.dict['alert.title.success'], this.$root.$store.state.dict['alert.message.success'], 'success')
          load(this, false)
        }, error => {
          this.$swal('Oops!', `${error}`, 'error')
        })
      },
      testAlert () {
        if (this.config.alert) {
          audio.playAlert(this.config.alert)
        }
      },
      testSpeech () {
        const lang = this.config.locale || 'pt-BR'
        log('Testing speech lang', lang, this.$root.$store.state.dict['settings.label.readVocalizeText'])
        speech.speechAll(lang, this.$root.$store.state.dict['settings.label.readVocalizeText']).then(() => {
          log('Testing end')
        }, (e) => {
          log('Testing error', e)
        })
      },
      uploadJSON () {
        this.$swal({
          title: this.$root.$store.state.dict['alert.title.uploadJSON'],
          text: this.$root.$store.state.dict['alert.message.uploadJSON'],
          icon: 'info',
          buttons: true,
          dangerMode: true
        }).then((willDelete) => {
          if (willDelete) {
            let input = document.querySelectorAll('input[type=file]')
            let self = this
            input.forEach(e => {
              Array.from(e.files).forEach(file => {
                if (file.type === 'application/json') {
                  let fileReader = new FileReader()
                  fileReader.onload = () => {
                    let parsedJSON = JSON.parse(fileReader.result)
                    storage.set('config', JSON.parse(JSON.stringify(parsedJSON)))
                    self.config = storage.get('config')
                    self.save()
                  }
                  fileReader.readAsText(file)
                }
              })
            })
          }
        })
      },
      genJSON () {
        let data = JSON.stringify(this.config)
        let blob = new Blob([data], {type: 'application/json'})
        let e = document.createEvent('MouseEvents')
        let a = document.createElement('a')
        a.download = 'settings.json'
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
        e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)
        this.$swal(this.$root.$store.state.dict['alert.title.getJSON'], this.$root.$store.state.dict['alert.message.getJSON'], 'success')
      },
      async defaultJSON () {
        let self = this
        await axios.get('./uploads/settings.json').then(response => {
          storage.set('config', JSON.parse(JSON.stringify(response.data)))
          self.config = storage.get('config')
          self.save()
        }).catch(error => {
          self.$swal('Oops!', `${error}`, 'error')
        })
      }
    },
    beforeMount () {
      load(this, true)
    }
  }
</script>

<style lang="sass">
  aside
    img
      height: 60px
      width: auto
  .columns .column
    padding: 2rem
</style>
