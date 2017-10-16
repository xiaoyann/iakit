import * as iakit from '../../src/index'
import { fastclick } from '../../src/utils'

let btn1 = document.getElementById('btn1')
let content = document.querySelector('.content')

function render(text, idx) {
  content.innerHTML = `selected option: { text: ${text}, index: ${idx} }`
}

fastclick(btn1, function() {
  iakit.actionSheet({
    options: [
      {
        text: '我再想想',
        disable: true
      },
      {
        text: '就这样吧',
        onClick: (i, text) => {
          render(text, i)
        }
      },
      '我再想想', '我再想想', '我再想想', '我再想想','我再想想', '我再想想','我再想想', '我再想想','我再想想', '我再想想','我再想想', '我再想想',
      '我再想想', '我再想想', '我再想想', '我再想想','我再想想', '我再想想','我再想想', '我再想想','我再想想', '我再想想','我再想想', '我再想想',
    ],
    destructiveIndex: 1,
    title: '确认要分手吗？',
    onClick(i, text) {
      render(text, i)
    },
    onCancel() {
      render('取消', '--')
    }
  })
})
