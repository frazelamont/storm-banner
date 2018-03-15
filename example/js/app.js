(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

var _component = require('./libs/component/');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var onDOMContentLoadedTasks = [function () {
    window.__STORMID_COOKIE_BANNER__ = _component2.default.init('.js-banner');
    console.log(window.__STORMID_COOKIE_BANNER__);
}];

if ('addEventListener' in window) window.addEventListener('DOMContentLoaded', function () {
    onDOMContentLoadedTasks.forEach(function (fn) {
        return fn();
    });
});

},{"./libs/component/":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _defaults = require('./lib/defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _lib = require('./lib');

var _lib2 = _interopRequireDefault(_lib);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var init = function init(sel, opts) {
	return Object.assign({}, (0, _lib2.default)(sel, Object.assign({}, _defaults2.default, opts)));
};

exports.default = { init: init };

},{"./lib":5,"./lib/defaults":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var TRIGGER_EVENTS = exports.TRIGGER_EVENTS = ['ontouchend' in window ? 'touchend' : 'click', 'keyup'];

var TRIGGER_KEYCODES = exports.TRIGGER_KEYCODES = [13, 32];

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	closeBtnSelector: '.js-banner__close',
	hiddenBanner: 'off--banner',
	template: function template(sel) {
		return '<div' + (!!~sel.indexOf('#') ? 'id="' + sel.substr(1) + '"' : '') + ' class="' + (!~sel.indexOf('#') ? sel.substr(1) : '') + ' banner" role="dialog" aria-label="welcome">\n\t\t\t\t<div class="banner_msg">\n\t\t\t\t\tWelcome. This site uses cookies. Read <a class="banner__link" href="/info/cookies">our policy</a>.\n\t\t\t\t</div>\n\t\t\t\t<button class="banner__close js-banner__close" aria-label="Close banner">\n\t\t\t\t\t<svg class="banner__close-icon" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">\n\t\t\t\t\t\t<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>\n\t\t\t\t\t\t<path d="M0 0h24v24H0z" fill="none"/>\n\t\t\t\t\t</svg>\n\t\t\t\t</button>\n\t\t\t</div>';
	},
	dismiss: function dismiss(banner) {
		banner.parentNode.removeChild(banner);
	},

	type: 'cookie', //localStorage || sessionStorage || cookie
	name: '__STORMID_MSG__',
	value: 'acknowledged',
	cookie: {
		path: '/',
		domain: '',
		secure: '',
		expiry: 365
	},
	callback: null //banner node passed to a callback
};

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constants = require('./constants');

var _utils = require('./utils');

var save = function save(state) {
    if (state.settings.type === 'cookie') return document.cookie = (0, _utils.writeCookie)(state);else window[state.settings.type].setItem(state.settings.name, state.settings.value);
};

var check = function check(settings) {
    settings = settings || state.settings;
    if (settings.type !== 'cookie') return window[settings.type].getItem(settings.name) === settings.value;else return (0, _utils.getCookie)(settings.name) && (0, _utils.getCookie)(settings.name).value === settings.value;
};

var dismiss = function dismiss(state) {
    return function () {
        save(state);
        state.settings.dismiss(state.banner);
    };
};

var initListener = function initListener(state) {
    _constants.TRIGGER_EVENTS.forEach(function (ev) {
        state.btn.addEventListener(ev, function (e) {
            (!e.keyCode || !!~_constants.TRIGGER_KEYCODES.indexOf(e.keyCode)) && dismiss(state)();
        });
    });
};

exports.default = function (sel, settings) {
    var banner = document.querySelector(sel);
    if (settings.type !== 'cookie' && window[settings.type] == undefined) return console.warn('Browser does not suport ' + settings.type);

    if (!check(settings)) {
        banner && banner.classList.remove(settings.hiddenBanner);
        !banner && document.body.firstElementChild.insertAdjacentHTML('beforebegin', settings.template(sel));
    } else {
        if (!!banner) banner.parentNode.removeChild(banner);
        return;
    }

    var state = {
        settings: settings,
        banner: banner || document.querySelector(sel),
        btn: (banner || document.querySelector(sel)).querySelector(settings.closeBtnSelector)
    };
    state.btn && initListener(state);

    return { dismiss: dismiss(state) };
};

},{"./constants":3,"./utils":6}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var writeCookie = exports.writeCookie = function writeCookie(state) {
    return [state.settings.name + '=' + state.settings.value + ';', 'expires=' + new Date(new Date().getTime() + state.settings.cookie.expiry * 24 * 60 * 60 * 1000).toGMTString() + ';', 'path=' + state.settings.cookie.path + ';', state.settings.cookie.domain ? 'domain=' + state.settings.cookie.domain : '', state.settings.cookie.secure ? 'secure=' + state.settings.cookie.secure : ''].join('');
};

