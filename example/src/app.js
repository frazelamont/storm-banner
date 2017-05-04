import Banner from './libs/component/';

const onDOMContentLoadedTasks = [() => {
    Banner.init('.js-banner');
}];
    
if('addEventListener' in window) window.addEventListener('DOMContentLoaded', () => { onDOMContentLoadedTasks.forEach((fn) => fn()); });