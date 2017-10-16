(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["iakit"] = factory();
	else
		root["iakit"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fastclick = exports.bottomLeave = exports.bottomEnter = exports.scaleLeave = exports.scaleEnter = exports.fadeLeave = exports.fadeEnter = undefined;
exports.getType = getType;
exports.classPrefix = classPrefix;
exports.addClass = addClass;
exports.removeClass = removeClass;
exports.hideNode = hideNode;
exports.showNode = showNode;

var _config = __webpack_require__(3);

var config = _interopRequireWildcard(_config);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function getType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}

function classPrefix(name) {
  return config.projectName + '-' + name;
}

function addClass(node, cls) {
  var lists = [];
  if (node.className) {
    lists = node.className.split(/\s+/);
  }
  cls.split(/\s+/).forEach(function (name) {
    name = classPrefix(name);
    if (lists.indexOf(name) === -1) {
      lists.push(name);
    }
  });
  node.className = lists.join(' ');
}

function removeClass(node, cls) {
  var className = node.className;
  if (className) {
    cls.split(/\s+/).forEach(function (name) {
      name = classPrefix(name);
      var pattern = new RegExp('(^|\\s+)' + name + '(\\s+|$)', 'g');
      className = className.replace(pattern, ' ');
    });
    node.className = className.trim();
  }
}

function hideNode(node) {
  addClass(node, 'hidden');
}

function showNode(node) {
  removeClass(node, 'hidden');
}

function createEnterFunc(className) {
  return function (node) {
    addClass(node, className);
    setTimeout(function () {
      return removeClass(node, className);
    }, 0);
  };
}

function createLeaveFunc(className) {
  return function (node, callback) {
    addClass(node, className);
    setTimeout(function () {
      removeClass(node, className);
      if (callback) {
        callback();
      }
    }, config.duration);
  };
}

var fadeEnter = exports.fadeEnter = createEnterFunc('fade-enter');
var fadeLeave = exports.fadeLeave = createLeaveFunc('fade-leave');
var scaleEnter = exports.scaleEnter = createEnterFunc('scale-enter');
var scaleLeave = exports.scaleLeave = createLeaveFunc('scale-leave');
var bottomEnter = exports.bottomEnter = createEnterFunc('bottom-enter');
var bottomLeave = exports.bottomLeave = createLeaveFunc('bottom-leave');

var fastclick = exports.fastclick = function () {
  var startX = 0;
  var startY = 0;
  var cancel = false;

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
    if (!navigator.userAgent.toLowerCase().match('mobile')) {
      node.addEventListener('click', callback, false);
    }
  };
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alert = __webpack_require__(2);

Object.keys(_alert).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _alert[key];
    }
  });
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.alert = alert;

var _utils = __webpack_require__(0);

var utils = _interopRequireWildcard(_utils);

var _container = __webpack_require__(4);

var container = _interopRequireWildcard(_container);

__webpack_require__(6);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 按钮被点击时需要执行的函数，通过数组的索引与按钮的ID关联
var ATTR_BTNIDX_NAME = 'btn-idx';

function renderTitle(text) {
  var node = document.createElement('h3');
  node.innerHTML = text;
  utils.addClass(node, 'alert-title');
  return node;
}

function renderContent(text) {
  var node = document.createElement('div');
  node.innerHTML = text;
  utils.addClass(node, 'alert-content');
  return node;
}

function renderButtons(options, handlers) {
  var buttons = processOptions(options);
  var wrapper = document.createElement('div');

  utils.addClass(wrapper, 'alert-btns');
  if (buttons.length === 2) {
    utils.addClass(wrapper, 'alert-separate');
  }

  buttons.forEach(function (button, index) {
    var node = document.createElement('div');
    node.innerHTML = button.text;
    utils.addClass(node, 'alert-btn bd-1px');
    node.setAttribute(ATTR_BTNIDX_NAME, index);
    wrapper.appendChild(node);
    handlers[index] = button.onClick;
  });
  return wrapper;
}

