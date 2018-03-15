export const writeCookie = state => [
    `${state.settings.name}=${state.settings.value};`,
    `expires=${(new Date(new Date().getTime() + (state.settings.cookie.expiry*24*60*60*1000))).toGMTString()};`,
    `path=${state.settings.cookie.path};`,
    state.settings.cookie.domain ? `domain=${state.settings.cookie.domain}` : '',
    state.settings.cookie.secure ? `secure=${state.settings.cookie.secure}` : ''
].join('');

export const getCookie = name =>  document.cookie.split('; ')
                                    .map(part => ({ name: part.split('=')[0], value: part.split('=')[1] }))
                                    .filter(part => part.name === name)[0];