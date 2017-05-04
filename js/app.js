(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _component = require('./libs/component/');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var onDOMContentLoadedTasks = [function () {
    _component2.default.init('.js-banner');
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

var _defaults = require('./libs/defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _componentPrototype = require('./libs/component-prototype');

var _componentPrototype2 = _interopRequireDefault(_componentPrototype);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var init = function init(sel, opts) {
	var els = [].slice.call(document.querySelectorAll(sel));
	//let els = Array.from(document.querySelectorAll(sel));

	if (!els.length) throw new Error('Banner cannot be initialised, no augmentable elements found');

	return els.map(function (el) {
		return Object.assign(Object.create(_componentPrototype2.default), {
			node: el,
			settings: Object.assign({}, _defaults2.default, opts),
			triggerEvent: window.PointerEvent ? 'pointerdown' : 'ontouchstart' in window ? 'touchstart' : 'click'
		}).init();
	});
};

exports.default = { init: init };

},{"./libs/component-prototype":3,"./libs/defaults":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	init: function init() {
		if (!this.test()) return;

		window[this.settings.storageType + 'Storage'].getItem(this.settings.storageName) !== this.settings.storageValue && this.show();

		return this;
	},
	test: function test() {
		return window[this.settings.storageType + 'Storage'] !== undefined;
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

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	closeBtnSelector: '.js-banner__close',
	offClassName: 'off--banner',
	storageType: 'local',
	storageName: 'banner',
	storageValue: 'acknowledged',
	callback: null
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlL3NyYy9hcHAuanMiLCJleGFtcGxlL3NyYy9saWJzL2NvbXBvbmVudC9pbmRleC5qcyIsImV4YW1wbGUvc3JjL2xpYnMvY29tcG9uZW50L2xpYnMvY29tcG9uZW50LXByb3RvdHlwZS5qcyIsImV4YW1wbGUvc3JjL2xpYnMvY29tcG9uZW50L2xpYnMvZGVmYXVsdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7OztBQUVBLElBQU0sMkJBQTJCLFlBQU0sQUFDbkM7d0JBQUEsQUFBTyxLQUFQLEFBQVksQUFDZjtBQUZELEFBQWdDLENBQUE7O0FBSWhDLElBQUcsc0JBQUgsQUFBeUIsZUFBUSxBQUFPLGlCQUFQLEFBQXdCLG9CQUFvQixZQUFNLEFBQUU7NEJBQUEsQUFBd0IsUUFBUSxVQUFBLEFBQUMsSUFBRDtlQUFBLEFBQVE7QUFBeEMsQUFBZ0Q7QUFBcEcsQ0FBQTs7Ozs7Ozs7O0FDTmpDOzs7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBTSxPQUFPLFNBQVAsQUFBTyxLQUFBLEFBQUMsS0FBRCxBQUFNLE1BQVMsQUFDM0I7S0FBSSxNQUFNLEdBQUEsQUFBRyxNQUFILEFBQVMsS0FBSyxTQUFBLEFBQVMsaUJBQWpDLEFBQVUsQUFBYyxBQUEwQixBQUMvQztBQUVIOztLQUFHLENBQUMsSUFBSixBQUFRLFFBQVEsTUFBTSxJQUFBLEFBQUksTUFBVixBQUFNLEFBQVUsQUFFaEM7O1lBQU8sQUFBSSxJQUFJLGNBQU0sQUFDcEI7Z0JBQU8sQUFBTyxPQUFPLE9BQUEsQUFBTyw0QkFBckI7U0FBaUQsQUFDakQsQUFDTjthQUFVLE9BQUEsQUFBTyxPQUFQLEFBQWMsd0JBRitCLEFBRTdDLEFBQTRCLEFBQ3RDO2lCQUFjLE9BQUEsQUFBTyxlQUFQLEFBQXNCLGdCQUFnQixrQkFBQSxBQUFrQixTQUFsQixBQUEyQixlQUh6RSxBQUFpRCxBQUd1QztBQUh2QyxBQUN2RCxHQURNLEVBQVAsQUFBTyxBQUlKLEFBQ0g7QUFORCxBQUFPLEFBT1AsRUFQTztBQU5SOztrQkFlZSxFQUFFLE0sQUFBRjs7Ozs7Ozs7O0FDbEJBLHVCQUNQLEFBQ047TUFBRyxDQUFDLEtBQUosQUFBSSxBQUFLLFFBQVEsQUFFakI7O1NBQVUsS0FBQSxBQUFLLFNBQWYsQUFBd0IseUJBQXhCLEFBQThDLFFBQVEsS0FBQSxBQUFLLFNBQTNELEFBQW9FLGlCQUFpQixLQUFBLEFBQUssU0FBMUYsQUFBbUcsZ0JBQWdCLEtBQW5ILEFBQW1ILEFBQUssQUFFeEg7O1NBQUEsQUFBTyxBQUNQO0FBUGEsQUFRZDtBQVJjLHVCQVFSLEFBQ0w7U0FBTyxPQUFVLEtBQUEsQUFBSyxTQUFmLEFBQXdCLDZCQUEvQixBQUF5RCxBQUN6RDtBQVZhLEFBV2Q7QUFYYyx1QkFXUixBQUNMO09BQUEsQUFBSyxLQUFMLEFBQVUsVUFBVixBQUFvQixPQUFPLEtBQUEsQUFBSyxTQUFoQyxBQUF5QyxBQUNuQztPQUFBLEFBQUssS0FBTCxBQUFVLGNBQWMsS0FBQSxBQUFLLFNBQTdCLEFBQXNDLGtCQUF0QyxBQUF3RCxpQkFBeEQsQUFBeUUsU0FBUyxLQUFBLEFBQUssS0FBTCxBQUFVLEtBQTVGLEFBQWtGLEFBQWUsQUFDdkc7QUFkYSxBQWVkO0FBZmMsdUJBZVAsQUFDQTtTQUFVLEtBQUEsQUFBSyxTQUFmLEFBQXdCLHlCQUF4QixBQUE4QyxRQUFRLEtBQUEsQUFBSyxTQUEzRCxBQUFvRSxhQUFhLEtBQUEsQUFBSyxTQUF0RixBQUErRixBQUNyRztPQUFBLEFBQUssS0FBTCxBQUFVLFdBQVYsQUFBcUIsWUFBWSxLQUFqQyxBQUFzQyxBQUNoQztHQUFDLEVBQUUsS0FBQSxBQUFLLFNBQUwsQUFBYyxZQUFZLEtBQUEsQUFBSyxTQUFMLEFBQWMsU0FBeEMsQUFBaUQsZUFBZSxLQUFBLEFBQUssU0FBTCxBQUFjLFNBQTlFLEFBQXVGLFFBQVEsS0FBQSxBQUFLLFNBQUwsQUFBYyxTQUFoSCxBQUFDLEFBQXdILFVBQVUsS0FBQSxBQUFLLFNBQUwsQUFBYyxTQUFkLEFBQXVCLEtBQTFKLEFBQW1JLEFBQTRCLEFBQ3JLO0EsQUFuQmE7QUFBQSxBQUNkOzs7Ozs7Ozs7bUJDRGMsQUFDSSxBQUNsQjtlQUZjLEFBRUEsQUFDZDtjQUhjLEFBR0QsQUFDYjtjQUpjLEFBSUQsQUFDYjtlQUxjLEFBS0EsQUFDZDtXLEFBTmMsQUFNSjtBQU5JLEFBQ2QiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IEJhbm5lciBmcm9tICcuL2xpYnMvY29tcG9uZW50Lyc7XG5cbmNvbnN0IG9uRE9NQ29udGVudExvYWRlZFRhc2tzID0gWygpID0+IHtcbiAgICBCYW5uZXIuaW5pdCgnLmpzLWJhbm5lcicpO1xufV07XG4gICAgXG5pZignYWRkRXZlbnRMaXN0ZW5lcicgaW4gd2luZG93KSB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHsgb25ET01Db250ZW50TG9hZGVkVGFza3MuZm9yRWFjaCgoZm4pID0+IGZuKCkpOyB9KTsiLCJpbXBvcnQgZGVmYXVsdHMgZnJvbSAnLi9saWJzL2RlZmF1bHRzJztcbmltcG9ydCBjb21wb25lbnRQcm90b3R5cGUgZnJvbSAnLi9saWJzL2NvbXBvbmVudC1wcm90b3R5cGUnO1xuXG5jb25zdCBpbml0ID0gKHNlbCwgb3B0cykgPT4ge1xuXHRsZXQgZWxzID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbCkpO1xuICAgIC8vbGV0IGVscyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWwpKTtcblxuXHRpZighZWxzLmxlbmd0aCkgdGhyb3cgbmV3IEVycm9yKCdCYW5uZXIgY2Fubm90IGJlIGluaXRpYWxpc2VkLCBubyBhdWdtZW50YWJsZSBlbGVtZW50cyBmb3VuZCcpO1xuICAgIFxuXHRyZXR1cm4gZWxzLm1hcChlbCA9PiB7XG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oT2JqZWN0LmNyZWF0ZShjb21wb25lbnRQcm90b3R5cGUpLCB7XG5cdFx0XHRub2RlOiBlbCxcblx0XHRcdHNldHRpbmdzOiBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgb3B0cyksXG5cdFx0XHR0cmlnZ2VyRXZlbnQ6IHdpbmRvdy5Qb2ludGVyRXZlbnQgPyAncG9pbnRlcmRvd24nIDogJ29udG91Y2hzdGFydCcgaW4gd2luZG93ID8gJ3RvdWNoc3RhcnQnIDogJ2NsaWNrJ1xuXHRcdH0pLmluaXQoKTtcblx0fSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7IGluaXQgfTsiLCJleHBvcnQgZGVmYXVsdCB7XG5cdGluaXQoKSB7XG5cdFx0aWYoIXRoaXMudGVzdCgpKSByZXR1cm47XG5cdFx0XG5cdFx0d2luZG93W2Ake3RoaXMuc2V0dGluZ3Muc3RvcmFnZVR5cGV9U3RvcmFnZWBdLmdldEl0ZW0odGhpcy5zZXR0aW5ncy5zdG9yYWdlTmFtZSkgIT09IHRoaXMuc2V0dGluZ3Muc3RvcmFnZVZhbHVlICYmIHRoaXMuc2hvdygpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cdHRlc3QoKXtcblx0XHRyZXR1cm4gd2luZG93W2Ake3RoaXMuc2V0dGluZ3Muc3RvcmFnZVR5cGV9U3RvcmFnZWBdICE9PSB1bmRlZmluZWQ7XG5cdH0sXG5cdHNob3coKXtcblx0XHR0aGlzLm5vZGUuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLnNldHRpbmdzLm9mZkNsYXNzTmFtZSk7XG4gICAgICAgIHRoaXMubm9kZS5xdWVyeVNlbGVjdG9yKHRoaXMuc2V0dGluZ3MuY2xvc2VCdG5TZWxlY3RvcikuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhpZGUuYmluZCh0aGlzKSk7XG5cdH0sXG5cdGhpZGUoKSB7XG4gICAgICAgIHdpbmRvd1tgJHt0aGlzLnNldHRpbmdzLnN0b3JhZ2VUeXBlfVN0b3JhZ2VgXS5zZXRJdGVtKHRoaXMuc2V0dGluZ3Muc3RvcmFnZU5hbWUsIHRoaXMuc2V0dGluZ3Muc3RvcmFnZVZhbHVlKTtcblx0XHR0aGlzLm5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLm5vZGUpO1xuICAgICAgICAhISh0aGlzLnNldHRpbmdzLmNhbGxiYWNrICYmIHRoaXMuc2V0dGluZ3MuY2FsbGJhY2suY29uc3RydWN0b3IgJiYgdGhpcy5zZXR0aW5ncy5jYWxsYmFjay5jYWxsICYmIHRoaXMuc2V0dGluZ3MuY2FsbGJhY2suYXBwbHkpICYmIHRoaXMuc2V0dGluZ3MuY2FsbGJhY2suY2FsbCh0aGlzKTtcblx0fVxufTsiLCJleHBvcnQgZGVmYXVsdCB7XG5cdGNsb3NlQnRuU2VsZWN0b3I6ICcuanMtYmFubmVyX19jbG9zZScsXG5cdG9mZkNsYXNzTmFtZTogJ29mZi0tYmFubmVyJyxcblx0c3RvcmFnZVR5cGU6ICdsb2NhbCcsXG5cdHN0b3JhZ2VOYW1lOiAnYmFubmVyJyxcblx0c3RvcmFnZVZhbHVlOiAnYWNrbm93bGVkZ2VkJyxcblx0Y2FsbGJhY2s6IG51bGxcbn07Il19