/**
 * options:
 * [
 *   { text: '', onClick: () => {} },
 *   { text: '', onClick: () => {} }
 * ]
 */
function processOptions(options) {
  var type = utils.getType(options);
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

var Alert = function () {
  function Alert(container) {
    var _this = this;

    _classCallCheck(this, Alert);

    this.handlers = [];
    this.$container = container;

    this.$wrapper = document.createElement('div');
    this.$el = document.createElement('div');
    this.$wrapper.appendChild(this.$el);

    utils.addClass(this.$wrapper, 'alert');
    utils.addClass(this.$el, 'alert-main');

    utils.fastclick(this.$wrapper, function (event) {
      var button = event.srcElement;
      var index = button.getAttribute(ATTR_BTNIDX_NAME);
      if (index !== null) {
        var handler = _this.handlers[index];
        if (typeof handler === 'function') handler(event);
        _this.hide();
      }
    });
  }

  _createClass(Alert, [{
    key: 'show',
    value: function show() {
      this.$container.append(this.$wrapper);
      utils.showNode(this.$wrapper);
      this.$container.showWithMask();
      utils.scaleEnter(this.$el);
    }
  }, {
    key: 'hide',
    value: function hide() {
      var _this2 = this;

      this.$container.hideWithMask();
      utils.scaleLeave(this.$el, function () {
        return _this2.destroy();
      });
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.$wrapper.parentNode.removeChild(this.$wrapper);
      this.$wrapper = null;
      this.$el = null;
      this.handlers = [];
    }
  }, {
    key: 'render',
    value: function render(title, message, buttons) {
      var messageType = utils.getType(message);

      if (messageType === 'undefined') {
        message = title;
        title = undefined;
      } else if (messageType === 'function') {
        buttons = message;
        message = title;
        title = undefined;
      }

      if (!title) {
        title = '提示';
      }

      this.$el.appendChild(renderTitle(title));
      this.$el.appendChild(renderContent(message));
      this.$el.appendChild(renderButtons(buttons, this.handlers));

      this.show();
    }
  }]);

  return Alert;
}();

var alertTasks = [];
var instance = null;

var destroy = Alert.prototype.destroy;
Alert.prototype.destroy = function () {
  destroy.call(this);
  instance = null;
  exec();
};

function exec() {
  setTimeout(function () {
    if (!instance && alertTasks.length > 0) {
      var args = alertTasks.shift();
      instance = new Alert(container);
      instance.render.apply(instance, args);
    }
  }, 20);
}

/**
 * example:
 *   alert(
 *     '提示',
 *     '该手机号已经被注册',
 *     [
 *       { text: '取消', onClick: () => {} },
 *       { text: '确认' }
 *     ]
 *   )
 */
function alert(title, message, buttons) {
  alertTasks.push(arguments);
  exec();
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// 项目名称
var projectName = exports.projectName = 'iakit';

// 动画时长
var duration = exports.duration = 300;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.append = append;
exports.show = show;
exports.hide = hide;
exports.showWithMask = showWithMask;
exports.hideWithMask = hideWithMask;

var _utils = __webpack_require__(0);

var utils = _interopRequireWildcard(_utils);

__webpack_require__(5);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var counts = 0;
var maskCounts = 0;

var container = document.createElement('div');
utils.addClass(container, 'container');

var mask = document.createElement('div');
utils.addClass(mask, 'mask');

append(mask);
utils.hideNode(container);
document.body.appendChild(container);

function append(child) {
  container.appendChild(child);
}

function show() {
  counts += 1;
  utils.showNode(container);
}

function hide() {
  counts -= 1;
  if (counts === 0) {
    utils.hideNode(container);
  }
}

function showWithMask() {
  maskCounts += 1;
  utils.showNode(mask);
  show();
  utils.fadeEnter(mask);
}

function hideWithMask() {
  maskCounts -= 1;
  if (maskCounts === 0) {
    utils.fadeLeave(mask, function () {
      utils.hideNode(mask);
      hide();
    });
  }
}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
});