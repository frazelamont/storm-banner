import { TRIGGER_EVENTS, TRIGGER_KEYCODES } from '../../constants';

let state = {};

const writeCookie = () => `${state.settings.name}=${state.settings.value};path=/;expires=${(new Date(new Date().getTime() + (state.settings.cookieExpiryDays*24*60*60*1000))).toGMTString()};`;

const save = () => {
    if(state.settings.type === 'cookie') return document.cookie = writeCookie();
    else window[state.settings.type].setItem(state.settings.name, state.settings.value);
};

export default (node, settings) => {
    if(settings.type !== 'cookie' && window[settings.type] == undefined) return console.warn(`Browser does not suport ${settings.type}`);
    //only check storage, never cookies?
    //may not be read server-side and node may be rendered regardless...
    //window[settings.type].getItem(settings.name) !== settings.value && node.classList.remove(settings.offClassName);
    
    state = {
        settings,
        node,
        btn: document.querySelector(settings.closeBtnSelector)
    };
    
    TRIGGER_EVENTS.forEach(ev => {
        state.btn.addEventListener(ev, e => {
            if(e.keyCode && !~TRIGGER_KEYCODES.indexOf(e.keyCode)) return;
            save();
            state.node.parentNode.removeChild(state.node);
        });
    });
};