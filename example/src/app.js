import Banner from './libs/storm-banner';

const onDOMContentLoadedTasks = [() => {
    Banner.init('.js-banner');
}];
    
if('addEventListener' in window) window.addEventListener('DOMContentLoaded', () => { onDOMContentLoadedTasks.forEach((fn) => fn()); });