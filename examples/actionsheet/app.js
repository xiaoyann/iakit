import {ActionSheet} from 'foundation';


let btn1 = document.getElementById('btn1');
let btn2 = document.getElementById('btn2');


btn1.onclick = function() {
    ActionSheet({
        options: [
            {
                text: '我再想想',
                onClick: () => {
                    // 是应该好好想想
                }
            },
            {
                text: '就这样吧',
                onClick: () => {
                    // 借酒消愁去吧
                }
            }
        ],
        destructiveIndex: 1,
        title: '确认要分手吗？'
    });
};

