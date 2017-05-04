/**
 * @name storm-banner: Dismissible message banner saved to either sessionStorage or localStorage.
 * @version 0.1.0: Thu, 04 May 2017 13:58:30 GMT
 * @author stormid
 * @license MIT
 */
import defaults from './libs/defaults';
import componentPrototype from './libs/component-prototype';

const init = (sel, opts) => {
	let els = [].slice.call(document.querySelectorAll(sel));
    //let els = Array.from(document.querySelectorAll(sel));

	if(!els.length) throw new Error('Banner cannot be initialised, no augmentable elements found');
    
	return els.map(el => {
		return Object.assign(Object.create(componentPrototype), {
			node: el,
			settings: Object.assign({}, defaults, opts),
			triggerEvent: window.PointerEvent ? 'pointerdown' : 'ontouchstart' in window ? 'touchstart' : 'click'
		}).init();
	});
};

export default { init };