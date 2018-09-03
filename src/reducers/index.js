import { combineReducers } from 'redux';

import riders from './riders';
import schedule from './schedule';

export default combineReducers({
  riders,
  schedule
});
