import * as utils from '../utils'
import * as container from '../container'
import './style.styl'

const ATTR_BTNIDX_NAME = 'btn-index'
const CANCEL_IDX = 'cancel'

function renderTitle (text) {
  const element = document.createElement('div')
  element.innerHTML = text
  utils.addClass(element, 'actionsheet-title')
  return element
}

function renderButtons (buttons, destructiveIndex) {
  const wrapper = document.createElement('div')
  utils.addClass(wrapper, 'actionsheet-btns')

  buttons.forEach((button, index) => {
    let node = document.createElement('div')
    let classList = ['actionsheet-btn bd-1px']

    node.setAttribute(ATTR_BTNIDX_NAME, index)
    node.innerHTML = typeof button === 'string' ? button : button.text

    if (button.disable === true) {
      classList.push('actionsheet-disable')
    } else if (destructiveIndex === index) {
      classList.push('actionsheet-destructive')
    }

    utils.addClass(node, classList.join(' '))
    wrapper.appendChild(node)
  })

  return wrapper
}

function renderCancel () {
  let element = document.createElement('div')
  element.innerHTML = '取消'
  element.setAttribute(ATTR_BTNIDX_NAME, CANCEL_IDX)
  utils.addClass(element, 'actionsheet-btn actionsheet-cancel')
  return element
}

class ActionSheet {
  constructor(container) {
    const el = document.createElement('div')
    utils.addClass(el, 'actionsheet')

    utils.fastclick(el, (event) => {
      let config = this.config
      let node = event.srcElement
      let index = node.getAttribute(ATTR_BTNIDX_NAME)
      if (index === null) {
        return
      }
      if (index === CANCEL_IDX) {
        this.hide(true)
      } else {
        let button = config.buttons[index]
        if (button.disable === true) {
          return
        }
        if (typeof button.onClick === 'function') {
          button.onClick(index, button.text)
        } else if (typeof config.onClick === 'function') {
          config.onClick(index, button.text)
        }
        this.hide(false)
      }
    })

    utils.fastclick(container.mask, () => this.hide(true))
    container.append(el)

    this.showed = false
    this.$el = el
    this.$container = container
  }

  hide (isCancel) {
    if (isCancel && typeof this.config.onCancel === 'function') {
      this.config.onCancel()
    }
    this.$container.hideWithMask()
    utils.bottomLeave(this.$el, () => {
      utils.hideNode(this.$el)
      this.$el.innerHTML = ''
      this.config = {}
      this.showed = false
    })
  }

  show () {
    utils.showNode(this.$el)
    this.$container.showWithMask()
    utils.bottomEnter(this.$el)
  }

  render(options) {
    if (this.showed) {
      return
    }

    const config = {}

    for (let key in options) {
      config[key] = options[key]
    }

    config.buttons = config.options.map((item) => {
      if (typeof item === 'string') {
        return { text: item, disable: false, onClick: undefined }
      } else {
        return item
      }
    })

    config.options = undefined

    this.config = config

    if (config.title) {
      this.$el.appendChild(renderTitle(config.title))
    }

    if (config.buttons.length > 0) {
      this.$el.appendChild(renderButtons(config.buttons, config.destructiveIndex))
    }

    this.$el.appendChild(renderCancel())
    this.show()
  }
}

const instance = new ActionSheet(container)

export function actionsheet(options) {
  instance.render(options)
}
