(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _component = require('./libs/component/');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlL3NyYy9hcHAuanMiLCJleGFtcGxlL3NyYy9saWJzL2NvbXBvbmVudC9pbmRleC5qcyIsImV4YW1wbGUvc3JjL2xpYnMvY29tcG9uZW50L2xpYnMvY29tcG9uZW50LXByb3RvdHlwZS5qcyIsImV4YW1wbGUvc3JjL2xpYnMvY29tcG9uZW50L2xpYnMvZGVmYXVsdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7QUFFQSxJQUFNLDBCQUEwQixDQUFDLFlBQU07QUFDbkMsd0JBQU8sSUFBUCxDQUFZLFlBQVo7QUFDSCxDQUYrQixDQUFoQzs7QUFJQSxJQUFHLHNCQUFzQixNQUF6QixFQUFpQyxPQUFPLGdCQUFQLENBQXdCLGtCQUF4QixFQUE0QyxZQUFNO0FBQUUsNEJBQXdCLE9BQXhCLENBQWdDLFVBQUMsRUFBRDtBQUFBLGVBQVEsSUFBUjtBQUFBLEtBQWhDO0FBQWdELENBQXBHOzs7Ozs7Ozs7QUNOakM7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTSxPQUFPLFNBQVAsSUFBTyxDQUFDLEdBQUQsRUFBTSxJQUFOLEVBQWU7QUFDM0IsS0FBSSxNQUFNLEdBQUcsS0FBSCxDQUFTLElBQVQsQ0FBYyxTQUFTLGdCQUFULENBQTBCLEdBQTFCLENBQWQsQ0FBVjtBQUNHOztBQUVILEtBQUcsQ0FBQyxJQUFJLE1BQVIsRUFBZ0IsTUFBTSxJQUFJLEtBQUosQ0FBVSw2REFBVixDQUFOOztBQUVoQixRQUFPLElBQUksR0FBSixDQUFRLGNBQU07QUFDcEIsU0FBTyxPQUFPLE1BQVAsQ0FBYyxPQUFPLE1BQVAsOEJBQWQsRUFBaUQ7QUFDdkQsU0FBTSxFQURpRDtBQUV2RCxhQUFVLE9BQU8sTUFBUCxDQUFjLEVBQWQsc0JBQTRCLElBQTVCLENBRjZDO0FBR3ZELGlCQUFjLE9BQU8sWUFBUCxHQUFzQixhQUF0QixHQUFzQyxrQkFBa0IsTUFBbEIsR0FBMkIsWUFBM0IsR0FBMEM7QUFIdkMsR0FBakQsRUFJSixJQUpJLEVBQVA7QUFLQSxFQU5NLENBQVA7QUFPQSxDQWJEOztrQkFlZSxFQUFFLFVBQUYsRTs7Ozs7Ozs7a0JDbEJBO0FBQ2QsS0FEYyxrQkFDUDtBQUNOLE1BQUcsQ0FBQyxLQUFLLElBQUwsRUFBSixFQUFpQjs7QUFFakIsU0FBVSxLQUFLLFFBQUwsQ0FBYyxXQUF4QixjQUE4QyxPQUE5QyxDQUFzRCxLQUFLLFFBQUwsQ0FBYyxXQUFwRSxNQUFxRixLQUFLLFFBQUwsQ0FBYyxZQUFuRyxJQUFtSCxLQUFLLElBQUwsRUFBbkg7O0FBRUEsU0FBTyxJQUFQO0FBQ0EsRUFQYTtBQVFkLEtBUmMsa0JBUVI7QUFDTCxTQUFPLE9BQVUsS0FBSyxRQUFMLENBQWMsV0FBeEIsa0JBQWtELFNBQXpEO0FBQ0EsRUFWYTtBQVdkLEtBWGMsa0JBV1I7QUFDTCxPQUFLLElBQUwsQ0FBVSxTQUFWLENBQW9CLE1BQXBCLENBQTJCLEtBQUssUUFBTCxDQUFjLFlBQXpDO0FBQ00sT0FBSyxJQUFMLENBQVUsYUFBVixDQUF3QixLQUFLLFFBQUwsQ0FBYyxnQkFBdEMsRUFBd0QsZ0JBQXhELENBQXlFLE9BQXpFLEVBQWtGLEtBQUssSUFBTCxDQUFVLElBQVYsQ0FBZSxJQUFmLENBQWxGO0FBQ04sRUFkYTtBQWVkLEtBZmMsa0JBZVA7QUFDQSxTQUFVLEtBQUssUUFBTCxDQUFjLFdBQXhCLGNBQThDLE9BQTlDLENBQXNELEtBQUssUUFBTCxDQUFjLFdBQXBFLEVBQWlGLEtBQUssUUFBTCxDQUFjLFlBQS9GO0FBQ04sT0FBSyxJQUFMLENBQVUsVUFBVixDQUFxQixXQUFyQixDQUFpQyxLQUFLLElBQXRDO0FBQ00sR0FBQyxFQUFFLEtBQUssUUFBTCxDQUFjLFFBQWQsSUFBMEIsS0FBSyxRQUFMLENBQWMsUUFBZCxDQUF1QixXQUFqRCxJQUFnRSxLQUFLLFFBQUwsQ0FBYyxRQUFkLENBQXVCLElBQXZGLElBQStGLEtBQUssUUFBTCxDQUFjLFFBQWQsQ0FBdUIsS0FBeEgsQ0FBRCxJQUFtSSxLQUFLLFFBQUwsQ0FBYyxRQUFkLENBQXVCLElBQXZCLENBQTRCLElBQTVCLENBQW5JO0FBQ047QUFuQmEsQzs7Ozs7Ozs7a0JDQUE7QUFDZCxtQkFBa0IsbUJBREo7QUFFZCxlQUFjLGFBRkE7QUFHZCxjQUFhLE9BSEM7QUFJZCxjQUFhLFFBSkM7QUFLZCxlQUFjLGNBTEE7QUFNZCxXQUFVO0FBTkksQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgQmFubmVyIGZyb20gJy4vbGlicy9jb21wb25lbnQvJztcblxuY29uc3Qgb25ET01Db250ZW50TG9hZGVkVGFza3MgPSBbKCkgPT4ge1xuICAgIEJhbm5lci5pbml0KCcuanMtYmFubmVyJyk7XG59XTtcbiAgICBcbmlmKCdhZGRFdmVudExpc3RlbmVyJyBpbiB3aW5kb3cpIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4geyBvbkRPTUNvbnRlbnRMb2FkZWRUYXNrcy5mb3JFYWNoKChmbikgPT4gZm4oKSk7IH0pOyIsImltcG9ydCBkZWZhdWx0cyBmcm9tICcuL2xpYnMvZGVmYXVsdHMnO1xuaW1wb3J0IGNvbXBvbmVudFByb3RvdHlwZSBmcm9tICcuL2xpYnMvY29tcG9uZW50LXByb3RvdHlwZSc7XG5cbmNvbnN0IGluaXQgPSAoc2VsLCBvcHRzKSA9PiB7XG5cdGxldCBlbHMgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsKSk7XG4gICAgLy9sZXQgZWxzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbCkpO1xuXG5cdGlmKCFlbHMubGVuZ3RoKSB0aHJvdyBuZXcgRXJyb3IoJ0Jhbm5lciBjYW5ub3QgYmUgaW5pdGlhbGlzZWQsIG5vIGF1Z21lbnRhYmxlIGVsZW1lbnRzIGZvdW5kJyk7XG4gICAgXG5cdHJldHVybiBlbHMubWFwKGVsID0+IHtcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuY3JlYXRlKGNvbXBvbmVudFByb3RvdHlwZSksIHtcblx0XHRcdG5vZGU6IGVsLFxuXHRcdFx0c2V0dGluZ3M6IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLCBvcHRzKSxcblx0XHRcdHRyaWdnZXJFdmVudDogd2luZG93LlBvaW50ZXJFdmVudCA/ICdwb2ludGVyZG93bicgOiAnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cgPyAndG91Y2hzdGFydCcgOiAnY2xpY2snXG5cdFx0fSkuaW5pdCgpO1xuXHR9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHsgaW5pdCB9OyIsImV4cG9ydCBkZWZhdWx0IHtcblx0aW5pdCgpIHtcblx0XHRpZighdGhpcy50ZXN0KCkpIHJldHVybjtcblx0XHRcblx0XHR3aW5kb3dbYCR7dGhpcy5zZXR0aW5ncy5zdG9yYWdlVHlwZX1TdG9yYWdlYF0uZ2V0SXRlbSh0aGlzLnNldHRpbmdzLnN0b3JhZ2VOYW1lKSAhPT0gdGhpcy5zZXR0aW5ncy5zdG9yYWdlVmFsdWUgJiYgdGhpcy5zaG93KCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblx0dGVzdCgpe1xuXHRcdHJldHVybiB3aW5kb3dbYCR7dGhpcy5zZXR0aW5ncy5zdG9yYWdlVHlwZX1TdG9yYWdlYF0gIT09IHVuZGVmaW5lZDtcblx0fSxcblx0c2hvdygpe1xuXHRcdHRoaXMubm9kZS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuc2V0dGluZ3Mub2ZmQ2xhc3NOYW1lKTtcbiAgICAgICAgdGhpcy5ub2RlLnF1ZXJ5U2VsZWN0b3IodGhpcy5zZXR0aW5ncy5jbG9zZUJ0blNlbGVjdG9yKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGlkZS5iaW5kKHRoaXMpKTtcblx0fSxcblx0aGlkZSgpIHtcbiAgICAgICAgd2luZG93W2Ake3RoaXMuc2V0dGluZ3Muc3RvcmFnZVR5cGV9U3RvcmFnZWBdLnNldEl0ZW0odGhpcy5zZXR0aW5ncy5zdG9yYWdlTmFtZSwgdGhpcy5zZXR0aW5ncy5zdG9yYWdlVmFsdWUpO1xuXHRcdHRoaXMubm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMubm9kZSk7XG4gICAgICAgICEhKHRoaXMuc2V0dGluZ3MuY2FsbGJhY2sgJiYgdGhpcy5zZXR0aW5ncy5jYWxsYmFjay5jb25zdHJ1Y3RvciAmJiB0aGlzLnNldHRpbmdzLmNhbGxiYWNrLmNhbGwgJiYgdGhpcy5zZXR0aW5ncy5jYWxsYmFjay5hcHBseSkgJiYgdGhpcy5zZXR0aW5ncy5jYWxsYmFjay5jYWxsKHRoaXMpO1xuXHR9XG59OyIsImV4cG9ydCBkZWZhdWx0IHtcblx0Y2xvc2VCdG5TZWxlY3RvcjogJy5qcy1iYW5uZXJfX2Nsb3NlJyxcblx0b2ZmQ2xhc3NOYW1lOiAnb2ZmLS1iYW5uZXInLFxuXHRzdG9yYWdlVHlwZTogJ2xvY2FsJyxcblx0c3RvcmFnZU5hbWU6ICdiYW5uZXInLFxuXHRzdG9yYWdlVmFsdWU6ICdhY2tub3dsZWRnZWQnLFxuXHRjYWxsYmFjazogbnVsbFxufTsiXX0=
