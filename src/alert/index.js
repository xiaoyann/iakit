import * as utils from '../utils'
import * as container from '../container'
import './style.styl'

const config = {
  zIndex: 1001,
  btnText: '确定'
}
// 按钮被点击时需要执行的函数，通过数组的索引与按钮的ID关联
const ATTR_BTNIDX_NAME = 'btn-idx'

function renderTitle (text) {
  let node = document.createElement('h3')
  node.innerHTML = text
  utils.addClass(node, 'alert-title')
  return node
}

function renderContent (text) {
  let node = document.createElement('div')
  node.innerHTML = text
  utils.addClass(node, 'alert-content')
  return node
}

function renderButtons (options, handlers) {
  let buttons = processOptions(options)
  let wrapper = document.createElement('div')

  utils.addClass(wrapper, 'alert-btns')
  if (buttons.length === 2) {
    utils.addClass(wrapper, 'alert-separate')
  }

  buttons.forEach((button, index) => {
    let node = document.createElement('div')
    node.innerHTML = button.text
    utils.addClass(node, 'alert-btn bd-1px')
    node.setAttribute(ATTR_BTNIDX_NAME, index)
    wrapper.appendChild(node)
    handlers[index] = button.onClick
  })
  return wrapper
}

/**
 * options:
 * [
 *   { text: '', onClick: () => {} },
 *   { text: '', onClick: () => {} }
 * ]
 */
function processOptions (options) {
  const type = utils.getType(options)
  if (type === 'function') {
    return [{
      text: config.btnText,
      onClick: options
    }]
  }
  if (type === 'array') {
    return options
  }
  return [{ text: config.btnText }]
}

class Alert {
  constructor(container) {
    this.handlers = []
    this.$container = container

    this.$wrapper = document.createElement('div')
    this.$el = document.createElement('div')
    this.$wrapper.appendChild(this.$el)
    this.$wrapper.style.zIndex = config.zIndex
    utils.addClass(this.$wrapper, 'alert')
    utils.addClass(this.$el, 'alert-main')

    utils.fastclick(this.$wrapper, (event) => {
      let button = event.srcElement
      let index = button.getAttribute(ATTR_BTNIDX_NAME)
      if (index !== null) {
        let handler = this.handlers[index]
        if (typeof handler === 'function') handler(event)
        this.hide()
      }
    })
  }

  show() {
    this.$container.append(this.$wrapper)
    utils.showNode(this.$wrapper)
    this.$container.showWithMask()
    utils.scaleEnter(this.$el)
  }

  hide() {
    this.$container.hideWithMask()
    utils.scaleLeave(this.$el, () => this.destroy())
  }

  destroy() {
    this.$wrapper.parentNode.removeChild(this.$wrapper)
    this.$wrapper = null
    this.$el = null
    this.handlers = []
  }

  render(title, message, buttons) {
    let messageType = utils.getType(message)

    // alert('message')
    if (messageType === 'undefined') {
      message = title
      title = undefined
    }
    // alert('message', () => {}) or alert('message', [])
    else if (messageType === 'function' || messageType === 'array') {
      buttons = message
      message = title
      title = undefined
    }

    if (!title) {
      title = '提示'
    }

    this.$el.appendChild(renderTitle(title))
    this.$el.appendChild(renderContent(message))
    this.$el.appendChild(renderButtons(buttons, this.handlers))

    this.show()
  }
}

const alertTasks = []
let instance = null

const destroy = Alert.prototype.destroy
Alert.prototype.destroy = function() {
  destroy.call(this)
  instance = null
  exec()
}

function exec () {
  setTimeout(() => {
    if (!instance && alertTasks.length > 0) {
      let args = alertTasks.shift()
      instance = new Alert(container)
      instance.render.apply(instance, args)
    }
  }, 20)
}

/**
 * example:
 *   alert(
 *     '提示',
 *     '该手机号已经被注册',
 *     [
 *       { text: '取消', onClick: () => {} },
 *       { text: '确认' }
 *     ]
 *   )
 */
export function alert(title, message, buttons) {
  alertTasks.push(arguments)
  exec()
}

alert.config = function(options) {
  Object.keys(config).forEach((key) => {
    if (typeof options[key] !== 'undefined') {
      config[key] = options[key]
    }
  })
}
