(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlL3NyYy9hcHAuanMiLCJleGFtcGxlL3NyYy9saWJzL2NvbXBvbmVudC9pbmRleC5qcyIsImV4YW1wbGUvc3JjL2xpYnMvY29tcG9uZW50L2xpYi9jb25zdGFudHMuanMiLCJleGFtcGxlL3NyYy9saWJzL2NvbXBvbmVudC9saWIvZGVmYXVsdHMuanMiLCJleGFtcGxlL3NyYy9saWJzL2NvbXBvbmVudC9saWIvaW5kZXguanMiLCJleGFtcGxlL3NyYy9saWJzL2NvbXBvbmVudC9saWIvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLElBQUEsYUFBQSxRQUFBLG1CQUFBLENBQUE7Ozs7Ozs7O0FBRUEsSUFBTSwwQkFBMEIsQ0FBQyxZQUFNO0FBQ25DLFdBQUEseUJBQUEsR0FBbUMsWUFBQSxPQUFBLENBQUEsSUFBQSxDQUFuQyxZQUFtQyxDQUFuQztBQUNBLFlBQUEsR0FBQSxDQUFZLE9BQVoseUJBQUE7QUFGSixDQUFnQyxDQUFoQzs7QUFLQSxJQUFHLHNCQUFILE1BQUEsRUFBaUMsT0FBQSxnQkFBQSxDQUFBLGtCQUFBLEVBQTRDLFlBQU07QUFBRSw0QkFBQSxPQUFBLENBQWdDLFVBQUEsRUFBQSxFQUFBO0FBQUEsZUFBQSxJQUFBO0FBQWhDLEtBQUE7QUFBcEQsQ0FBQTs7Ozs7Ozs7O0FDUGpDLElBQUEsWUFBQSxRQUFBLGdCQUFBLENBQUE7Ozs7QUFDQSxJQUFBLE9BQUEsUUFBQSxPQUFBLENBQUE7Ozs7Ozs7O0FBRUEsSUFBTSxPQUFPLFNBQVAsSUFBTyxDQUFBLEdBQUEsRUFBQSxJQUFBLEVBQWU7QUFDM0IsUUFBTyxPQUFBLE1BQUEsQ0FBQSxFQUFBLEVBQWtCLENBQUEsR0FBQSxNQUFBLE9BQUEsRUFBQSxHQUFBLEVBQWEsT0FBQSxNQUFBLENBQUEsRUFBQSxFQUFrQixXQUFsQixPQUFBLEVBQXRDLElBQXNDLENBQWIsQ0FBbEIs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QUF3QixNQUFBLFFBQUEsQ0FBQSxNQUFBLENBQUEsTUFBQSxHQUFBLEVBQUEsR0FBQSxFQUFBLEdBQUEsRUFBQSxHQUFsQyxJQUFDLEVBRm9CLFdBRXBCLEVBRm9CLEdBQUEsR0FBQSxFQUFBLFVBR3hCLE1BQUEsUUFBQSxDQUFBLE1BQUEsQ0FId0IsSUFBQSxHQUFBLEdBQUEsRUFJaEMsTUFBQSxRQUFBLENBQUEsTUFBQSxDQUFBLE1BQUEsR0FBQSxZQUF5QyxNQUFBLFFBQUEsQ0FBQSxNQUFBLENBQXpDLE1BQUEsR0FKZ0MsRUFBQSxFQUtoQyxNQUFBLFFBQUEsQ0FBQSxNQUFBLENBQUEsTUFBQSxHQUFBLFlBQXlDLE1BQUEsUUFBQSxDQUFBLE1BQUEsQ0FBekMsTUFBQSxHQUxnQyxFQUFBLEVBQUEsSUFBQSxDQUFULEVBQVMsQ0FBVDtBQUFwQixDQUFBOztBQVFBLElBQU0sWUFBQSxRQUFBLFNBQUEsR0FBWSxTQUFaLFNBQVksQ0FBQSxJQUFBLEVBQUE7QUFBQSxXQUFTLFNBQUEsTUFBQSxDQUFBLEtBQUEsQ0FBQSxJQUFBLEVBQUEsR0FBQSxDQUNPLFVBQUEsSUFBQSxFQUFBO0FBQUEsZUFBUyxFQUFFLE1BQU0sS0FBQSxLQUFBLENBQUEsR0FBQSxFQUFSLENBQVEsQ0FBUixFQUE0QixPQUFPLEtBQUEsS0FBQSxDQUFBLEdBQUEsRUFBNUMsQ0FBNEMsQ0FBbkMsRUFBVDtBQURQLEtBQUEsRUFBQSxNQUFBLENBRVUsVUFBQSxJQUFBLEVBQUE7QUFBQSxlQUFRLEtBQUEsSUFBQSxLQUFSLElBQUE7QUFGVixLQUFBLEVBQVQsQ0FBUyxDQUFUO0FBQWxCLENBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgQmFubmVyIGZyb20gJy4vbGlicy9jb21wb25lbnQvJztcblxuY29uc3Qgb25ET01Db250ZW50TG9hZGVkVGFza3MgPSBbKCkgPT4ge1xuICAgIHdpbmRvdy5fX1NUT1JNSURfQ09PS0lFX0JBTk5FUl9fID0gQmFubmVyLmluaXQoJy5qcy1iYW5uZXInKTtcbiAgICBjb25zb2xlLmxvZyh3aW5kb3cuX19TVE9STUlEX0NPT0tJRV9CQU5ORVJfXyk7XG59XTtcbiAgICBcbmlmKCdhZGRFdmVudExpc3RlbmVyJyBpbiB3aW5kb3cpIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4geyBvbkRPTUNvbnRlbnRMb2FkZWRUYXNrcy5mb3JFYWNoKChmbikgPT4gZm4oKSk7IH0pOyIsImltcG9ydCBkZWZhdWx0cyBmcm9tICcuL2xpYi9kZWZhdWx0cyc7XG5pbXBvcnQgZmFjdG9yeSBmcm9tICcuL2xpYic7XG5cbmNvbnN0IGluaXQgPSAoc2VsLCBvcHRzKSA9PiB7XG5cdHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBmYWN0b3J5KHNlbCwgT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIG9wdHMpKSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7IGluaXQgfTsiLCJleHBvcnQgY29uc3QgVFJJR0dFUl9FVkVOVFMgPSAgWydvbnRvdWNoZW5kJyBpbiB3aW5kb3cgPyAndG91Y2hlbmQnIDogJ2NsaWNrJywgJ2tleXVwJ107XG5cbmV4cG9ydCBjb25zdCBUUklHR0VSX0tFWUNPREVTID0gWzEzLCAzMl07IiwiZXhwb3J0IGRlZmF1bHQge1xuXHRjbG9zZUJ0blNlbGVjdG9yOiAnLmpzLWJhbm5lcl9fY2xvc2UnLFxuXHRoaWRkZW5CYW5uZXI6ICdvZmYtLWJhbm5lcicsXG5cdHRlbXBsYXRlKHNlbCl7XG5cdFx0cmV0dXJuIGA8ZGl2JHshIX5zZWwuaW5kZXhPZignIycpID8gYGlkPVwiJHtzZWwuc3Vic3RyKDEpfVwiYCA6ICcnfSBjbGFzcz1cIiR7IX5zZWwuaW5kZXhPZignIycpID8gc2VsLnN1YnN0cigxKSA6ICcnfSBiYW5uZXJcIiByb2xlPVwiZGlhbG9nXCIgYXJpYS1sYWJlbD1cIndlbGNvbWVcIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cImJhbm5lcl9tc2dcIj5cblx0XHRcdFx0XHRXZWxjb21lLiBUaGlzIHNpdGUgdXNlcyBjb29raWVzLiBSZWFkIDxhIGNsYXNzPVwiYmFubmVyX19saW5rXCIgaHJlZj1cIi9pbmZvL2Nvb2tpZXNcIj5vdXIgcG9saWN5PC9hPi5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxidXR0b24gY2xhc3M9XCJiYW5uZXJfX2Nsb3NlIGpzLWJhbm5lcl9fY2xvc2VcIiBhcmlhLWxhYmVsPVwiQ2xvc2UgYmFubmVyXCI+XG5cdFx0XHRcdFx0PHN2ZyBjbGFzcz1cImJhbm5lcl9fY2xvc2UtaWNvblwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjRcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG5cdFx0XHRcdFx0XHQ8cGF0aCBkPVwiTTE5IDYuNDFMMTcuNTkgNSAxMiAxMC41OSA2LjQxIDUgNSA2LjQxIDEwLjU5IDEyIDUgMTcuNTkgNi40MSAxOSAxMiAxMy40MSAxNy41OSAxOSAxOSAxNy41OSAxMy40MSAxMnpcIi8+XG5cdFx0XHRcdFx0XHQ8cGF0aCBkPVwiTTAgMGgyNHYyNEgwelwiIGZpbGw9XCJub25lXCIvPlxuXHRcdFx0XHRcdDwvc3ZnPlxuXHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdDwvZGl2PmA7XG5cdH0sXG5cdGRpc21pc3MoYmFubmVyKXsgYmFubmVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYmFubmVyKTsgfSxcblx0dHlwZTogJ2Nvb2tpZScsLy9sb2NhbFN0b3JhZ2UgfHwgc2Vzc2lvblN0b3JhZ2UgfHwgY29va2llXG5cdG5hbWU6ICdfX1NUT1JNSURfTVNHX18nLFxuXHR2YWx1ZTogJ2Fja25vd2xlZGdlZCcsXG5cdGNvb2tpZToge1xuXHRcdHBhdGg6ICcvJyxcblx0XHRkb21haW46ICcnLFxuXHRcdHNlY3VyZTogJycsXG5cdFx0ZXhwaXJ5OiAzNjVcblx0fSxcblx0Y2FsbGJhY2s6IG51bGwvL2Jhbm5lciBub2RlIHBhc3NlZCB0byBhIGNhbGxiYWNrXG59OyIsImltcG9ydCB7IFRSSUdHRVJfRVZFTlRTLCBUUklHR0VSX0tFWUNPREVTIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgaCwgZ2V0Q29va2llLCB3cml0ZUNvb2tpZSB9IGZyb20gJy4vdXRpbHMnO1xuXG5jb25zdCBzYXZlID0gc3RhdGUgPT4ge1xuICAgIGlmKHN0YXRlLnNldHRpbmdzLnR5cGUgPT09ICdjb29raWUnKSByZXR1cm4gZG9jdW1lbnQuY29va2llID0gd3JpdGVDb29raWUoc3RhdGUpO1xuICAgIGVsc2Ugd2luZG93W3N0YXRlLnNldHRpbmdzLnR5cGVdLnNldEl0ZW0oc3RhdGUuc2V0dGluZ3MubmFtZSwgc3RhdGUuc2V0dGluZ3MudmFsdWUpO1xufTtcblxuY29uc3QgY2hlY2sgPSBzZXR0aW5ncyA9PiB7XG4gICAgc2V0dGluZ3MgPSBzZXR0aW5ncyB8fCBzdGF0ZS5zZXR0aW5ncztcbiAgICBpZihzZXR0aW5ncy50eXBlICE9PSAnY29va2llJykgcmV0dXJuIHdpbmRvd1tzZXR0aW5ncy50eXBlXS5nZXRJdGVtKHNldHRpbmdzLm5hbWUpID09PSBzZXR0aW5ncy52YWx1ZTtcbiAgICBlbHNlIHJldHVybiBnZXRDb29raWUoc2V0dGluZ3MubmFtZSkgJiYgZ2V0Q29va2llKHNldHRpbmdzLm5hbWUpLnZhbHVlID09PSBzZXR0aW5ncy52YWx1ZTtcbn07XG5cbmNvbnN0IGRpc21pc3MgPSBzdGF0ZSA9PiAoKSA9PiB7XG4gICAgc2F2ZShzdGF0ZSk7XG4gICAgc3RhdGUuc2V0dGluZ3MuZGlzbWlzcyhzdGF0ZS5iYW5uZXIpO1xufTtcblxuY29uc3QgaW5pdExpc3RlbmVyID0gc3RhdGUgPT4ge1xuICAgIFRSSUdHRVJfRVZFTlRTLmZvckVhY2goZXYgPT4ge1xuICAgICAgICBzdGF0ZS5idG4uYWRkRXZlbnRMaXN0ZW5lcihldiwgZSA9PiB7XG4gICAgICAgICAgICAoIWUua2V5Q29kZSB8fCAhIX5UUklHR0VSX0tFWUNPREVTLmluZGV4T2YoZS5rZXlDb2RlKSkgJiYgZGlzbWlzcyhzdGF0ZSkoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCAoc2VsLCBzZXR0aW5ncykgPT4ge1xuICAgIGxldCBiYW5uZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbCk7XG4gICAgaWYoc2V0dGluZ3MudHlwZSAhPT0gJ2Nvb2tpZScgJiYgd2luZG93W3NldHRpbmdzLnR5cGVdID09IHVuZGVmaW5lZCkgcmV0dXJuIGNvbnNvbGUud2FybihgQnJvd3NlciBkb2VzIG5vdCBzdXBvcnQgJHtzZXR0aW5ncy50eXBlfWApO1xuXG4gICAgaWYoIWNoZWNrKHNldHRpbmdzKSkge1xuICAgICAgICBiYW5uZXIgJiYgYmFubmVyLmNsYXNzTGlzdC5yZW1vdmUoc2V0dGluZ3MuaGlkZGVuQmFubmVyKTtcbiAgICAgICAgIWJhbm5lciAmJiBkb2N1bWVudC5ib2R5LmZpcnN0RWxlbWVudENoaWxkLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlYmVnaW4nLCBzZXR0aW5ncy50ZW1wbGF0ZShzZWwpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBpZighIWJhbm5lcikgYmFubmVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYmFubmVyKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBzdGF0ZSA9IHtcbiAgICAgICAgc2V0dGluZ3MsXG4gICAgICAgIGJhbm5lcjogYmFubmVyIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsKSxcbiAgICAgICAgYnRuOiAoYmFubmVyIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsKSkucXVlcnlTZWxlY3RvcihzZXR0aW5ncy5jbG9zZUJ0blNlbGVjdG9yKVxuICAgIH07XG4gICAgc3RhdGUuYnRuICYmIGluaXRMaXN0ZW5lcihzdGF0ZSk7XG4gICAgXG4gICAgcmV0dXJuIHsgZGlzbWlzczogZGlzbWlzcyhzdGF0ZSkgfTtcbn07IiwiZXhwb3J0IGNvbnN0IHdyaXRlQ29va2llID0gc3RhdGUgPT4gW1xuICAgIGAke3N0YXRlLnNldHRpbmdzLm5hbWV9PSR7c3RhdGUuc2V0dGluZ3MudmFsdWV9O2AsXG4gICAgYGV4cGlyZXM9JHsobmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkgKyAoc3RhdGUuc2V0dGluZ3MuY29va2llLmV4cGlyeSoyNCo2MCo2MCoxMDAwKSkpLnRvR01UU3RyaW5nKCl9O2AsXG4gICAgYHBhdGg9JHtzdGF0ZS5zZXR0aW5ncy5jb29raWUucGF0aH07YCxcbiAgICBzdGF0ZS5zZXR0aW5ncy5jb29raWUuZG9tYWluID8gYGRvbWFpbj0ke3N0YXRlLnNldHRpbmdzLmNvb2tpZS5kb21haW59YCA6ICcnLFxuICAgIHN0YXRlLnNldHRpbmdzLmNvb2tpZS5zZWN1cmUgPyBgc2VjdXJlPSR7c3RhdGUuc2V0dGluZ3MuY29va2llLnNlY3VyZX1gIDogJydcbl0uam9pbignJyk7XG5cbmV4cG9ydCBjb25zdCBnZXRDb29raWUgPSBuYW1lID0+ICBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsgJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAocGFydCA9PiAoeyBuYW1lOiBwYXJ0LnNwbGl0KCc9JylbMF0sIHZhbHVlOiBwYXJ0LnNwbGl0KCc9JylbMV0gfSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKHBhcnQgPT4gcGFydC5uYW1lID09PSBuYW1lKVswXTsiXX0=
