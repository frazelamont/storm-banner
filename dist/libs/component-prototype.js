export default {
	init() {
		if(!this.test()) return;
		
		window[`${this.settings.storageType}Storage`].getItem(this.settings.storageName) !== this.settings.storageValue && this.show();

		return this;
	},
	test(){
		return window[`${this.settings.storageType}Storage`] !== undefined;
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