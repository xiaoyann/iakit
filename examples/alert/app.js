import {Alert} from 'foundation';

let btn1 = document.getElementById('btn1');
let btn2 = document.getElementById('btn2');
let btn3 = document.getElementById('btn3');
let btn4 = document.getElementById('btn4');
let btn5 = document.getElementById('btn5');

fastOnClick(btn1, function() {
    Alert('注册失败');
});

btn2.onclick = function() {
    Alert(
        '注册失败', 
        '该邮箱已经被注册，如果有您有任何疑问请咨询客服。'
    );
};

fastOnClick(btn2, function() {
    Alert(
        '注册失败', 
        '该邮箱已经被注册，如果有您有任何疑问请咨询客服。'
    );
});

fastOnClick(btn3, function() {
    Alert(
        '该邮箱已经被注册，如果有您有任何疑问请咨询客服。', 
        function () {
        }
    );
});

fastOnClick(btn4, function() {
    Alert(
        '注册失败', 
        [
            {
                text: '取消', 
                onClick: () => {
                }
            },
            {
                text: '确定', 
                onClick: () => {
                }
            }
        ]
    );
});


fastOnClick(btn5, function() {
    Alert(
        '注册失败', 
        '该邮箱已经被注册，如果有您有任何疑问请咨询客服。', 
        [
            {
                text: '取消', 
                onClick: () => {
                }
            },
            {
                text: '登录', 
                onClick: () => {
                }
            },
            {
                text: '确定', 
                onClick: () => {
                }
            }
        ]
    );
});



