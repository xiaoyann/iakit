import * as iakit from '../../src/index'
import { fastclick } from '../../src/utils'

let btn1 = document.getElementById('btn1')

fastclick(btn1, function() {
  iakit.loading.show()
  setTimeout(() => {
    iakit.loading.hide()
  }, 3000)
})
