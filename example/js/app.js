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
			settings: Object.assign({}, _defaults2.default, opts)
		}).init();
	});
};

exports.default = { init: init };

},{"./libs/component-prototype":3,"./libs/defaults":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var clickEvent = window.PointerEvent ? 'pointerdown' : 'ontouchstart' in window ? 'touchstart' : 'click';

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
		this.node.querySelector(this.settings.closeBtnSelector).addEventListener(clickEvent, this.hide.bind(this));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlL3NyYy9hcHAuanMiLCJleGFtcGxlL3NyYy9saWJzL2NvbXBvbmVudC9pbmRleC5qcyIsImV4YW1wbGUvc3JjL2xpYnMvY29tcG9uZW50L2xpYnMvY29tcG9uZW50LXByb3RvdHlwZS5qcyIsImV4YW1wbGUvc3JjL2xpYnMvY29tcG9uZW50L2xpYnMvZGVmYXVsdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7OztBQUVBLElBQU0sMkJBQTJCLFlBQU0sQUFDbkM7d0JBQUEsQUFBTyxLQUFQLEFBQVksQUFDZjtBQUZELEFBQWdDLENBQUE7O0FBSWhDLElBQUcsc0JBQUgsQUFBeUIsZUFBUSxBQUFPLGlCQUFQLEFBQXdCLG9CQUFvQixZQUFNLEFBQUU7NEJBQUEsQUFBd0IsUUFBUSxVQUFBLEFBQUMsSUFBRDtlQUFBLEFBQVE7QUFBeEMsQUFBZ0Q7QUFBcEcsQ0FBQTs7Ozs7Ozs7O0FDTmpDOzs7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBTSxPQUFPLFNBQVAsQUFBTyxLQUFBLEFBQUMsS0FBRCxBQUFNLE1BQVMsQUFDM0I7S0FBSSxNQUFNLEdBQUEsQUFBRyxNQUFILEFBQVMsS0FBSyxTQUFBLEFBQVMsaUJBQWpDLEFBQVUsQUFBYyxBQUEwQixBQUMvQztBQUVIOztLQUFHLENBQUMsSUFBSixBQUFRLFFBQVEsTUFBTSxJQUFBLEFBQUksTUFBVixBQUFNLEFBQVUsQUFFaEM7O1lBQU8sQUFBSSxJQUFJLGNBQU0sQUFDcEI7Z0JBQU8sQUFBTyxPQUFPLE9BQUEsQUFBTyw0QkFBckI7U0FBaUQsQUFDakQsQUFDTjthQUFVLE9BQUEsQUFBTyxPQUFQLEFBQWMsd0JBRmxCLEFBQWlELEFBRTdDLEFBQTRCO0FBRmlCLEFBQ3ZELEdBRE0sRUFBUCxBQUFPLEFBR0osQUFDSDtBQUxELEFBQU8sQUFNUCxFQU5PO0FBTlI7O2tCQWNlLEVBQUUsTSxBQUFGOzs7Ozs7OztBQ2pCZixJQUFNLGFBQWEsT0FBQSxBQUFPLGVBQVAsQUFBc0IsZ0JBQWdCLGtCQUFBLEFBQWtCLFNBQWxCLEFBQTJCLGVBQXBGLEFBQW1HOzs7QUFFcEYsdUJBQ1AsQUFDTjtNQUFHLENBQUMsS0FBSixBQUFJLEFBQUssUUFBUSxBQUVqQjs7U0FBVSxLQUFBLEFBQUssU0FBZixBQUF3Qix5QkFBeEIsQUFBOEMsUUFBUSxLQUFBLEFBQUssU0FBM0QsQUFBb0UsaUJBQWlCLEtBQUEsQUFBSyxTQUExRixBQUFtRyxnQkFBZ0IsS0FBbkgsQUFBbUgsQUFBSyxBQUV4SDs7U0FBQSxBQUFPLEFBQ1A7QUFQYSxBQVFkO0FBUmMsdUJBUVIsQUFDTDtTQUFPLE9BQVUsS0FBQSxBQUFLLFNBQWYsQUFBd0IsNkJBQS9CLEFBQXlELEFBQ3pEO0FBVmEsQUFXZDtBQVhjLHVCQVdSLEFBQ0w7T0FBQSxBQUFLLEtBQUwsQUFBVSxVQUFWLEFBQW9CLE9BQU8sS0FBQSxBQUFLLFNBQWhDLEFBQXlDLEFBQ25DO09BQUEsQUFBSyxLQUFMLEFBQVUsY0FBYyxLQUFBLEFBQUssU0FBN0IsQUFBc0Msa0JBQXRDLEFBQXdELGlCQUF4RCxBQUF5RSxZQUFZLEtBQUEsQUFBSyxLQUFMLEFBQVUsS0FBL0YsQUFBcUYsQUFBZSxBQUMxRztBQWRhLEFBZWQ7QUFmYyx1QkFlUCxBQUNBO1NBQVUsS0FBQSxBQUFLLFNBQWYsQUFBd0IseUJBQXhCLEFBQThDLFFBQVEsS0FBQSxBQUFLLFNBQTNELEFBQW9FLGFBQWEsS0FBQSxBQUFLLFNBQXRGLEFBQStGLEFBQ3JHO09BQUEsQUFBSyxLQUFMLEFBQVUsV0FBVixBQUFxQixZQUFZLEtBQWpDLEFBQXNDLEFBQ2hDO0dBQUMsRUFBRSxLQUFBLEFBQUssU0FBTCxBQUFjLFlBQVksS0FBQSxBQUFLLFNBQUwsQUFBYyxTQUF4QyxBQUFpRCxlQUFlLEtBQUEsQUFBSyxTQUFMLEFBQWMsU0FBOUUsQUFBdUYsUUFBUSxLQUFBLEFBQUssU0FBTCxBQUFjLFNBQWhILEFBQUMsQUFBd0gsVUFBVSxLQUFBLEFBQUssU0FBTCxBQUFjLFNBQWQsQUFBdUIsS0FBMUosQUFBbUksQUFBNEIsQUFDcks7QSxBQW5CYTtBQUFBLEFBQ2Q7Ozs7Ozs7OzttQkNIYyxBQUNJLEFBQ2xCO2VBRmMsQUFFQSxBQUNkO2NBSGMsQUFHRCxBQUNiO2NBSmMsQUFJRCxBQUNiO2VBTGMsQUFLQSxBQUNkO1csQUFOYyxBQU1KO0FBTkksQUFDZCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgQmFubmVyIGZyb20gJy4vbGlicy9jb21wb25lbnQvJztcblxuY29uc3Qgb25ET01Db250ZW50TG9hZGVkVGFza3MgPSBbKCkgPT4ge1xuICAgIEJhbm5lci5pbml0KCcuanMtYmFubmVyJyk7XG59XTtcbiAgICBcbmlmKCdhZGRFdmVudExpc3RlbmVyJyBpbiB3aW5kb3cpIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4geyBvbkRPTUNvbnRlbnRMb2FkZWRUYXNrcy5mb3JFYWNoKChmbikgPT4gZm4oKSk7IH0pOyIsImltcG9ydCBkZWZhdWx0cyBmcm9tICcuL2xpYnMvZGVmYXVsdHMnO1xuaW1wb3J0IGNvbXBvbmVudFByb3RvdHlwZSBmcm9tICcuL2xpYnMvY29tcG9uZW50LXByb3RvdHlwZSc7XG5cbmNvbnN0IGluaXQgPSAoc2VsLCBvcHRzKSA9PiB7XG5cdGxldCBlbHMgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsKSk7XG4gICAgLy9sZXQgZWxzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbCkpO1xuXG5cdGlmKCFlbHMubGVuZ3RoKSB0aHJvdyBuZXcgRXJyb3IoJ0Jhbm5lciBjYW5ub3QgYmUgaW5pdGlhbGlzZWQsIG5vIGF1Z21lbnRhYmxlIGVsZW1lbnRzIGZvdW5kJyk7XG4gICAgXG5cdHJldHVybiBlbHMubWFwKGVsID0+IHtcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuY3JlYXRlKGNvbXBvbmVudFByb3RvdHlwZSksIHtcblx0XHRcdG5vZGU6IGVsLFxuXHRcdFx0c2V0dGluZ3M6IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLCBvcHRzKVxuXHRcdH0pLmluaXQoKTtcblx0fSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7IGluaXQgfTsiLCJjb25zdCBjbGlja0V2ZW50ID0gd2luZG93LlBvaW50ZXJFdmVudCA/ICdwb2ludGVyZG93bicgOiAnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cgPyAndG91Y2hzdGFydCcgOiAnY2xpY2snXG5cdFx0XG5leHBvcnQgZGVmYXVsdCB7XG5cdGluaXQoKSB7XG5cdFx0aWYoIXRoaXMudGVzdCgpKSByZXR1cm47XG5cdFx0XG5cdFx0d2luZG93W2Ake3RoaXMuc2V0dGluZ3Muc3RvcmFnZVR5cGV9U3RvcmFnZWBdLmdldEl0ZW0odGhpcy5zZXR0aW5ncy5zdG9yYWdlTmFtZSkgIT09IHRoaXMuc2V0dGluZ3Muc3RvcmFnZVZhbHVlICYmIHRoaXMuc2hvdygpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cdHRlc3QoKXtcblx0XHRyZXR1cm4gd2luZG93W2Ake3RoaXMuc2V0dGluZ3Muc3RvcmFnZVR5cGV9U3RvcmFnZWBdICE9PSB1bmRlZmluZWQ7XG5cdH0sXG5cdHNob3coKXtcblx0XHR0aGlzLm5vZGUuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLnNldHRpbmdzLm9mZkNsYXNzTmFtZSk7XG4gICAgICAgIHRoaXMubm9kZS5xdWVyeVNlbGVjdG9yKHRoaXMuc2V0dGluZ3MuY2xvc2VCdG5TZWxlY3RvcikuYWRkRXZlbnRMaXN0ZW5lcihjbGlja0V2ZW50LCB0aGlzLmhpZGUuYmluZCh0aGlzKSk7XG5cdH0sXG5cdGhpZGUoKSB7XG4gICAgICAgIHdpbmRvd1tgJHt0aGlzLnNldHRpbmdzLnN0b3JhZ2VUeXBlfVN0b3JhZ2VgXS5zZXRJdGVtKHRoaXMuc2V0dGluZ3Muc3RvcmFnZU5hbWUsIHRoaXMuc2V0dGluZ3Muc3RvcmFnZVZhbHVlKTtcblx0XHR0aGlzLm5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLm5vZGUpO1xuICAgICAgICAhISh0aGlzLnNldHRpbmdzLmNhbGxiYWNrICYmIHRoaXMuc2V0dGluZ3MuY2FsbGJhY2suY29uc3RydWN0b3IgJiYgdGhpcy5zZXR0aW5ncy5jYWxsYmFjay5jYWxsICYmIHRoaXMuc2V0dGluZ3MuY2FsbGJhY2suYXBwbHkpICYmIHRoaXMuc2V0dGluZ3MuY2FsbGJhY2suY2FsbCh0aGlzKTtcblx0fVxufTsiLCJleHBvcnQgZGVmYXVsdCB7XG5cdGNsb3NlQnRuU2VsZWN0b3I6ICcuanMtYmFubmVyX19jbG9zZScsXG5cdG9mZkNsYXNzTmFtZTogJ29mZi0tYmFubmVyJyxcblx0c3RvcmFnZVR5cGU6ICdsb2NhbCcsXG5cdHN0b3JhZ2VOYW1lOiAnYmFubmVyJyxcblx0c3RvcmFnZVZhbHVlOiAnYWNrbm93bGVkZ2VkJyxcblx0Y2FsbGJhY2s6IG51bGxcbn07Il19
