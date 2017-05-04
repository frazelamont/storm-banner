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