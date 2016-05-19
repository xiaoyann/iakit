import {Toast} from 'foundation';


let btn1 = document.getElementById('btn1');
let btn2 = document.getElementById('btn2');

btn1.onclick = function() {
    Toast.showTop('注册成功', 1500, () => {
        console.log('toast hided')
    });
};

btn2.onclick = function() {
    Toast.showCenter('注册成功', () => {
        console.log('toast hided')
    });
};

btn3.onclick = function() {
    Toast.showBottom('注册成功');
};

