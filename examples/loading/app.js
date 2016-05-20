import {Loading} from 'foundation';


let btn1 = document.getElementById('btn1');
let btn2 = document.getElementById('btn2');

fastOnClick(btn1, function() {
    Loading.show();
    setTimeout(() => {
        Loading.hide();
    }, 2000);
});

fastOnClick(btn2, function() {
    Loading.show();
});