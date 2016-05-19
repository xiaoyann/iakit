import {NAMESPACE} from '../constant';
import {fadeEnter, fadeLeave} from '../func';
import './styles.scss';

var container = document.createElement('div');
container.className = NAMESPACE;

var mask = document.createElement('div');
mask.className = `${NAMESPACE}__mask`;

container.appendChild(mask);
document.body.appendChild(container);


export function append(node) {
    container.appendChild(node);
}


export function show() {
    container.style.display = 'block';
}


export function hide() {
    container.style.display = 'none';
}


export function showWithMask() {
    mask.style.display = 'block';
    show();
    fadeEnter(mask);
}


export function hideWithMask() {
    fadeLeave(mask, () => {
        mask.style.display = 'none';
        hide();
    });
}


