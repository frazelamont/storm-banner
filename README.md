# Storm banner

[![npm version](https://badge.fury.io/js/storm-banner.svg)](https://badge.fury.io/js/storm-banner)

Dismissible message banner saved to either sessionStorage, localStorage, or cookies. For cookie messages or any one-time notification.

## Example
[https://stormid.github.io/storm-banner](https://stormid.github.io/storm-banner)

## Usage
HTML
HTML is optional. If you choose not to supply any DOM the banner will be rendered for you - you can configure the banner by supplying a custom template function in the configuration object (see options below).

If using cookies, you could read cookie server-side and conditionally server-render the banner. YOu would just need to add classNames to match your configuration (or the defaults).

Using server-rendered DOM with the default config:

```
<div class="banner js-banner off--banner">
    <button class="banner__close js-banner__close">
        <svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
    </button>
    <p>This site uses a banner to provide information important enough that the user must be alerted to it.</p>
</div>
```

JS
```
npm i -S storm-banner
```
either using es6 import
```
import Banner from 'storm-banner';

Banner.init('.js-banner');
```
asynchronous browser loading (use the .standalone version in the /dist folder) using the global name (Storm + capitalised package name)
```
import Load from 'storm-load';

Load('{{path}}/storm-banner.standalone.js')
    .then(() => {
        StormBanner.init('.js-banner');
    });
```

## Options
```
{
    closeBtnSelector: '.js-banner__close',//className of the close button
	hiddenBanner: 'off--banner',//className to hide banner initially
	template(sel){ //function returngin template string, selector passed to init function is passed through here
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
	dismiss(banner){ banner.parentNode.removeChild(banner); },//function executed when dismissed, you could add all kinds of actions or effects here, banner DOM node is passed as only argument
	type: 'cookie',//localStorage || sessionStorage || cookie
	name: '__STORMID_MSG__',//string used as cookie/session/localStorage name
	value: 'acknowledged',//string used as cookie/session/localStorage value
	cookie: {//other cookie settings
		path: '/',
		domain: '',
		secure: '',
		expiry: 365
	}
}
```

e.g.
```
Banner.init('.js-banner', {
    dismiss(banner){
        banner.addEventListener('transitionend', e => { banner.parentNode.removeChild(banner); });
        banner.classList.add('sweet-exit-transition');
    }
});
```

## Tests
```
npm run test
```

## Browser support
This is module has both es6 and es5 distributions. The es6 version should be used in a workflow that transpiles.

The es5 version depends upon Object.assign so all evergreen browsers are supported out of the box, ie9+ is supported with polyfills. ie8+ will work with even more polyfills for Array functions and eventListeners.

sessionStorage and localStorage options depend on support, note that these some browsers (e.g. Safari) do not support storage under incognito mode.

## Dependencies
None

## License
MIT