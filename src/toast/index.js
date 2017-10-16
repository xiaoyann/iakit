import * as utils from '../utils'
import * as container from '../container'
import './style.styl'

export const toast = {
  $el: null,
  $container: null,
  inited: false,

  init () {
    if (this.inited) {
      return
    }

    const wrapper = document.createElement('div')
    utils.addClass(wrapper, 'toast')

    const toastMain = document.createElement('div')
    utils.addClass(toastMain, 'toast-main')

    wrapper.appendChild(toastMain)
    container.append(wrapper)
    utils.hideNode(wrapper)

    this.$el = toastMain
    this.$wrapper = wrapper
    this.$container = container
    this.inited = true
  },

  hide (callback) {
    utils.scaleLeave(this.$el, () => {
      this.$el.innerHTML = ''
      utils.hideNode(this.$wrapper)
      this.$container.hide()
      callback && callback()
    })
  },

  show (text, time, callback, position) {
    this.$el.innerHTML = text
    this.$wrapper.style.top = position
    utils.showNode(this.$wrapper)

    if (typeof time === 'function') {
      callback = time
      time = undefined
    }

    setTimeout(() => {
      this.hide(callback)
    }, time || 1500)

    this.$container.show()
    utils.scaleEnter(this.$el)
  },

  showTop (text, time, callback) {
    this.show(text, time, callback, '10%')
  },

  showCenter (text, time, callback) {
    this.show(text, time, callback, '50%')
  },

  showBottom (text, time, callback) {
    this.show(text, time, callback, '90%')
  }
}

toast.init()
