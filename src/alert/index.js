import {NAMESPACE} from '../constant';
import {scaleEnter, scaleLeave, getType} from '../func';
import * as $container from '../container';
import './styles.scss';


const ALERT                     = `${NAMESPACE}__alert`;
const ALERT_TITLE               = `${NAMESPACE}__alert-title`;
const ALERT_CONTENT             = `${NAMESPACE}__alert-content`;
const ALERT_BUTTONS             = `${NAMESPACE}__alert-btns`;
const ALERT_BUTTON              = `${NAMESPACE}__alert-btn`;
const BUTTONS_SEPARATOR         = `${NAMESPACE}__btns-separator`;
const BUTTON_INDEX              = 'btn-index';


// 按钮被点击时需要执行的函数，通过数组的索引与按钮的ID关联
var buttonHandlers          = [];


let alertContainer = document.createElement('div');
alertContainer.className = ALERT;
$container.append(alertContainer);

let alertElement = document.createElement('div');
alertElement.className = `${NAMESPACE}__alert-main`;;
alertContainer.appendChild(alertElement);

alertContainer.addEventListener('click', (event) => {
    let button = event.srcElement;
    let index = button.getAttribute(BUTTON_INDEX);
    if (index == null) return;
    let handler = buttonHandlers[index];
    if (typeof handler === 'function') handler();
    hide(); 
}, false);


function renderTitle(text) {
    if (typeof text === 'string') {
        let node = document.createElement('h3');
        node.className = ALERT_TITLE;
        node.textContent = text;
        return node;
    } else {
        return null;
    }
}


function renderContent(text) {
    if (typeof text === 'string') {
        let node = document.createElement('div');
        node.className = ALERT_CONTENT;
        node.textContent = text;
        return node;
    } else {
        return null;
    }
}


function renderButtons(options) {
    let buttons = processOptions(options);
    let wrapper = document.createElement('div');
    if (buttons.length === 2) {
        wrapper.className = ALERT_BUTTONS + ' ' + BUTTONS_SEPARATOR;
    } else {
        wrapper.className = ALERT_BUTTONS;
    }
    buttons.forEach((button, index) => {
        let node = document.createElement('a');
        node.className = ALERT_BUTTON;
        node.textContent = button.text;
        node.setAttribute(BUTTON_INDEX, index);
        if (buttons.length === 2) node.style.width = '50%';
        if (button.onClick) buttonHandlers[index] = button.onClick;
        wrapper.appendChild(node);
    });
    return wrapper;
}


function processOptions(options) {
    var type = getType(options), buttons;
    
    if (type === 'function') {
        return [{
            text: '确定', 
            onClick: options
        }];
    }

    if (type === 'object') {
        return [options];
    }

    if (type === 'array') {
        return options;
    }

    return [{text: '确定'}];
}


function show() {
    alertContainer.style.display = 'block';
    $container.showWithMask();
    scaleEnter(alertElement);
}


function hide() {
    $container.hideWithMask();
    scaleLeave(alertElement, () => {
        alertContainer.style.display = 'none';
        alertElement.innerHTML = '';
        buttonHandlers = [];
    });
}


export default function(title, content, buttons) {
    let titleNode = renderTitle(title);
    let contentNode = renderContent(content);
    let buttonsNode = renderButtons(buttons || content);
    let fragment = document.createDocumentFragment();
    if (titleNode) fragment.appendChild(titleNode);
    if (contentNode) fragment.appendChild(contentNode);
    if (buttonsNode) fragment.appendChild(buttonsNode);
    alertElement.appendChild(fragment);
    show();
}


















