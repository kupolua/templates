import { combineReducers } from 'redux';

import DataHandler from './reducer_dataHandler'
import HookFunction from './reducer_hookFunction'
import Logger from './reducer_logger'

const rootReducer = combineReducers({
  data: DataHandler,
  setHook: HookFunction,
  log: Logger
});

export default rootReducer;
