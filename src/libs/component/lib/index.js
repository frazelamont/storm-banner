import { TRIGGER_EVENTS, TRIGGER_KEYCODES } from './constants';
import { h, getCookie, writeCookie } from './utils';

const save = state => {
    if(state.settings.type === 'cookie') return document.cookie = writeCookie(state);
    else window[state.settings.type].setItem(state.settings.name, state.settings.value);
};

const check = settings => {
    settings = settings || state.settings;
    if(settings.type !== 'cookie') return window[settings.type].getItem(settings.name) === settings.value;
    else return getCookie(settings.name) && getCookie(settings.name).value === settings.value;
};

const dismiss = state => () => {
    save(state);
    state.settings.dismiss(state.banner);
};

const initListener = state => {
    TRIGGER_EVENTS.forEach(ev => {
        state.btn.addEventListener(ev, e => {
            (!e.keyCode || !!~TRIGGER_KEYCODES.indexOf(e.keyCode)) && dismiss(state)();
        });
    });
};

export default (sel, settings) => {
    let banner = document.querySelector(sel);
    if(settings.type !== 'cookie' && window[settings.type] == undefined) return console.warn(`Browser does not suport ${settings.type}`);

    if(!check(settings)) {
        banner && banner.classList.remove(settings.hiddenBanner);
        !banner && document.body.firstElementChild.insertAdjacentHTML('beforebegin', settings.template(sel));
    } else {
        if(!!banner) banner.parentNode.removeChild(banner);
        return;
    }

    let state = {
        settings,
        banner: banner || document.querySelector(sel),
        btn: (banner || document.querySelector(sel)).querySelector(settings.closeBtnSelector)
    };
    state.btn && initListener(state);
    
    return { dismiss: dismiss(state) };
};