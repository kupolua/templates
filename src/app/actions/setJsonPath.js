import { SET_JSON_PATH } from '../constants/CONSTANTS';

export function setJsonPath(jsonPath) {
    return {
        type: SET_JSON_PATH,
        payload: jsonPath,
    }
}

