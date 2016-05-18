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
	exports.Alert = undefined;

	var _alert = __webpack_require__(3);

	var _alert2 = _interopRequireDefault(_alert);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Alert = _alert2.default;

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
	var DURATION = exports.DURATION = 300;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getType = getType;
	exports.fadeEnter = fadeEnter;
	exports.fadeLeave = fadeLeave;
	exports.scaleEnter = scaleEnter;
	exports.scaleLeave = scaleLeave;
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

/***/ },
/* 3 */
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

	var _func = __webpack_require__(2);

	var _container = __webpack_require__(4);

	__webpack_require__(5);

	var ALERT_TITLE = _constant.NAMESPACE + '__alert-title';
	var ALERT_CONTENT = _constant.NAMESPACE + '__alert-content';
	var ALERT_BUTTONS = _constant.NAMESPACE + '__alert-btns';
	var ALERT_BUTTON = _constant.NAMESPACE + '__alert-btn';
	var BUTTON_INDEX = 'btn-index';

	// 按钮被点击时需要执行的函数，通过数组的索引与按钮的ID关联
	var buttonHandlers = [];

	var alertElement = function () {
	    var wrapper = document.createElement('div');
	    wrapper.className = _constant.NAMESPACE + '__alert';
	    var alertMain = document.createElement('div');
	    alertMain.className = _constant.NAMESPACE + '__alert-main';
	    wrapper.appendChild(alertMain);
	    (0, _container.append)(wrapper);
	    return alertMain;
	}();

	alertElement.addEventListener('click', function (event) {
	    var button = event.srcElement;
	    var index = button.getAttribute(BUTTON_INDEX);
	    if (index == null) return;
	    var handler = buttonHandlers[index];
	    if (typeof handler === 'function') handler();
	    hide();
	});

	function renderTitle(text) {
	    if (typeof text === 'string') {
	        var node = document.createElement('h3');
	        node.className = ALERT_TITLE;
	        node.textContent = text;
	        return node;
	    } else {
	        return null;
	    }
	}

	function renderContent(text) {
	    if (typeof text === 'string') {
	        var node = document.createElement('div');
	        node.className = ALERT_CONTENT;
	        node.textContent = text;
	        return node;
	    } else {
	        return null;
	    }
	}

	function renderButtons(options) {
	    var buttons = processOptions(options);
	    var wrapper = document.createElement('div');
	    wrapper.className = ALERT_BUTTONS;
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
	    (0, _container.showWithMask)();
	    (0, _func.scaleEnter)(alertElement);
	}

	function hide() {
	    (0, _container.hideWithMask)();
	    (0, _func.scaleLeave)(alertElement, function () {
	        alertElement.innerHTML = '';
	        buttonHandlers = [];
	    });
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.append = append;
	exports.show = show;
	exports.hide = hide;
	exports.showWithMask = showWithMask;
	exports.hideWithMask = hideWithMask;

	var _constant = __webpack_require__(1);

	var _func = __webpack_require__(2);

	__webpack_require__(6);

	var container = document.createElement('div');
	container.className = _constant.NAMESPACE;

	var mask = document.createElement('div');
	mask.className = _constant.NAMESPACE + '__mask';

	container.appendChild(mask);
	document.body.appendChild(container);

	function append(node) {
	    container.appendChild(node);
	}

	function show() {
	    container.style.display = 'block';
	}

	function hide() {
	    container.style.display = 'none';
	}

	function showWithMask() {
	    show();
	    (0, _func.fadeEnter)(mask);
	}

	function hideWithMask() {
	    (0, _func.fadeLeave)(mask, hide);
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 6 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ])
});
;