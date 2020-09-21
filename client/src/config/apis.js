import axios from 'axios';

const auth = axios.create({
    baseURL: 'http://local.conner.rocks/api/auth',
    port: 80,
    https: true,
    crossDomain: true,
    headers: {
        "Access-Control-Allow-Origin": '*'

    },
});
const chat = axios.create({
    baseURL: 'http://local.conner.rocks/api/messanger',
    port: 80,
    https: true,
    crossDomain: true,
    headers: {
        "Access-Control-Allow-Origin": '*'

    },
});
const dashboard = axios.create({
    baseURL: 'http://local.conner.rocks/api/dash',
    port: 80,
    https: true,
    crossDomain: true,
    headers: {
        "Access-Control-Allow-Origin": '*'

    },
});
export {
    auth, chat, dashboard
}