import {NAMESPACE} from '../constant';
import * as $container from '../container';
import './styles.scss';


const LOADING                   = `${NAMESPACE}__loading`;
const LOADING_INDICATOR         = `${NAMESPACE}__loading-indicator`;


var loadingElement = (function() {
    let loading = document.createElement('div');
    loading.className = LOADING;
    let indicator = document.createElement('div');
    indicator.className = LOADING_INDICATOR;
    loading.appendChild(indicator);
    $container.append(loading);
    return loading;
})();


export function show() {
    $container.show();
    loadingElement.style.display = 'block';
}


export function hide() {
    $container.hide();
    loadingElement.style.display = 'none';
}



















