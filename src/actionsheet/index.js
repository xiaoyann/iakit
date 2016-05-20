import {NAMESPACE} from '../constant';
import * as $container from '../container';
import {bottomEnter, bottomLeave} from '../func';
import './styles.scss';


const ACTIONSHEET                   = `${NAMESPACE}__actionsheet`;
const ACTIONSHEET_TITLE             = `${NAMESPACE}__actionsheet-title`;
const ACTIONSHEET_BUTTON            = `${NAMESPACE}__actionsheet-btn`;
const ACTIONSHEET_CANCEL            = `${NAMESPACE}__actionsheet-cancel`;
const ACTIONSHEET_DESTRUCTIVE       = `${NAMESPACE}__actionsheet-destructive`;
const BUTTON_INDEX                  = 'btn-index';
const CANCEL_INDEX                  = 'cancel';


let __SHOWED__ = false;
// 按钮被点击时需要执行的函数，通过数组的索引与按钮的ID关联
let buttonHandlers = [];



var actionsheetElement = document.createElement('div');
actionsheetElement.className = ACTIONSHEET;    
$container.append(actionsheetElement);

actionsheetElement.addEventListener('click', (event) => {
    let button = event.srcElement;
    let index = button.getAttribute(BUTTON_INDEX);
    if (index === CANCEL_INDEX) {
        hide();
    } else {
        let handler = buttonHandlers[index];
        if (typeof handler === 'function') {
            handler(); 
            hide();
        }
    }
}, false);


$container.mask.addEventListener('click', hide, false);


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
    buttons.forEach((button, index) => {
        let node = document.createElement('a');
        if (destructiveIndex === index) {
            node.className = ACTIONSHEET_BUTTON + ' ' + ACTIONSHEET_DESTRUCTIVE;
        } else {
            node.className = ACTIONSHEET_BUTTON;
        }
        node.textContent = button.text;
        node.setAttribute(BUTTON_INDEX, index);
        if (button.onClick) buttonHandlers[index] = button.onClick;
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


function hide() {
    if (!__SHOWED__) return;
    $container.hideWithMask();
    bottomLeave(actionsheetElement, () => {
        actionsheetElement.style.display = 'none';
        actionsheetElement.innerHTML = '';
        buttonHandlers = [];
        __SHOWED__ = false;
    });
}


function show() {
    __SHOWED__ = true;
    actionsheetElement.style.display = 'block';
    $container.showWithMask();
    bottomEnter(actionsheetElement);
}


export default function(options) {
    let cancelButton = renderCancel();
    let titleNode = renderTitle(options.title);
    let buttonsNode = renderButtons(options.options, options.destructiveIndex);
    let fragment = document.createDocumentFragment();
    fragment.appendChild(titleNode);
    fragment.appendChild(buttonsNode);
    fragment.appendChild(cancelButton);
    actionsheetElement.appendChild(fragment);
    show();
}







