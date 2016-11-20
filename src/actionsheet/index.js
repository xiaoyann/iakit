import {NAMESPACE} from '../constant';
import * as $container from '../container';
import {bottomEnter, bottomLeave, fastClick} from '../func';
import './styles.scss';


const ACTIONSHEET                   = `${NAMESPACE}__actionsheet`;
const ACTIONSHEET_TITLE             = `${NAMESPACE}__actionsheet-title`;
const ACTIONSHEET_BUTTONS           = `${NAMESPACE}__actionsheet-btns`;
const ACTIONSHEET_BUTTON            = `${NAMESPACE}__actionsheet-btn`;
const ACTIONSHEET_CANCEL            = `${NAMESPACE}__actionsheet-cancel`;
const ACTIONSHEET_DESTRUCTIVE       = `${NAMESPACE}__actionsheet-destructive`;
const BUTTON_INDEX                  = 'btn-index';
const CANCEL_INDEX                  = 'cancel';


let __SHOWED__ = false;
// 按钮被点击时需要执行的函数，通过数组的索引与按钮的ID关联
let config = {};



var actionsheetElement = document.createElement('div');
actionsheetElement.className = ACTIONSHEET;    
$container.append(actionsheetElement);


fastClick(actionsheetElement, (event) => {
    let button = event.srcElement;
    if (!button.hasAttribute(BUTTON_INDEX)) {
        return;
    }
    let index = button.getAttribute(BUTTON_INDEX);
    if (index === CANCEL_INDEX) {
        hide(true);
    } else {
        let options = config.options[index];
        if (typeof options.onClick === 'function') {
            options.onClick(index, options.text); 
        } else if(typeof config.onClick === 'function') {
            config.onClick(index, options.text); 
        }
        hide(false);
    }
});


fastClick($container.mask, () => {
    hide(true);
});


// title
function renderTitle(text) {
    if (text) {
        var element = document.createElement('p');
        element.className = ACTIONSHEET_TITLE;
        element.textContent = text;
        return element;
    } else {
        return null;
    }
}


// buttons
function renderButtons(buttons, destructiveIndex) {
    if (!buttons) return null;
    var wrapper = document.createElement('div');
    wrapper.className = ACTIONSHEET_BUTTONS;
    buttons.forEach((button, index) => {
        let node = document.createElement('a');
        if (destructiveIndex === index) {
            node.className = ACTIONSHEET_BUTTON + ' ' + ACTIONSHEET_DESTRUCTIVE;
        } else {
            node.className = ACTIONSHEET_BUTTON;
        }
        node.textContent = typeof button === 'string' ? button : button.text;
        node.setAttribute(BUTTON_INDEX, index);
        wrapper.appendChild(node);
    });
    return wrapper;
}


function renderCancel() {
    let element = document.createElement('a');
    element.className = ACTIONSHEET_BUTTON + ' ' + ACTIONSHEET_CANCEL;
    element.textContent = '取消';
    element.setAttribute(BUTTON_INDEX, CANCEL_INDEX);
    return element;
}


function hide(isCancel) {
    if (!__SHOWED__) return;
    if (isCancel && typeof config.onCancel === 'function') {
        config.onCancel();
    }
    $container.hideWithMask();
    bottomLeave(actionsheetElement, () => {
        actionsheetElement.style.display = 'none';
        actionsheetElement.innerHTML = '';
        __SHOWED__ = false;
        config = {};
    });
}


function show() {
    __SHOWED__ = true;
    actionsheetElement.style.display = 'block';
    $container.showWithMask();
    bottomEnter(actionsheetElement);
}


export default function(options) {
    config = options;
    let cancelButton = renderCancel();
    let titleNode = renderTitle(options.title);
    let buttonsNode = renderButtons(options.options, options.destructiveIndex);
    let fragment = document.createDocumentFragment();
    if (titleNode) fragment.appendChild(titleNode);
    if (buttonsNode) fragment.appendChild(buttonsNode);
    if (cancelButton) fragment.appendChild(cancelButton);
    actionsheetElement.appendChild(fragment);
    show();
}







