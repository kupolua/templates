import { SET_HOOK } from '../constants/CONSTANTS';

export default function (state = {}, action) {
    switch (action.type) {
        case SET_HOOK:
            //todo: read from other store

            window[action.payload.hookFunction](action.payload.hookData);

            return { ...state };
    }

    return state
}