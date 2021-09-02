export default {
  speechAll (lang, ...text) {
    return new Promise((resolve, reject) => {
      const msg = new SpeechSynthesisUtterance()
      msg.lang = lang
      msg.text = text
      msg.onerror = reject
      msg.onend = resolve
      msg.rate = 1
      setTimeout(() => { speechSynthesis.speak(msg) }, 1000)
    })
  },
  composeMessage (text) {
    if (text.pattern !== undefined) {
      let msg = text.pattern
      Object.entries(text).forEach(([k, v]) => {
        msg = msg.replace(`[${k}]`, v)
      })
      return msg
    } else {
      return `${text.ticket}: ${text.local}`
    }
  }
}
