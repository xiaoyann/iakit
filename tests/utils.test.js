import * as _ from '../src/utils'
import * as config from '../src/config'

const prefix = config.projectName

test('getType', () => {
  expect(_.getType(undefined)).toBe('undefined')
  expect(_.getType(null)).toBe('null')
  expect(_.getType(false)).toBe('boolean')
  expect(_.getType(true)).toBe('boolean')
  expect(_.getType(function() {})).toBe('function')
  expect(_.getType({})).toBe('object')
  expect(_.getType([])).toBe('array')
  expect(_.getType(0)).toBe('number')
})

test('classPrefix', () => {
  let className = _.classPrefix('a')
  expect(className).toBe(`${prefix}-a`)
})

describe('addClass', () => {
  test('添加一个 class', () => {
    let node = {
      className: ''
    }
    let name = 'a'
    _.addClass(node, name)
    expect(node.className).toBe(`${prefix}-${name}`)
  })

  test('添加多个 class', () => {
    let node = {
      className: 'abc'
    }
    let name = 'a b'
    _.addClass(node, name)
    expect(node.className).toBe(`abc ${prefix}-a ${prefix}-b`)
  })
})

describe('removeClass', () => {
  test('删除中间的多个 class', () => {
    let node = {
      className: `abc ${prefix}-a ${prefix}-b ${prefix}-c`
    }
    let name = 'a b'
    _.removeClass(node, name)
    expect(node.className).toBe(`abc ${prefix}-c`)
  })

  test('删除左边的多个 class', () => {
    let node = {
      className: `${prefix}-abc ${prefix}-a ${prefix}-b ${prefix}-c`
    }
    let name = 'abc a'
    _.removeClass(node, name)
    expect(node.className).toBe(`${prefix}-b ${prefix}-c`)
  })

  test('删除最左边的一个 class', () => {
    let node = {
      className: `${prefix}-abc ${prefix}-a ${prefix}-b ${prefix}-c`
    }
    let name = 'abc'
    _.removeClass(node, name)
    expect(node.className).toBe(`${prefix}-a ${prefix}-b ${prefix}-c`)
  })

  test('删除最右边的一个 class', () => {
    let node = {
      className: `abc ${prefix}-a ${prefix}-b ${prefix}-c`
    }
    let name = 'c'
    _.removeClass(node, name)
    expect(node.className).toBe(`abc ${prefix}-a ${prefix}-b`)
  })
})

test('hideNode', () => {
  let node = {
    className: `abc`
  }
  _.hideNode(node, name)
  expect(node.className).toBe(`abc ${prefix}-hidden`)
})

test('showNode', () => {
  let node = {
    className: `abc ${prefix}-hidden`
  }
  _.showNode(node, name)
  expect(node.className).toBe(`abc`)
})
