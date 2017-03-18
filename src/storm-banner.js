const defaults = {
	closeBtnSelector: '.js-banner__close',
	offClassName: 'off--banner',
	storageType: 'local',
	storageName: 'banner',
	storageValue: 'acknowledged',
	callback: null
};

const StormBanner = {
	init() {
		if(!this.test()) return;
		
		window[`${this.settings.storageType}Storage`].getItem(this.settings.storageName) !== this.settings.storageValue && this.show();

		return this;
	},
	test(){
		return window[`${this.settings.storageType}Storage`] !== 'undefined';
	},
	show(){
		this.node.classList.remove(this.settings.offClassName);
        this.node.querySelector(this.settings.closeBtnSelector).addEventListener('click', this.hide.bind(this));
	},
	hide() {
        window[`${this.settings.storageType}Storage`].setItem(this.settings.storageName, this.settings.storageValue);
		this.node.parentNode.removeChild(this.node);
        !!(this.settings.callback && this.settings.callback.constructor && this.settings.callback.call && this.settings.callback.apply) && this.settings.callback.call(this);
	}
};

const init = (sel, opts) => {
	let els = [].slice.call(document.querySelectorAll(sel));
    //let els = Array.from(document.querySelectorAll(sel));

	if(!els.length) throw new Error('Banner cannot be initialised, no augmentable elements found');
    
	return els.map(el => {
		return Object.assign(Object.create(StormBanner), {
			node: el,
			settings: Object.assign({}, defaults, opts)
		}).init();
	});
};

export default { init };