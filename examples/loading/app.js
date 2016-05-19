import {Loading} from 'foundation';


let btn1 = document.getElementById('btn1');
let btn2 = document.getElementById('btn2');

btn1.onclick = function() {
    Loading.show();
    setTimeout(() => {
        Loading.hide();
    }, 2000);
};

btn2.onclick = function() {
    Loading.show();
};