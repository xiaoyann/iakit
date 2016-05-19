import {NAMESPACE} from '../constant';
import {scaleEnter, scaleLeave} from '../func';
import * as $container from '../container';

import './styles.scss';


var loadingElement = (function() {
    let loading = document.createElement('div');
    loading.className = `${NAMESPACE}__loading`;
    let indicator = document.createElement('div');
    indicator.className = `${NAMESPACE}__loading-indicator`;
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



















