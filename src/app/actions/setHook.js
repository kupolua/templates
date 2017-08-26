import { SET_HOOK } from '../constants/CONSTANTS';

export function setHook(hook) {
    return {
        type: SET_HOOK,
        payload: hook,
    }
}

