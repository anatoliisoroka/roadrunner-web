import React from 'react'

export default class General {
  static uuid() {
    var dt = new Date().getTime()
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(
      c
    ) {
      var r = (dt + Math.random() * 16) % 16 | 0
      dt = Math.floor(dt / 16)
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
    })
    return uuid
  }

  static closeActiveModal() {
    if (!window.mr) {
      console.warn('mr modals not initiated')
      return
    }
    window.mr.modals.closeActiveModal()
  }

  static updateModals() {
    if (!window.mr) {
      console.warn('mr modals not initiated')
      return
    }
    window.mr.modals.documentReady(window.$)
  }

  static updateMasonry() {
    if (!window.mr) {
      console.warn('mr masonry not initiated')
      return
    }
    window.mr.masonry.documentReady(window.$)
  }

  static updateImageBackgrounds() {
    if (!window.mr) {
      console.warn('mr backgrounds not initiated')
      return
    }
    window.mr.backgrounds.documentReady(window.$)
  }

  static updateGradients() {
    window.$("canvas[id*='granim']").remove()
    if (!window.mr) {
      console.warn('mr granim not initiated')
      return
    }
    window.mr.granim.documentReady(window.$)
  }

  static updateParallax() {
    if (!window.mr) {
      console.warn('mr parallax not initiated')
      return
    }
    window.mr.parallax.update()
  }

  static updateSlides() {
    if (!window.mr) {
      console.warn('mr sliders not initiated')
      return
    }

    window.mr.sliders.documentReady(window.$)
  }

  static updateTabs() {
    if (!window.mr) {
      console.warn('mr tabs not initiated')
      return
    }
    window.mr.tabs.documentReady(window.$)
  }

  static updateVideo() {
    if (!window.mr) {
      console.warn('mr video not initiated')
      return
    }
    window.mr.video.documentReady(window.$)
  }

  static updateAll() {
    General.updateSlides()
    General.updateParallax()
    General.updateImageBackgrounds()
    General.updateTabs()
    General.updateModals()
    General.closeActiveModal()
  }

  static updateFormListeners() {
    if (!window.mr) {
      console.warn('mr forms not initiated')
      return
    }
    window.mr.forms.documentReady(window.$)
  }

  static renderTabStyle(settings, uuid) {
    if (!settings) {
      return null
    }

    return (
      // todo remove this as it's a security risk
      // regardless of below

      // colours are sanitized by the API so can
      // only contain hexcode / word base colors
      <style
        dangerouslySetInnerHTML={{
          __html:
            `
        #` +
            uuid +
            ` .tabs li.active .tab__title span,
        #` +
            uuid +
            ` .tabs li.active .tab__title textarea  {
          color: ` +
            settings.secondary_color +
            ` !important;
        }
        #` +
            uuid +
            `.tabs--folder .tabs > li.active {
          border-top: 3px solid ` +
            settings.secondary_color +
            ` !important;
        }
      `
        }}
      />
    )
  }

  static debounce(func, wait, immediate) {
    var timeout

    return function executedFunction() {
      var context = this
      var args = arguments

      var later = function() {
        timeout = null
        if (!immediate) func.apply(context, args)
      }

      var callNow = immediate && !timeout

      clearTimeout(timeout)

      timeout = setTimeout(later, wait)

      if (callNow) func.apply(context, args)
    }
  }

  static getYoutubeVideoId(youtubeUrl) {
    if (!youtubeUrl) {
      return null
    }

    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    var match = youtubeUrl.match(regExp)
    if (match && match[2].length == 11) {
      return match[2]
    } else {
      return null
    }
  }

  static deepCopy(object) {
    return JSON.parse(JSON.stringify(object))
  }

  static getUrlParameter(name) {
    let url = window.location.href
    name = name.replace(/[\[\]]/g, '\\$&')
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url)
    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, ' '))
  }
}
