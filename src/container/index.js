import {NAMESPACE} from '../constant';
import {fadeEnter, fadeLeave} from '../func';
import './styles.scss';

var showCount = 0;
var showWithMaskCount = 0;


var container = document.createElement('div');
container.className = NAMESPACE;

export var mask = document.createElement('div');
mask.className = `${NAMESPACE}__mask`;

container.appendChild(mask);
document.body.appendChild(container);


export function append(node) {
    container.appendChild(node);
}


export function show() {
    showCount++;
    container.style.display = 'block';
}


export function hide() {
    if (--showCount <= 0) {
        showCount = 0;
        container.style.display = 'none';
    }
}


export function showWithMask() {
    showWithMaskCount++;
    mask.style.display = 'block';
    show();
    fadeEnter(mask);
}


export function hideWithMask() {
    showCount--;
    if (--showWithMaskCount === 0) {
        fadeLeave(mask, () => {
            mask.style.display = 'none';
            if (showCount === 0) hide();
        });
    }
}


