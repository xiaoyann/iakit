import * as iakit from '../../src/index'
import { fastclick } from '../../src/utils'

let btn1 = document.getElementById('btn1')
let btn2 = document.getElementById('btn2')
let btn3 = document.getElementById('btn3')

fastclick(btn1, function() {
  iakit.toast.showTop('页面顶部显示', 2000, () => {
    iakit.toast.showBottom('执行了回调')
  })
})

fastclick(btn2, function() {
  iakit.toast.showCenter('页面中间显示')
})

fastclick(btn3, function() {
  iakit.toast.showBottom('页面底部显示')
})

