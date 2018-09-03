import {
  FETCHING_DATA_START,
  FETCHING_DATA_SUCCESS,
  FETCHING_DATA_FAILURE
} from '../constants/actionTypes';

export default function riders(state = {}, action = {}) {
  switch (action.type) {
    case FETCHING_DATA_START:
      return { ...state, ...action };
    case FETCHING_DATA_SUCCESS:
      return { ...state, ...action.riders };
    case FETCHING_DATA_FAILURE:
      return { ...state, ...action };
    default:
      return state;
  }
}
