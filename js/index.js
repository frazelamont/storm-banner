/**
 * @name storm-banner: Dismissible message banner saved to either sessionStorage, localStorage, or cookies. For cookie messages or any one-time notification.
 * @version 0.2.5: Thu, 15 Mar 2018 12:13:53 GMT
 * @author stormid
 * @license MIT
 */
import defaults from './lib/defaults';
import factory from './lib';

const init = (sel, opts) => {
	let el = document.querySelector(sel);
	
	let o = Object.create(factory(el, Object.assign({}, defaults, opts)).prototype);
	console.log(o);
	return o;
};

export default { init };