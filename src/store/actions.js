import { Client } from '@/services/api'
import storage from '@/services/storage'

function normalizeMessage (data) {
  let listService = storage.get('config').services.filter(e => e.prefix === data.siglaSenha)
  let theService = (listService.length > 0) ? listService[0].name : ''
  return {
    id: data.id,
    type: 'ticket',
    title: data.siglaSenha + ('000' + data.numeroSenha).slice(-3),
    subtitle: data.local + ' ' + ('00' + data.numeroLocal).slice(-2),
    description: data.prioridade,
    service: theService,
    $data: data
  }
}

export const loadConfig = ({ commit }) => {
  const config = storage.get('config', {})
  commit('updateConfig', config)
}

export const saveConfig = ({ commit }, config) => {
  commit('updateConfig', config)
}

export const fetchMessages = ({ state, commit }) => {
  return new Promise((resolve, reject) => {
    const api = new Client(state.config.server, null, state.config.retries)
    const idServices = state.config.services.map(e => e.id)
    api
      .messages(state.auth.accessToken, state.config.unity, idServices)
      .then(messages => {
        if (messages.length) {
          const last = normalizeMessage(messages[0])
          commit('newMessage', last)
        }
        resolve()
      }, reject)
      .catch(reject)
  })
}
