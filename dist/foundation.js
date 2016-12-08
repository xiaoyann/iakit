(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["foundation"] = factory();
	else
		root["foundation"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ActionSheet = exports.Toast = exports.Loading = exports.Alert = undefined;

	var _alert = __webpack_require__(5);

	var _alert2 = _interopRequireDefault(_alert);

	var _loading = __webpack_require__(6);

	var _Loading = _interopRequireWildcard(_loading);

	var _toast = __webpack_require__(7);

	var _Toast = _interopRequireWildcard(_toast);

	var _actionsheet = __webpack_require__(4);

	var _actionsheet2 = _interopRequireDefault(_actionsheet);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Alert = _alert2.default;
	exports.Loading = _Loading;
	exports.Toast = _Toast;
	exports.ActionSheet = _actionsheet2.default;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * 
	 */

	var NAMESPACE = exports.NAMESPACE = 'foundation';
	var FADE_ENTER = exports.FADE_ENTER = NAMESPACE + '__fade-enter';
	var FADE_LEAVE = exports.FADE_LEAVE = NAMESPACE + '__fade-leave';
	var SCALE_ENTER = exports.SCALE_ENTER = NAMESPACE + '__scale-enter';
	var SCALE_LEAVE = exports.SCALE_LEAVE = NAMESPACE + '__scale-leave';
	var BOTTOM_ENTER = exports.BOTTOM_ENTER = NAMESPACE + '__bottom-leave';
	var BOTTOM_LEAVE = exports.BOTTOM_LEAVE = NAMESPACE + '__bottom-leave';
	var DURATION = exports.DURATION = 300;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.mask = undefined;
	exports.append = append;
	exports.show = show;
	exports.hide = hide;
	exports.showWithMask = showWithMask;
	exports.hideWithMask = hideWithMask;

	var _constant = __webpack_require__(1);

	var _func = __webpack_require__(3);

	__webpack_require__(10);

	var showCount = 0;
	var showWithMaskCount = 0;

	var container = document.createElement('div');
	container.className = _constant.NAMESPACE;

	var mask = exports.mask = document.createElement('div');
	mask.className = _constant.NAMESPACE + '__mask';

	container.appendChild(mask);
	document.body.appendChild(container);

	function append(node) {
	    container.appendChild(node);
	}

	function show() {
	    showCount++;
	    container.style.display = 'block';
	}

	function hide() {
	    if (--showCount <= 0) {
	        showCount = 0;
	        container.style.display = 'none';
	    }
	}

	function showWithMask() {
	    showWithMaskCount++;
	    mask.style.display = 'block';
	    show();
	    (0, _func.fadeEnter)(mask);
	}

	function hideWithMask() {
	    showCount--;
	    if (--showWithMaskCount === 0) {
	        (0, _func.fadeLeave)(mask, function () {
	            mask.style.display = 'none';
	            if (showCount === 0) hide();
	        });
	    }
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.fastClick = undefined;
	exports.getType = getType;
	exports.fadeEnter = fadeEnter;
	exports.fadeLeave = fadeLeave;
	exports.scaleEnter = scaleEnter;
	exports.scaleLeave = scaleLeave;
	exports.bottomEnter = bottomEnter;
	exports.bottomLeave = bottomLeave;
	exports.addClass = addClass;
	exports.removeClass = removeClass;

	var _constant = __webpack_require__(1);

	function getType(obj) {
	    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
	}

	function fadeEnter(node) {
	    addClass(node, _constant.FADE_ENTER);
	    setTimeout(function () {
	        return removeClass(node, _constant.FADE_ENTER);
	    }, 0);
	}

	function fadeLeave(node, callback) {
	    addClass(node, _constant.FADE_LEAVE);
	    setTimeout(function () {
	        removeClass(node, _constant.FADE_LEAVE);
	        if (callback) callback();
	    }, _constant.DURATION);
	}

	function scaleEnter(node) {
	    addClass(node, _constant.SCALE_ENTER);
	    setTimeout(function () {
	        return removeClass(node, _constant.SCALE_ENTER);
	    });
	}

	function scaleLeave(node, callback) {
	    addClass(node, _constant.SCALE_LEAVE);
	    setTimeout(function () {
	        removeClass(node, _constant.SCALE_LEAVE);
	        if (callback) callback();
	    }, _constant.DURATION);
	}

	function bottomEnter(node) {
	    addClass(node, _constant.BOTTOM_ENTER);
	    setTimeout(function () {
	        return removeClass(node, _constant.BOTTOM_ENTER);
	    });
	}

	function bottomLeave(node, callback) {
	    addClass(node, _constant.BOTTOM_LEAVE);
	    setTimeout(function () {
	        removeClass(node, _constant.BOTTOM_LEAVE);
	        if (callback) callback();
	    }, _constant.DURATION);
	}

	function addClass(node, name) {
	    var classList = [];
	    var namesArr = name.split(/\s+/g);
	    var className = node.className;
	    if (className) {
	        namesArr.forEach(function (item) {
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

	function removeClass(node, name) {
	    var namesArr = name.split(/\s+/g);
	    var className = node.className;
	    if (className) {
	        namesArr.forEach(function (item) {
	            var pattern = new RegExp('(^|\\s+)' + item + '(\\s+|$)', 'g');
	            className = className.replace(pattern, ' ');
	        });
	        node.className = className.trim();
	    }
	}

	var fastClick = exports.fastClick = function () {
	    var startX = 0,
	        startY = 0,
	        cancel = false;

	    function onTouchStart(event) {
	        var touches = event.touches;
	        if (touches.length === 1) {
	            startX = touches[0].pageX;
	            startY = touches[0].pageY;
	        }
	    }

	    function onTouchMove(event) {
	        var distance = 10;
	        var pageX = event.touches[0].pageX;
	        var pageY = event.touches[0].pageY;
	        if (Math.abs(pageX - startX) > distance || Math.abs(pageY - startY) > distance) cancel = true;
	    }

	    return function (node, callback) {
	        node.addEventListener('touchstart', onTouchStart, false);
	        node.addEventListener('touchmove', onTouchMove, false);
	        node.addEventListener('touchend', function (event) {
	            if (cancel === false) {
	                callback(event);
	                event.preventDefault();
	            } else {
	                cancel = false;
	                startX = startY = 0;
	            }
	        }, false);
	        if (!navigator.userAgent.toLowerCase().match('mobile')) node.addEventListener('click', callback, false);
	    };
	}();

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (options) {
	    config = options;
	    var cancelButton = renderCancel();
	    var titleNode = renderTitle(options.title);
	    var buttonsNode = renderButtons(options.options, options.destructiveIndex);
	    var fragment = document.createDocumentFragment();
	    if (titleNode) fragment.appendChild(titleNode);
	    if (buttonsNode) fragment.appendChild(buttonsNode);
	    if (cancelButton) fragment.appendChild(cancelButton);
	    actionsheetElement.appendChild(fragment);
	    show();
	};

	var _constant = __webpack_require__(1);

	var _container = __webpack_require__(2);

	var $container = _interopRequireWildcard(_container);

	var _func = __webpack_require__(3);

	__webpack_require__(8);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var ACTIONSHEET = _constant.NAMESPACE + '__actionsheet';
	var ACTIONSHEET_TITLE = _constant.NAMESPACE + '__actionsheet-title';
	var ACTIONSHEET_BUTTONS = _constant.NAMESPACE + '__actionsheet-btns';
	var ACTIONSHEET_BUTTON = _constant.NAMESPACE + '__actionsheet-btn';
	var ACTIONSHEET_BUTTON_DISABLE = _constant.NAMESPACE + '__actionsheet-btn--disable';
	var ACTIONSHEET_CANCEL = _constant.NAMESPACE + '__actionsheet-cancel';
	var ACTIONSHEET_DESTRUCTIVE = _constant.NAMESPACE + '__actionsheet-destructive';
	var BUTTON_INDEX = 'btn-index';
	var CANCEL_INDEX = 'cancel';

	var __SHOWED__ = false;
	// 按钮被点击时需要执行的函数，通过数组的索引与按钮的ID关联
	var config = {};

	var actionsheetElement = document.createElement('div');
	actionsheetElement.className = ACTIONSHEET;
	$container.append(actionsheetElement);

	(0, _func.fastClick)(actionsheetElement, function (event) {
	    var button = event.srcElement;
	    if (!button.hasAttribute(BUTTON_INDEX)) {
	        return;
	    }
	    var index = button.getAttribute(BUTTON_INDEX);
	    if (index === CANCEL_INDEX) {
	        hide(true);
	    } else {
	        var options = config.options[index];
	        if (options.disable === true) {
	            return;
	        }
	        if (typeof options.onClick === 'function') {
	            options.onClick(index, options.text);
	        } else if (typeof config.onClick === 'function') {
	            config.onClick(index, options.text);
	        }
	        hide(false);
	    }
	});

	(0, _func.fastClick)($container.mask, function () {
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
	    buttons.forEach(function (button, index) {
	        var node = document.createElement('a');
	        var classList = [ACTIONSHEET_BUTTON];
	        if (button.disable === true) {
	            classList.push(ACTIONSHEET_BUTTON_DISABLE);
	        } else if (destructiveIndex === index) {
	            classList.push(ACTIONSHEET_DESTRUCTIVE);
	        }
	        node.className = classList.join(' ');
	        node.textContent = typeof button === 'string' ? button : button.text;
	        node.setAttribute(BUTTON_INDEX, index);
	        wrapper.appendChild(node);
	    });
	    return wrapper;
	}

	function renderCancel() {
	    var element = document.createElement('a');
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
	    (0, _func.bottomLeave)(actionsheetElement, function () {
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
	    (0, _func.bottomEnter)(actionsheetElement);
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (title, content, buttons) {
	    var titleNode = renderTitle(title);
	    var contentNode = renderContent(content);
	    var buttonsNode = renderButtons(buttons || content);
	    var fragment = document.createDocumentFragment();
	    if (titleNode) fragment.appendChild(titleNode);
	    if (contentNode) fragment.appendChild(contentNode);
	    if (buttonsNode) fragment.appendChild(buttonsNode);
	    alertElement.appendChild(fragment);
	    show();
	};

	var _constant = __webpack_require__(1);

	var _func = __webpack_require__(3);

	var _container = __webpack_require__(2);

	var $container = _interopRequireWildcard(_container);

	__webpack_require__(9);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var ALERT = _constant.NAMESPACE + '__alert';
	var ALERT_TITLE = _constant.NAMESPACE + '__alert-title';
	var ALERT_CONTENT = _constant.NAMESPACE + '__alert-content';
	var ALERT_BUTTONS = _constant.NAMESPACE + '__alert-btns';
	var ALERT_BUTTON = _constant.NAMESPACE + '__alert-btn';
	var BUTTONS_SEPARATOR = _constant.NAMESPACE + '__btns-separator';
	var BUTTON_INDEX = 'btn-index';

	// 按钮被点击时需要执行的函数，通过数组的索引与按钮的ID关联
	var buttonHandlers = [];

	var alertContainer = document.createElement('div');
	alertContainer.className = ALERT;
	$container.append(alertContainer);

	var alertElement = document.createElement('div');
	alertElement.className = _constant.NAMESPACE + '__alert-main';;
	alertContainer.appendChild(alertElement);

	(0, _func.fastClick)(alertContainer, function (event) {
	    var button = event.srcElement;
	    var index = button.getAttribute(BUTTON_INDEX);
	    if (index == null) return;
	    var handler = buttonHandlers[index];
	    if (typeof handler === 'function') handler();
	    hide();
	});

	function renderTitle(text) {
	    if (text) {
	        var node = document.createElement('h3');
	        node.className = ALERT_TITLE;
	        node.textContent = String(text);
	        return node;
	    } else {
	        return null;
	    }
	}

	function renderContent(text) {
	    if (text) {
	        var node = document.createElement('div');
	        node.className = ALERT_CONTENT;
	        node.textContent = String(text);
	        return node;
	    } else {
	        return null;
	    }
	}

	function renderButtons(options) {
	    var buttons = processOptions(options);
	    var wrapper = document.createElement('div');
	    if (buttons.length === 2) {
	        wrapper.className = ALERT_BUTTONS + ' ' + BUTTONS_SEPARATOR;
	    } else {
	        wrapper.className = ALERT_BUTTONS;
	    }
	    buttons.forEach(function (button, index) {
	        var node = document.createElement('a');
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
	    var type = (0, _func.getType)(options),
	        buttons;

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

	    return [{ text: '确定' }];
	}

	function show() {
	    alertContainer.style.display = 'block';
	    $container.showWithMask();
	    (0, _func.scaleEnter)(alertElement);
	}

	function hide() {
	    $container.hideWithMask();
	    (0, _func.scaleLeave)(alertElement, function () {
	        alertContainer.style.display = 'none';
	        alertElement.innerHTML = '';
	        buttonHandlers = [];
	    });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.show = show;
	exports.hide = hide;

	var _constant = __webpack_require__(1);

	var _container = __webpack_require__(2);

	var $container = _interopRequireWildcard(_container);

	__webpack_require__(11);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var LOADING = _constant.NAMESPACE + '__loading';
	var LOADING_INDICATOR = _constant.NAMESPACE + '__loading-indicator';

	var loadingElement = function () {
	    var loading = document.createElement('div');
	    loading.className = LOADING;
	    var indicator = document.createElement('div');
	    indicator.className = LOADING_INDICATOR;
	    loading.appendChild(indicator);
	    $container.append(loading);
	    return loading;
	}();

	function show() {
	    $container.show();
	    loadingElement.style.display = 'block';
	}

	function hide() {
	    $container.hide();
	    loadingElement.style.display = 'none';
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.showTop = showTop;
	exports.showCenter = showCenter;
	exports.showBottom = showBottom;

	var _constant = __webpack_require__(1);

	var _container = __webpack_require__(2);

	var $container = _interopRequireWildcard(_container);

	var _func = __webpack_require__(3);

	__webpack_require__(12);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var TOAST = _constant.NAMESPACE + '__toast';
	var TOAST_MAIN = _constant.NAMESPACE + '__toast-main';
	var POSITION_TOP = '10%';
	var POSITION_CENTER = '50%';
	var POSITION_BOTTOM = '90%';

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

	    setTimeout(function () {
	        hide(callback);
	    }, time || 1500);

	    $container.show();
	    (0, _func.scaleEnter)(toastContent);
	}

	function hide(callback) {
	    (0, _func.scaleLeave)(toastContent, function () {
	        toastContent.textContent = '';
	        toastElement.style.display = 'none';
	        $container.hide();
	        if (typeof callback === 'function') {
	            callback();
	        }
	    });
	}

	function showTop(text, time, callback) {
	    show(text, time, callback, POSITION_TOP);
	}

	function showCenter(text, time, callback) {
	    show(text, time, callback, POSITION_CENTER);
	}

	function showBottom(text, time, callback) {
	    show(text, time, callback, POSITION_BOTTOM);
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 9 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 10 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 11 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 12 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ])
});
;