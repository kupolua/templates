import axios from 'axios';

import { INITIAL } from '../constants/CONSTANTS';

export function initial(url) {
    const rawData = axios.get(url);

    return {
        type: INITIAL,
        payload: rawData,
    }
}

