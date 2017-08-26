import md5 from 'md5'
import axios from 'axios';
import { SET_LOGGER_URL } from '../constants/CONSTANTS';
import { LOGGER } from '../constants/CONSTANTS';

const initialSessionID = () => {
    return {
        sessionID: md5(Math.floor(Date.now() / 1000))
    };
};

export default function (state = initialSessionID(), action) {
    switch (action.type) {
        case SET_LOGGER_URL:
            return { ...state, loggerUrl: action.payload };

        case LOGGER:
            let Log = {
                session: {
                    id: state.sessionID,
                    level: action.payload.message.level,
                    log: action.payload.message.log
                }
            };

            // console.log('reducer_logger::case LOGGER::log', Log)
            axios.post(state.loggerUrl, JSON.stringify(Log));

            return { ...state };
    }

    return state
}