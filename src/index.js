import defaults from './lib/defaults';
import factory from './lib';

const init = (sel, opts) => {
	return Object.assign({}, factory(sel, Object.assign({}, defaults, opts)));
};

export default { init };