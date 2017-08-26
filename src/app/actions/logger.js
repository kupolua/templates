import { LOGGER } from '../constants/CONSTANTS';

export function logger(log) {
    return {
        type: LOGGER,
        payload: log,
    }
}

