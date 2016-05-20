import {
    DURATION,
    FADE_ENTER, FADE_LEAVE, 
    SCALE_ENTER, SCALE_LEAVE,
    BOTTOM_ENTER, BOTTOM_LEAVE
} from './constant';


export function getType(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}


export function fadeEnter(node) {
    addClass(node, FADE_ENTER);
    setTimeout(() => removeClass(node, FADE_ENTER), 0);
}


export function fadeLeave(node, callback) {
    addClass(node, FADE_LEAVE);
    setTimeout(() => {
        removeClass(node, FADE_LEAVE);
        if (callback) callback();
    }, DURATION);
}


export function scaleEnter(node) {
    addClass(node, SCALE_ENTER);
    setTimeout(() => removeClass(node, SCALE_ENTER));
}


export function scaleLeave(node, callback) {
    addClass(node, SCALE_LEAVE);
    setTimeout(() => {
        removeClass(node, SCALE_LEAVE);
        if (callback) callback();
    }, DURATION);
}


export function bottomEnter(node) {
    addClass(node, BOTTOM_ENTER);
    setTimeout(() => removeClass(node, BOTTOM_ENTER));
}


export function bottomLeave(node, callback) {
    addClass(node, BOTTOM_LEAVE);
    setTimeout(() => {
        removeClass(node, BOTTOM_LEAVE);
        if (callback) callback();
    }, DURATION);
}


export function addClass(node, name) {
    let classList = [];
    let namesArr = name.split(/\s+/g);
    let className = node.className;
    if (className) {
        namesArr.forEach((item) => {
            if (!className.match(item)) classList.push(item);
        });
    } else {
        classList = namesArr;
    }
    if (classList.length > 0) {
        if (className) classList.unshift(className);
        node.className = classList.join(' ');
    }
}


export function removeClass(node, name) {
    let namesArr = name.split(/\s+/g);
    let className = node.className;
    if (className) {
        namesArr.forEach((item) => {
            let pattern = new RegExp('(^|\\s+)' + item + '(\\s+|$)', 'g');
            className = className.replace(pattern , ' ');
        });
        node.className = className.trim();
    }
}


export const fastClick = (function() {
    let startX = 0, startY = 0, cancel = false;
    
    function onTouchStart(event) {
        let touches = event.touches;
        if (touches.length === 1) {
            startX = touches[0].pageX;
            startY = touches[0].pageY;
        }
    }

    function onTouchMove(event) {
        const distance = 10;
        let pageX = event.touches[0].pageX;
        let pageY = event.touches[0].pageY;
        if (Math.abs(pageX - startX) > distance || Math.abs(pageY - startY) > distance) cancel = true;
    }

    return function(node, callback) {
        node.addEventListener('touchstart', onTouchStart, false);
        node.addEventListener('touchmove', onTouchMove, false);
        node.addEventListener('touchend', (event) => {
            if (cancel === false) {
                callback(event);
                event.preventDefault();
            } else {
                cancel = false;
                startX = startY = 0;
            }
        }, false);
        if (!navigator.userAgent.toLowerCase().match('mobile')) 
            node.addEventListener('click', callback, false);
    }
})();










