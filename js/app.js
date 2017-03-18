(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _stormBanner = require('./libs/storm-banner');

var _stormBanner2 = _interopRequireDefault(_stormBanner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onDOMContentLoadedTasks = [function () {
    _stormBanner2.default.init('.js-banner');
}];

if ('addEventListener' in window) window.addEventListener('DOMContentLoaded', function () {
    onDOMContentLoadedTasks.forEach(function (fn) {
        return fn();
    });
});

},{"./libs/storm-banner":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * @name storm-banner: 
 * @version 0.1.0: Sat, 18 Mar 2017 21:05:18 GMT
 * @author stormid
 * @license MIT
 */
var defaults = {
	closeBtnSelector: '.js-banner__close',
	offClassName: 'off--banner',
	storageType: 'local',
	storageName: 'banner',
	storageValue: 'acknowledged',
	callback: null
};

var StormBanner = {
	init: function init() {
		if (!this.test()) return;

		window[this.settings.storageType + 'Storage'].getItem(this.settings.storageName) !== this.settings.storageValue && this.show();

		return this;
	},
	test: function test() {
		return window[this.settings.storageType + 'Storage'] !== 'undefined';
	},
	show: function show() {
		this.node.classList.remove(this.settings.offClassName);
		this.node.querySelector(this.settings.closeBtnSelector).addEventListener('click', this.hide.bind(this));
	},
	hide: function hide() {
		window[this.settings.storageType + 'Storage'].setItem(this.settings.storageName, this.settings.storageValue);
		this.node.parentNode.removeChild(this.node);
		!!(this.settings.callback && this.settings.callback.constructor && this.settings.callback.call && this.settings.callback.apply) && this.settings.callback.call(this);
	}
};

var init = function init(sel, opts) {
	var els = [].slice.call(document.querySelectorAll(sel));
	//let els = Array.from(document.querySelectorAll(sel));

	if (!els.length) throw new Error('Banner cannot be initialised, no augmentable elements found');

	return els.map(function (el) {
		return Object.assign(Object.create(StormBanner), {
			node: el,
			settings: Object.assign({}, defaults, opts)
		}).init();
	});
};

exports.default = { init: init };

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlL3NyYy9hcHAuanMiLCJleGFtcGxlL3NyYy9saWJzL3N0b3JtLWJhbm5lci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7OztBQUVBLElBQU0sMEJBQTBCLENBQUMsWUFBTTtBQUNuQywwQkFBTyxJQUFQLENBQVksWUFBWjtBQUNILENBRitCLENBQWhDOztBQUlBLElBQUcsc0JBQXNCLE1BQXpCLEVBQWlDLE9BQU8sZ0JBQVAsQ0FBd0Isa0JBQXhCLEVBQTRDLFlBQU07QUFBRSw0QkFBd0IsT0FBeEIsQ0FBZ0MsVUFBQyxFQUFEO0FBQUEsZUFBUSxJQUFSO0FBQUEsS0FBaEM7QUFBZ0QsQ0FBcEc7Ozs7Ozs7O0FDTmpDOzs7Ozs7QUFNQSxJQUFNLFdBQVc7QUFDaEIsbUJBQWtCLG1CQURGO0FBRWhCLGVBQWMsYUFGRTtBQUdoQixjQUFhLE9BSEc7QUFJaEIsY0FBYSxRQUpHO0FBS2hCLGVBQWMsY0FMRTtBQU1oQixXQUFVO0FBTk0sQ0FBakI7O0FBU0EsSUFBTSxjQUFjO0FBQ25CLEtBRG1CLGtCQUNaO0FBQ04sTUFBRyxDQUFDLEtBQUssSUFBTCxFQUFKLEVBQWlCOztBQUVqQixTQUFVLEtBQUssUUFBTCxDQUFjLFdBQXhCLGNBQThDLE9BQTlDLENBQXNELEtBQUssUUFBTCxDQUFjLFdBQXBFLE1BQXFGLEtBQUssUUFBTCxDQUFjLFlBQW5HLElBQW1ILEtBQUssSUFBTCxFQUFuSDs7QUFFQSxTQUFPLElBQVA7QUFDQSxFQVBrQjtBQVFuQixLQVJtQixrQkFRYjtBQUNMLFNBQU8sT0FBVSxLQUFLLFFBQUwsQ0FBYyxXQUF4QixrQkFBa0QsV0FBekQ7QUFDQSxFQVZrQjtBQVduQixLQVhtQixrQkFXYjtBQUNMLE9BQUssSUFBTCxDQUFVLFNBQVYsQ0FBb0IsTUFBcEIsQ0FBMkIsS0FBSyxRQUFMLENBQWMsWUFBekM7QUFDTSxPQUFLLElBQUwsQ0FBVSxhQUFWLENBQXdCLEtBQUssUUFBTCxDQUFjLGdCQUF0QyxFQUF3RCxnQkFBeEQsQ0FBeUUsT0FBekUsRUFBa0YsS0FBSyxJQUFMLENBQVUsSUFBVixDQUFlLElBQWYsQ0FBbEY7QUFDTixFQWRrQjtBQWVuQixLQWZtQixrQkFlWjtBQUNBLFNBQVUsS0FBSyxRQUFMLENBQWMsV0FBeEIsY0FBOEMsT0FBOUMsQ0FBc0QsS0FBSyxRQUFMLENBQWMsV0FBcEUsRUFBaUYsS0FBSyxRQUFMLENBQWMsWUFBL0Y7QUFDTixPQUFLLElBQUwsQ0FBVSxVQUFWLENBQXFCLFdBQXJCLENBQWlDLEtBQUssSUFBdEM7QUFDTSxHQUFDLEVBQUUsS0FBSyxRQUFMLENBQWMsUUFBZCxJQUEwQixLQUFLLFFBQUwsQ0FBYyxRQUFkLENBQXVCLFdBQWpELElBQWdFLEtBQUssUUFBTCxDQUFjLFFBQWQsQ0FBdUIsSUFBdkYsSUFBK0YsS0FBSyxRQUFMLENBQWMsUUFBZCxDQUF1QixLQUF4SCxDQUFELElBQW1JLEtBQUssUUFBTCxDQUFjLFFBQWQsQ0FBdUIsSUFBdkIsQ0FBNEIsSUFBNUIsQ0FBbkk7QUFDTjtBQW5Ca0IsQ0FBcEI7O0FBc0JBLElBQU0sT0FBTyxTQUFQLElBQU8sQ0FBQyxHQUFELEVBQU0sSUFBTixFQUFlO0FBQzNCLEtBQUksTUFBTSxHQUFHLEtBQUgsQ0FBUyxJQUFULENBQWMsU0FBUyxnQkFBVCxDQUEwQixHQUExQixDQUFkLENBQVY7QUFDRzs7QUFFSCxLQUFHLENBQUMsSUFBSSxNQUFSLEVBQWdCLE1BQU0sSUFBSSxLQUFKLENBQVUsNkRBQVYsQ0FBTjs7QUFFaEIsUUFBTyxJQUFJLEdBQUosQ0FBUSxjQUFNO0FBQ3BCLFNBQU8sT0FBTyxNQUFQLENBQWMsT0FBTyxNQUFQLENBQWMsV0FBZCxDQUFkLEVBQTBDO0FBQ2hELFNBQU0sRUFEMEM7QUFFaEQsYUFBVSxPQUFPLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLFFBQWxCLEVBQTRCLElBQTVCO0FBRnNDLEdBQTFDLEVBR0osSUFISSxFQUFQO0FBSUEsRUFMTSxDQUFQO0FBTUEsQ0FaRDs7a0JBY2UsRUFBRSxVQUFGLEUiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IEJhbm5lciBmcm9tICcuL2xpYnMvc3Rvcm0tYmFubmVyJztcblxuY29uc3Qgb25ET01Db250ZW50TG9hZGVkVGFza3MgPSBbKCkgPT4ge1xuICAgIEJhbm5lci5pbml0KCcuanMtYmFubmVyJyk7XG59XTtcbiAgICBcbmlmKCdhZGRFdmVudExpc3RlbmVyJyBpbiB3aW5kb3cpIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4geyBvbkRPTUNvbnRlbnRMb2FkZWRUYXNrcy5mb3JFYWNoKChmbikgPT4gZm4oKSk7IH0pOyIsIi8qKlxuICogQG5hbWUgc3Rvcm0tYmFubmVyOiBcbiAqIEB2ZXJzaW9uIDAuMS4wOiBTYXQsIDE4IE1hciAyMDE3IDIxOjA1OjE4IEdNVFxuICogQGF1dGhvciBzdG9ybWlkXG4gKiBAbGljZW5zZSBNSVRcbiAqL1xuY29uc3QgZGVmYXVsdHMgPSB7XG5cdGNsb3NlQnRuU2VsZWN0b3I6ICcuanMtYmFubmVyX19jbG9zZScsXG5cdG9mZkNsYXNzTmFtZTogJ29mZi0tYmFubmVyJyxcblx0c3RvcmFnZVR5cGU6ICdsb2NhbCcsXG5cdHN0b3JhZ2VOYW1lOiAnYmFubmVyJyxcblx0c3RvcmFnZVZhbHVlOiAnYWNrbm93bGVkZ2VkJyxcblx0Y2FsbGJhY2s6IG51bGxcbn07XG5cbmNvbnN0IFN0b3JtQmFubmVyID0ge1xuXHRpbml0KCkge1xuXHRcdGlmKCF0aGlzLnRlc3QoKSkgcmV0dXJuO1xuXHRcdFxuXHRcdHdpbmRvd1tgJHt0aGlzLnNldHRpbmdzLnN0b3JhZ2VUeXBlfVN0b3JhZ2VgXS5nZXRJdGVtKHRoaXMuc2V0dGluZ3Muc3RvcmFnZU5hbWUpICE9PSB0aGlzLnNldHRpbmdzLnN0b3JhZ2VWYWx1ZSAmJiB0aGlzLnNob3coKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXHR0ZXN0KCl7XG5cdFx0cmV0dXJuIHdpbmRvd1tgJHt0aGlzLnNldHRpbmdzLnN0b3JhZ2VUeXBlfVN0b3JhZ2VgXSAhPT0gJ3VuZGVmaW5lZCc7XG5cdH0sXG5cdHNob3coKXtcblx0XHR0aGlzLm5vZGUuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLnNldHRpbmdzLm9mZkNsYXNzTmFtZSk7XG4gICAgICAgIHRoaXMubm9kZS5xdWVyeVNlbGVjdG9yKHRoaXMuc2V0dGluZ3MuY2xvc2VCdG5TZWxlY3RvcikuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhpZGUuYmluZCh0aGlzKSk7XG5cdH0sXG5cdGhpZGUoKSB7XG4gICAgICAgIHdpbmRvd1tgJHt0aGlzLnNldHRpbmdzLnN0b3JhZ2VUeXBlfVN0b3JhZ2VgXS5zZXRJdGVtKHRoaXMuc2V0dGluZ3Muc3RvcmFnZU5hbWUsIHRoaXMuc2V0dGluZ3Muc3RvcmFnZVZhbHVlKTtcblx0XHR0aGlzLm5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLm5vZGUpO1xuICAgICAgICAhISh0aGlzLnNldHRpbmdzLmNhbGxiYWNrICYmIHRoaXMuc2V0dGluZ3MuY2FsbGJhY2suY29uc3RydWN0b3IgJiYgdGhpcy5zZXR0aW5ncy5jYWxsYmFjay5jYWxsICYmIHRoaXMuc2V0dGluZ3MuY2FsbGJhY2suYXBwbHkpICYmIHRoaXMuc2V0dGluZ3MuY2FsbGJhY2suY2FsbCh0aGlzKTtcblx0fVxufTtcblxuY29uc3QgaW5pdCA9IChzZWwsIG9wdHMpID0+IHtcblx0bGV0IGVscyA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWwpKTtcbiAgICAvL2xldCBlbHMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsKSk7XG5cblx0aWYoIWVscy5sZW5ndGgpIHRocm93IG5ldyBFcnJvcignQmFubmVyIGNhbm5vdCBiZSBpbml0aWFsaXNlZCwgbm8gYXVnbWVudGFibGUgZWxlbWVudHMgZm91bmQnKTtcbiAgICBcblx0cmV0dXJuIGVscy5tYXAoZWwgPT4ge1xuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKE9iamVjdC5jcmVhdGUoU3Rvcm1CYW5uZXIpLCB7XG5cdFx0XHRub2RlOiBlbCxcblx0XHRcdHNldHRpbmdzOiBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgb3B0cylcblx0XHR9KS5pbml0KCk7XG5cdH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgeyBpbml0IH07Il19