var getCookie = exports.getCookie = function getCookie(name) {
    return document.cookie.split('; ').map(function (part) {
        return { name: part.split('=')[0], value: part.split('=')[1] };
    }).filter(function (part) {
        return part.name === name;
    })[0];
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlL3NyYy9hcHAuanMiLCJleGFtcGxlL3NyYy9saWJzL2NvbXBvbmVudC9pbmRleC5qcyIsImV4YW1wbGUvc3JjL2xpYnMvY29tcG9uZW50L2xpYi9jb25zdGFudHMuanMiLCJleGFtcGxlL3NyYy9saWJzL2NvbXBvbmVudC9saWIvZGVmYXVsdHMuanMiLCJleGFtcGxlL3NyYy9saWJzL2NvbXBvbmVudC9saWIvaW5kZXguanMiLCJleGFtcGxlL3NyYy9saWJzL2NvbXBvbmVudC9saWIvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7OztBQUVBLElBQU0sMkJBQTJCLFlBQU0sQUFDbkM7V0FBQSxBQUFPLDRCQUE0QixvQkFBQSxBQUFPLEtBQTFDLEFBQW1DLEFBQVksQUFDL0M7WUFBQSxBQUFRLElBQUksT0FBWixBQUFtQixBQUN0QjtBQUhELEFBQWdDLENBQUE7O0FBS2hDLElBQUcsc0JBQUgsQUFBeUIsZUFBUSxBQUFPLGlCQUFQLEFBQXdCLG9CQUFvQixZQUFNLEFBQUU7NEJBQUEsQUFBd0IsUUFBUSxVQUFBLEFBQUMsSUFBRDtlQUFBLEFBQVE7QUFBeEMsQUFBZ0Q7QUFBcEcsQ0FBQTs7Ozs7Ozs7O0FDUGpDOzs7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBTSxPQUFPLFNBQVAsQUFBTyxLQUFBLEFBQUMsS0FBRCxBQUFNLE1BQVMsQUFDM0I7UUFBTyxPQUFBLEFBQU8sT0FBUCxBQUFjLElBQUksbUJBQUEsQUFBUSxLQUFLLE9BQUEsQUFBTyxPQUFQLEFBQWMsd0JBQXBELEFBQU8sQUFBa0IsQUFBYSxBQUE0QixBQUNsRTtBQUZEOztrQkFJZSxFQUFFLE0sQUFBRjs7Ozs7Ozs7QUNQUixJQUFNLDBDQUFrQixDQUFDLGdCQUFBLEFBQWdCLFNBQWhCLEFBQXlCLGFBQTFCLEFBQXVDLFNBQS9ELEFBQXdCLEFBQWdEOztBQUV4RSxJQUFN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QUFJLGdCQUFBO2VBQVMsRUFBRSxNQUFNLEtBQUEsQUFBSyxNQUFMLEFBQVcsS0FBbkIsQUFBUSxBQUFnQixJQUFJLE9BQU8sS0FBQSxBQUFLLE1BQUwsQUFBVyxLQUF2RCxBQUFTLEFBQW1DLEFBQWdCO0FBRG5FLEtBQUEsRUFBQSxBQUVHLE9BQU8sZ0JBQUE7ZUFBUSxLQUFBLEFBQUssU0FBYixBQUFzQjtBQUZoQyxPQUFULEFBQVMsQUFFc0M7QUFGakUiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfXJldHVybiBlfSkoKSIsImltcG9ydCBCYW5uZXIgZnJvbSAnLi9saWJzL2NvbXBvbmVudC8nO1xuXG5jb25zdCBvbkRPTUNvbnRlbnRMb2FkZWRUYXNrcyA9IFsoKSA9PiB7XG4gICAgd2luZG93Ll9fU1RPUk1JRF9DT09LSUVfQkFOTkVSX18gPSBCYW5uZXIuaW5pdCgnLmpzLWJhbm5lcicpO1xuICAgIGNvbnNvbGUubG9nKHdpbmRvdy5fX1NUT1JNSURfQ09PS0lFX0JBTk5FUl9fKTtcbn1dO1xuICAgIFxuaWYoJ2FkZEV2ZW50TGlzdGVuZXInIGluIHdpbmRvdykgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7IG9uRE9NQ29udGVudExvYWRlZFRhc2tzLmZvckVhY2goKGZuKSA9PiBmbigpKTsgfSk7IiwiaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4vbGliL2RlZmF1bHRzJztcbmltcG9ydCBmYWN0b3J5IGZyb20gJy4vbGliJztcblxuY29uc3QgaW5pdCA9IChzZWwsIG9wdHMpID0+IHtcblx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGZhY3Rvcnkoc2VsLCBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgb3B0cykpKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHsgaW5pdCB9OyIsImV4cG9ydCBjb25zdCBUUklHR0VSX0VWRU5UUyA9ICBbJ29udG91Y2hlbmQnIGluIHdpbmRvdyA/ICd0b3VjaGVuZCcgOiAnY2xpY2snLCAna2V5dXAnXTtcblxuZXhwb3J0IGNvbnN0IFRSSUdHRVJfS0VZQ09ERVMgPSBbMTMsIDMyXTsiLCJleHBvcnQgZGVmYXVsdCB7XG5cdGNsb3NlQnRuU2VsZWN0b3I6ICcuanMtYmFubmVyX19jbG9zZScsXG5cdGhpZGRlbkJhbm5lcjogJ29mZi0tYmFubmVyJyxcblx0dGVtcGxhdGUoc2VsKXtcblx0XHRyZXR1cm4gYDxkaXYkeyEhfnNlbC5pbmRleE9mKCcjJykgPyBgaWQ9XCIke3NlbC5zdWJzdHIoMSl9XCJgIDogJyd9IGNsYXNzPVwiJHshfnNlbC5pbmRleE9mKCcjJykgPyBzZWwuc3Vic3RyKDEpIDogJyd9IGJhbm5lclwiIHJvbGU9XCJkaWFsb2dcIiBhcmlhLWxhYmVsPVwid2VsY29tZVwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYmFubmVyX21zZ1wiPlxuXHRcdFx0XHRcdFdlbGNvbWUuIFRoaXMgc2l0ZSB1c2VzIGNvb2tpZXMuIFJlYWQgPGEgY2xhc3M9XCJiYW5uZXJfX2xpbmtcIiBocmVmPVwiL2luZm8vY29va2llc1wiPm91ciBwb2xpY3k8L2E+LlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGJ1dHRvbiBjbGFzcz1cImJhbm5lcl9fY2xvc2UganMtYmFubmVyX19jbG9zZVwiIGFyaWEtbGFiZWw9XCJDbG9zZSBiYW5uZXJcIj5cblx0XHRcdFx0XHQ8c3ZnIGNsYXNzPVwiYmFubmVyX19jbG9zZS1pY29uXCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgd2lkdGg9XCIyNFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cblx0XHRcdFx0XHRcdDxwYXRoIGQ9XCJNMTkgNi40MUwxNy41OSA1IDEyIDEwLjU5IDYuNDEgNSA1IDYuNDEgMTAuNTkgMTIgNSAxNy41OSA2LjQxIDE5IDEyIDEzLjQxIDE3LjU5IDE5IDE5IDE3LjU5IDEzLjQxIDEyelwiLz5cblx0XHRcdFx0XHRcdDxwYXRoIGQ9XCJNMCAwaDI0djI0SDB6XCIgZmlsbD1cIm5vbmVcIi8+XG5cdFx0XHRcdFx0PC9zdmc+XG5cdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0PC9kaXY+YDtcblx0fSxcblx0ZGlzbWlzcyhiYW5uZXIpeyBiYW5uZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChiYW5uZXIpOyB9LFxuXHR0eXBlOiAnY29va2llJywvL2xvY2FsU3RvcmFnZSB8fCBzZXNzaW9uU3RvcmFnZSB8fCBjb29raWVcblx0bmFtZTogJ19fU1RPUk1JRF9NU0dfXycsXG5cdHZhbHVlOiAnYWNrbm93bGVkZ2VkJyxcblx0Y29va2llOiB7XG5cdFx0cGF0aDogJy8nLFxuXHRcdGRvbWFpbjogJycsXG5cdFx0c2VjdXJlOiAnJyxcblx0XHRleHBpcnk6IDM2NVxuXHR9LFxuXHRjYWxsYmFjazogbnVsbC8vYmFubmVyIG5vZGUgcGFzc2VkIHRvIGEgY2FsbGJhY2tcbn07IiwiaW1wb3J0IHsgVFJJR0dFUl9FVkVOVFMsIFRSSUdHRVJfS0VZQ09ERVMgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBoLCBnZXRDb29raWUsIHdyaXRlQ29va2llIH0gZnJvbSAnLi91dGlscyc7XG5cbmNvbnN0IHNhdmUgPSBzdGF0ZSA9PiB7XG4gICAgaWYoc3RhdGUuc2V0dGluZ3MudHlwZSA9PT0gJ2Nvb2tpZScpIHJldHVybiBkb2N1bWVudC5jb29raWUgPSB3cml0ZUNvb2tpZShzdGF0ZSk7XG4gICAgZWxzZSB3aW5kb3dbc3RhdGUuc2V0dGluZ3MudHlwZV0uc2V0SXRlbShzdGF0ZS5zZXR0aW5ncy5uYW1lLCBzdGF0ZS5zZXR0aW5ncy52YWx1ZSk7XG59O1xuXG5jb25zdCBjaGVjayA9IHNldHRpbmdzID0+IHtcbiAgICBzZXR0aW5ncyA9IHNldHRpbmdzIHx8IHN0YXRlLnNldHRpbmdzO1xuICAgIGlmKHNldHRpbmdzLnR5cGUgIT09ICdjb29raWUnKSByZXR1cm4gd2luZG93W3NldHRpbmdzLnR5cGVdLmdldEl0ZW0oc2V0dGluZ3MubmFtZSkgPT09IHNldHRpbmdzLnZhbHVlO1xuICAgIGVsc2UgcmV0dXJuIGdldENvb2tpZShzZXR0aW5ncy5uYW1lKSAmJiBnZXRDb29raWUoc2V0dGluZ3MubmFtZSkudmFsdWUgPT09IHNldHRpbmdzLnZhbHVlO1xufTtcblxuY29uc3QgZGlzbWlzcyA9IHN0YXRlID0+ICgpID0+IHtcbiAgICBzYXZlKHN0YXRlKTtcbiAgICBzdGF0ZS5zZXR0aW5ncy5kaXNtaXNzKHN0YXRlLmJhbm5lcik7XG59O1xuXG5jb25zdCBpbml0TGlzdGVuZXIgPSBzdGF0ZSA9PiB7XG4gICAgVFJJR0dFUl9FVkVOVFMuZm9yRWFjaChldiA9PiB7XG4gICAgICAgIHN0YXRlLmJ0bi5hZGRFdmVudExpc3RlbmVyKGV2LCBlID0+IHtcbiAgICAgICAgICAgICghZS5rZXlDb2RlIHx8ICEhflRSSUdHRVJfS0VZQ09ERVMuaW5kZXhPZihlLmtleUNvZGUpKSAmJiBkaXNtaXNzKHN0YXRlKSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IChzZWwsIHNldHRpbmdzKSA9PiB7XG4gICAgbGV0IGJhbm5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsKTtcbiAgICBpZihzZXR0aW5ncy50eXBlICE9PSAnY29va2llJyAmJiB3aW5kb3dbc2V0dGluZ3MudHlwZV0gPT0gdW5kZWZpbmVkKSByZXR1cm4gY29uc29sZS53YXJuKGBCcm93c2VyIGRvZXMgbm90IHN1cG9ydCAke3NldHRpbmdzLnR5cGV9YCk7XG5cbiAgICBpZighY2hlY2soc2V0dGluZ3MpKSB7XG4gICAgICAgIGJhbm5lciAmJiBiYW5uZXIuY2xhc3NMaXN0LnJlbW92ZShzZXR0aW5ncy5oaWRkZW5CYW5uZXIpO1xuICAgICAgICAhYmFubmVyICYmIGRvY3VtZW50LmJvZHkuZmlyc3RFbGVtZW50Q2hpbGQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmViZWdpbicsIHNldHRpbmdzLnRlbXBsYXRlKHNlbCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmKCEhYmFubmVyKSBiYW5uZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChiYW5uZXIpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IHN0YXRlID0ge1xuICAgICAgICBzZXR0aW5ncyxcbiAgICAgICAgYmFubmVyOiBiYW5uZXIgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWwpLFxuICAgICAgICBidG46IChiYW5uZXIgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWwpKS5xdWVyeVNlbGVjdG9yKHNldHRpbmdzLmNsb3NlQnRuU2VsZWN0b3IpXG4gICAgfTtcbiAgICBzdGF0ZS5idG4gJiYgaW5pdExpc3RlbmVyKHN0YXRlKTtcbiAgICBcbiAgICByZXR1cm4geyBkaXNtaXNzOiBkaXNtaXNzKHN0YXRlKSB9O1xufTsiLCJleHBvcnQgY29uc3Qgd3JpdGVDb29raWUgPSBzdGF0ZSA9PiBbXG4gICAgYCR7c3RhdGUuc2V0dGluZ3MubmFtZX09JHtzdGF0ZS5zZXR0aW5ncy52YWx1ZX07YCxcbiAgICBgZXhwaXJlcz0keyhuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSArIChzdGF0ZS5zZXR0aW5ncy5jb29raWUuZXhwaXJ5KjI0KjYwKjYwKjEwMDApKSkudG9HTVRTdHJpbmcoKX07YCxcbiAgICBgcGF0aD0ke3N0YXRlLnNldHRpbmdzLmNvb2tpZS5wYXRofTtgLFxuICAgIHN0YXRlLnNldHRpbmdzLmNvb2tpZS5kb21haW4gPyBgZG9tYWluPSR7c3RhdGUuc2V0dGluZ3MuY29va2llLmRvbWFpbn1gIDogJycsXG4gICAgc3RhdGUuc2V0dGluZ3MuY29va2llLnNlY3VyZSA/IGBzZWN1cmU9JHtzdGF0ZS5zZXR0aW5ncy5jb29raWUuc2VjdXJlfWAgOiAnJ1xuXS5qb2luKCcnKTtcblxuZXhwb3J0IGNvbnN0IGdldENvb2tpZSA9IG5hbWUgPT4gIGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOyAnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcChwYXJ0ID0+ICh7IG5hbWU6IHBhcnQuc3BsaXQoJz0nKVswXSwgdmFsdWU6IHBhcnQuc3BsaXQoJz0nKVsxXSB9KSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIocGFydCA9PiBwYXJ0Lm5hbWUgPT09IG5hbWUpWzBdOyJdfQ==
