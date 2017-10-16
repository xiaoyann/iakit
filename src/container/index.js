import * as utils from '../utils'
import './style.styl'

let counts = 0
let maskCounts = 0

const container = document.createElement('div')
utils.addClass(container, 'container')

export const mask = document.createElement('div')
utils.addClass(mask, 'mask')

append(mask)
utils.hideNode(container)
utils.hideNode(mask)
document.body.appendChild(container)

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
  utils.showNode(mask)
  show()
  utils.fadeEnter(mask)
}

export function hideWithMask() {
  maskCounts -= 1
  if (maskCounts === 0) {
    utils.fadeLeave(mask, () => {
      utils.hideNode(mask)
      hide()
    })
  }
}
