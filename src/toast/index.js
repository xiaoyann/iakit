import {NAMESPACE} from '../constant';
import * as $container from '../container';
import {scaleEnter, scaleLeave} from '../func';
import './styles.scss';


const TOAST                 = `${NAMESPACE}__toast`;
const TOAST_MAIN            = `${NAMESPACE}__toast-main`;
const POSITION_TOP          = '10%';
const POSITION_CENTER       = '50%';
const POSITION_BOTTOM       = '90%';


var toastElement = document.createElement('div');
toastElement.className = TOAST;
var toastContent = document.createElement('div');
toastContent.className = TOAST_MAIN;
toastElement.appendChild(toastContent);
$container.append(toastElement);


function show(text, time, callback, position) {
    toastContent.textContent = text;
    toastElement.style.top = position;
    toastElement.style.display = 'block';
    
    if (typeof time === 'function') {
        callback = time;
        time = undefined;
    }

    setTimeout(() => {
        hide(callback);
    }, time || 1500);

    $container.show();
    scaleEnter(toastContent);
}


function hide(callback) {
    scaleLeave(toastContent, () => {
        toastContent.textContent = '';
        toastElement.style.display = 'none';
        $container.hide();
        if (typeof callback === 'function') {
            callback();
        }
    });
}


export function showTop(text, time, callback) {
    show(text, time, callback, POSITION_TOP);
}


export function showCenter(text, time, callback) {
    show(text, time, callback, POSITION_CENTER);
}


export function showBottom(text, time, callback) {
    show(text, time, callback, POSITION_BOTTOM);
}






