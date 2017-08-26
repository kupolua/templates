import { SET_LOGGER_URL } from '../constants/CONSTANTS';

export function setLoggerUrl(url) {
    return {
        type: SET_LOGGER_URL,
        payload: url,
    }
}

