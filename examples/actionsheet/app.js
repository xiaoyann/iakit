import {ActionSheet} from 'foundation';


let btn1 = document.getElementById('btn1');
let btn2 = document.getElementById('btn2');


btn1.onclick = function() {
    ActionSheet({
        options: [
            {
                text: '我再想想',
                onClick: () => {
                    console.log('想想');
                }
            },
            {
                text: '确认退出',
                onClick: () => {
                    console.log('退出');
                }
            }
        ],
        destructiveIndex: 1,
        title: '确认要退出登录吗？'
    });
};

