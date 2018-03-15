# Storm banner

[![npm version](https://badge.fury.io/js/storm-banner.svg)](https://badge.fury.io/js/storm-banner)

"Dismissible message banner saved to either sessionStorage, localStorage, or cookies. For cookie messages or any one-time notification.

## Example
[https://stormid.github.io/storm-banner](https://stormid.github.io/storm-banner)

## Usage
HTML
```

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

The es5 version depends upon Object.assign so all evergreen browsers are supported out of the box, ie9+ is supported with polyfills. ie8+ will work with even more polyfills for Array functions and eventListeners.

sessionStorage and localStorage options depend on support, note that these some browsers (e.g. Safari) do not support storage under incognito mode.

## Dependencies
None

## License
MIT