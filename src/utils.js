import * as config from './config'

export function getType (obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}

export function classPrefix(name) {
  return `${config.projectName}-${name}`
}

export function addClass(node, cls) {
  let lists = []
  if (node.className) {
    lists = node.className.split(/\s+/)
  }
  cls.split(/\s+/).forEach((name) => {
    name = classPrefix(name)
    if (lists.indexOf(name) === -1) {
      lists.push(name)
    }
  })
  node.className = lists.join(' ')
}

export function removeClass(node, cls) {
  let className = node.className
  if (className) {
    cls.split(/\s+/).forEach((name) => {
      name = classPrefix(name)
      let pattern = new RegExp('(^|\\s+)' + name + '(\\s+|$)', 'g')
      className = className.replace(pattern, ' ')
    })
    node.className = className.trim()
  }
}

export function hideNode(node) {
  addClass(node, 'hidden')
}

export function showNode(node) {
  removeClass(node, 'hidden')
}

function createEnterFunc(className) {
  return function(node) {
    addClass(node, className)
    setTimeout(() => removeClass(node, className), 0)
  }
}

function createLeaveFunc(className) {
  return function(node, callback) {
    addClass(node, className)
    setTimeout(() => {
      removeClass(node, className)
      if (callback) {
        callback()
      }
    }, config.duration)
  }
}

export const fadeEnter = createEnterFunc('fade-enter')
export const fadeLeave = createLeaveFunc('fade-leave')
export const scaleEnter = createEnterFunc('scale-enter')
export const scaleLeave = createLeaveFunc('scale-leave')
export const bottomEnter = createEnterFunc('bottom-enter')
export const bottomLeave = createLeaveFunc('bottom-leave')

export const fastclick = (function () {
  let startX = 0
  let startY = 0
  let cancel = false

  function onTouchStart (event) {
    let touches = event.touches
    if (touches.length === 1) {
      startX = touches[0].pageX
      startY = touches[0].pageY
    }
  }

  function onTouchMove (event) {
    const distance = 10
    let pageX = event.touches[0].pageX
    let pageY = event.touches[0].pageY
    if (Math.abs(pageX - startX) > distance || Math.abs(pageY - startY) > distance) cancel = true
  }

  return function (node, callback) {
    node.addEventListener('touchstart', onTouchStart, false)
    node.addEventListener('touchmove', onTouchMove, false)
    node.addEventListener('touchend', (event) => {
      if (cancel === false) {
        callback(event)
        event.preventDefault()
      } else {
        cancel = false
        startX = startY = 0
      }
    }, false)
    if (!navigator.userAgent.toLowerCase().match('mobile')) {
      node.addEventListener('click', callback, false)
    }
  }
})()
