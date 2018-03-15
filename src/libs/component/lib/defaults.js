export default {
	closeBtnSelector: '.js-banner__close',
	hiddenBanner: 'off--banner',
	template(sel){
		return `<div${!!~sel.indexOf('#') ? `id="${sel.substr(1)}"` : ''} class="${!~sel.indexOf('#') ? sel.substr(1) : ''} banner" role="dialog" aria-label="welcome">
				<div class="banner_msg">
					Welcome. This site uses cookies. Read <a class="banner__link" href="/info/cookies">our policy</a>.
				</div>
				<button class="banner__close js-banner__close" aria-label="Close banner">
					<svg class="banner__close-icon" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
						<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
						<path d="M0 0h24v24H0z" fill="none"/>
					</svg>
				</button>
			</div>`;
	},
	dismiss(banner){ banner.parentNode.removeChild(banner); },
	type: 'cookie',//localStorage || sessionStorage || cookie
	name: '__STORMID_MSG__',
	value: 'acknowledged',
	cookie: {
		path: '/',
		domain: '',
		secure: '',
		expiry: 365
	},
	callback: null//banner node passed to a callback
};