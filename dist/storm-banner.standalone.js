/**
 * @name storm-banner: Dismissible message banner saved to either sessionStorage or localStorage.
 * @version 0.2.2: Thu, 04 May 2017 15:17:23 GMT
 * @author stormid
 * @license MIT
 */
(function(root, factory) {
   var mod = {
       exports: {}
   };
   if (typeof exports !== 'undefined'){
       mod.exports = exports
       factory(mod.exports)
       module.exports = mod.exports.default
   } else {
       factory(mod.exports);
       root.StormBanner = mod.exports.default
   }

}(this, function(exports) {
   'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var defaults = {
	closeBtnSelector: '.js-banner__close',
	offClassName: 'off--banner',
	storageType: 'local',
	storageName: 'banner',
	storageValue: 'acknowledged',
	callback: null
};

var clickEvent = window.PointerEvent ? 'pointerdown' : 'ontouchstart' in window ? 'touchstart' : 'click';

var componentPrototype = {
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

var init = function init(sel, opts) {
	var els = [].slice.call(document.querySelectorAll(sel));
	//let els = Array.from(document.querySelectorAll(sel));

	if (!els.length) throw new Error('Banner cannot be initialised, no augmentable elements found');

	return els.map(function (el) {
		return Object.assign(Object.create(componentPrototype), {
			node: el,
			settings: Object.assign({}, defaults, opts)
		}).init();
	});
};

var index = { init: init };

exports.default = index;;
}));
