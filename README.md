# Storm banner

[![Build Status](https://travis-ci.org/mjbp/storm-banner.svg?branch=master)](https://travis-ci.org/mjbp/storm-banner)
[![codecov.io](http://codecov.io/github/mjbp/storm-banner/coverage.svg?branch=master)](http://codecov.io/github/mjbp/storm-banner?branch=master)
[![npm version](https://badge.fury.io/js/storm-banner.svg)](https://badge.fury.io/js/storm-banner)

Dismissible message banner saved to either sessionStorage or localStorage.

## Example
[https://mjbp.github.io/storm-banner](https://mjbp.github.io/storm-banner)

## Usage
HTML
```
 <div class="banner js-banner off--banner">
    <button class="banner__close js-banner__close">
        <svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
    </button>
    <p>...</p>
</div>
```

Sample minimum CSS required
```
.off--banner {
    display: none;
}
``

JS
```
npm i -S storm-banner
```
either using es6 import
```
import Banner from 'storm-banner';

Banner.init('.js-banner');
```
aynchronous browser loading (use the .standalone version in the /dist folder) using the global name (Storm + capitalised package name)
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
	closeBtnSelector: '.js-banner__close',
	offClassName: 'off--banner',
	storageType: 'local', //alternatively use 'session'
	storageName: 'banner',
	storageValue: 'acknowledged',
	callback: null
}
```

e.g.
```
Banner.init('.js-banner', {
    callback(){
        console.log(this);
    }
});
```

## Tests
```
npm run test
```

## Browser support
This is module has both es6 and es5 distributions. The es6 version should be used in a workflow that transpiles.

The es5 version depends upon session/local storage, Object.assign, element.classList, and Promises so all evergreen browsers are supported out of the box, ie9+ is supported with polyfills. ie8+ will work with even more polyfills for Array functions and eventListeners.

## Dependencies
None

## License
MIT