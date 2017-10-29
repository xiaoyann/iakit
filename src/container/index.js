import * as utils from '../utils'
import './style.styl'

let counts = 0
let maskCounts = 0

const container = document.createElement('div')
utils.addClass(container, 'container')

const maskElem = document.createElement('div')
utils.addClass(maskElem, 'mask')

append(maskElem)
utils.hideNode(container)
utils.hideNode(maskElem)
document.body.appendChild(container)

export const mask = {
  el: maskElem,
  callbacks: [],
  onclick(fn) {
    this.callbacks.push(fn)
  },
  offclick(fn) {
    this.callbacks = this.callbacks.filter((item) => item !== fn)
  }
}

utils.fastclick(mask.el, (events) => {
  mask.callbacks.forEach((fn) => fn(events))
})

export function append(child) {
  container.appendChild(child)
}

export function show() {
  counts += 1
  utils.showNode(container)
}

export function hide() {
  counts -= 1
  if (counts === 0) {
    utils.hideNode(container)
  }
}

export function showWithMask() {
  maskCounts += 1
  utils.showNode(maskElem)
  show()
  utils.fadeEnter(maskElem)
}

export function hideWithMask() {
  maskCounts -= 1
  if (maskCounts === 0) {
    utils.fadeLeave(maskElem, () => {
      utils.hideNode(maskElem)
      hide()
    })
  }
}
