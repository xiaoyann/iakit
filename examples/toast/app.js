import {Toast} from 'foundation';


let btn1 = document.getElementById('btn1');
let btn2 = document.getElementById('btn2');
let btn3 = document.getElementById('btn3');


fastOnClick(btn1, function() {
    Toast.showTop('注册成功', 1500, () => {
        console.log('toast hided')
    });
});

fastOnClick(btn2, function() {
    Toast.showCenter('注册成功', () => {
        console.log('toast hided')
    });
});

fastOnClick(btn3, function() {
    Toast.showBottom('注册成功');
});

