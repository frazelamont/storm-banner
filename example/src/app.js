import Banner from './libs/component/';

const onDOMContentLoadedTasks = [() => {
    window.__STORMID_COOKIE_BANNER__ = Banner.init('.js-banner');
    window.__STORMID_LS_BANNER__ = Banner.init('.js-ls-banner', {
        type:'localStorage'
    });
    console.log(window.__STORMID_COOKIE_BANNER__);
}];
    
if('addEventListener' in window) window.addEventListener('DOMContentLoaded', () => { onDOMContentLoadedTasks.forEach((fn) => fn()); });