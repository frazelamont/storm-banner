import defaults from './lib/defaults';
import factory from './lib';

const init = (sel, opts) => {
	let els = [].slice.call(document.querySelectorAll(sel));

	if(!els.length) return console.warn(`Banner cannot be initialised, no elements matched ${sel}`);
    
	return els.map(el => Object.create(factory(el, Object.assign({}, defaults, opts))));
};

export default { init };