import { getCookie } from '../libs/utils';

const getSteamCookie = details => getCookie(Object.assign({}, { url: 'https://steamcommunity.com' }, details));

// getSessionId form cookies
export const getSessionId = async () => {
    const { value: sessionId } = await getSteamCookie({ name: 'sessionid' });
    return sessionId;
};

export const getId64 = async () => {
    const { value: steamLogin } = await getSteamCookie({ name: 'steamLoginSecure' });
    const id64 = steamLogin.split('%')[0];
    return id64;
};

export const checkAuth = () => getSteamCookie({ name: 'steamLoginSecure' });

// Check Steam error which can be in html after request
export const checkError = (html, selector) => {
    const errorText = html.querySelector(selector);
    if (errorText !== null) {
        return Promise.reject(new Error(errorText.textContent));
    }
    return Promise.resolve(html);
};

export const isSteamGroup = url => /(https?:\/\/)?steamcommunity\.com\/groups\/[\s\S]+/i.test(url);
