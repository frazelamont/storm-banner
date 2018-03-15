/**
 * @name storm-banner: Dismissible message banner saved to either sessionStorage, localStorage, or cookies. For cookie messages or any one-time notification.
 * @version 0.2.5: Thu, 15 Mar 2018 15:26:22 GMT
 * @author stormid
 * @license MIT
 */
(function(root, factory) {
   var mod = {
       exports: {}
   };
   if (typeof exports !== 'undefined'){
       mod.exports = exports
       factory(mod.exports)
       module.exports = mod.exports.default
   } else {
       factory(mod.exports);
       root.StormBanner = mod.exports.default
   }

}(this, function(exports) {
   'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var defaults = {
    closeBtnSelector: '.js-banner__close',
    hiddenBanner: 'off--banner',
    template: function template(sel) {
        return '<div' + (!!~sel.indexOf('#') ? 'id="' + sel.substr(1) + '"' : '') + ' class="' + (!~sel.indexOf('#') ? sel.substr(1) : '') + ' banner" role="dialog" aria-label="welcome">\n\t\t\t\t<div class="banner_msg">\n\t\t\t\t\tWelcome. This site uses cookies. Read <a class="banner__link" href="/info/cookies">our policy</a>.\n\t\t\t\t</div>\n\t\t\t\t<button class="banner__close js-banner__close" aria-label="Close banner">\n\t\t\t\t\t<svg class="banner__close-icon" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">\n\t\t\t\t\t\t<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>\n\t\t\t\t\t\t<path d="M0 0h24v24H0z" fill="none"/>\n\t\t\t\t\t</svg>\n\t\t\t\t</button>\n\t\t\t</div>';
    },
    dismiss: function dismiss(banner) {
        banner.parentNode.removeChild(banner);
    },

    type: 'cookie', //localStorage || sessionStorage || cookie
    name: '__STORMID_MSG__',
    value: 'acknowledged',
    cookie: {
        path: '/',
        domain: '',
        secure: '',
        expiry: 365
    },
    callback: null //banner node passed to a callback
};

var TRIGGER_EVENTS = ['ontouchend' in window ? 'touchend' : 'click', 'keyup'];

var TRIGGER_KEYCODES = [13, 32];

var writeCookie = function writeCookie(state) {
    return [state.settings.name + '=' + state.settings.value + ';', 'expires=' + new Date(new Date().getTime() + state.settings.cookie.expiry * 24 * 60 * 60 * 1000).toGMTString() + ';', 'path=' + state.settings.cookie.path + ';', state.settings.cookie.domain ? 'domain=' + state.settings.cookie.domain : '', state.settings.cookie.secure ? 'secure=' + state.settings.cookie.secure : ''].join('');
};

var getCookie = function getCookie(name) {
    return document.cookie.split('; ').map(function (part) {
        return { name: part.split('=')[0], value: part.split('=')[1] };
    }).filter(function (part) {
        return part.name === name;
    })[0];
};

var save = function save(state) {
    if (state.settings.type === 'cookie') return document.cookie = writeCookie(state);else window[state.settings.type].setItem(state.settings.name, state.settings.value);
};

var check = function check(settings) {
    settings = settings || state.settings;
    if (settings.type !== 'cookie') return window[settings.type].getItem(settings.name) === settings.value;else return getCookie(settings.name) && getCookie(settings.name).value === settings.value;
};

var dismiss = function dismiss(state) {
    return function () {
        save(state);
        state.settings.dismiss(state.banner);
        !!(state.settings.callback && state.settings.callback.constructor && state.settings.callback.call && state.settings.callback.apply) && state.settings.callback.call(state.banner);
    };
};

var initListener = function initListener(state) {
    TRIGGER_EVENTS.forEach(function (ev) {
        state.btn.addEventListener(ev, function (e) {
            (!e.keyCode || !!~TRIGGER_KEYCODES.indexOf(e.keyCode)) && dismiss(state)();
        });
    });
};

var factory = function factory(sel, settings) {
    var banner = document.querySelector(sel);
    if (settings.type !== 'cookie' && window[settings.type] == undefined) return console.warn('Browser does not suport ' + settings.type);

    if (!check(settings)) {
        banner && banner.classList.remove(settings.hiddenBanner);
        !banner && document.body.firstElementChild.insertAdjacentHTML('beforebegin', settings.template(sel));
    } else {
        if (!!banner) state.banner.parentNode.removeChild(state.banner);
        return;
    }

    var state = {
        settings: settings,
        banner: banner || document.querySelector(sel),
        btn: (banner || document.querySelector(sel)).querySelector(settings.closeBtnSelector)
    };
    state.btn && initListener(state);

    return { dismiss: dismiss(state) };
};

var init = function init(sel, opts) {
    return Object.assign({}, factory(sel, Object.assign({}, defaults, opts)));
};

var index = { init: init };

exports.default = index;;
}));
