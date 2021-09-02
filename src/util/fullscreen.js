export default {
  isFullScreen: () => (document.fullScreenElement && document.fullScreenElement !== null) || document.mozFullScreen || document.webkitIsFullScreen,
  requestFullScreen: element => (element.requestFullscreen() || element.msRequestFullscreen() || element.mozRequestFullScreen() || element.webkitRequestFullscreen()),
  exitFullScreen: () => (document.exitFullscreen() || document.msExitFullscreen() || document.mozCancelFullScreen() || document.webkitExitFullscreen())
}
