import * as utils from '../utils'
import * as container from '../container'
import './style.styl'

export const loading = {
  $el: null,
  $container: null,
  inited: false,

  init() {
    if (this.inited) return this
    this.$container = container
    this.$el = document.createElement('div')
    utils.addClass(this.$el, 'loading')
    let spinner = document.createElement('div')
    utils.addClass(spinner, 'loading-spinner')
    this.$el.appendChild(spinner)
    this.$container.append(this.$el)
    utils.hideNode(this.$el)
    this.inited = true
  },

  show() {
    this.$container.show()
    utils.showNode(this.$el)
  },

  hide() {
    this.$container.hide()
    utils.hideNode(this.$el)
  }
}

loading.init()
