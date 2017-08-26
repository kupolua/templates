import JSONPath from 'jsonpath-plus';

import { SET_JSON_PATH } from '../constants/CONSTANTS';
import { INITIAL } from '../constants/CONSTANTS';

function convertData(raw, jsonPath) {
    // console.log('reducer::convertData(raw, jsonPath)', raw, jsonPath)
    let data = JSONPath({json: raw, path: jsonPath})[0];
    // console.log('reducer::convertData(raw, jsonPath) return data', data)

    return data;
}

export default function (state = {}, action) {
    switch (action.type) {
        case SET_JSON_PATH:
            // console.log('reducer::case SET_JSON_PATH:', action.payload)
            return { ...state, jsonPath: action.payload};

        case INITIAL:
            // console.log('reducer::case INITIAL:', action.payload.data, state.jsonPath)
            return { ...state, data: convertData(action.payload.data, state.jsonPath)};
    }

    return state
}