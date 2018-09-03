import {
  FETCHING_DRIVER_SCHEDULE_START,
  FETCHING_DRIVER_SCHEDULE_SUCCESS,
  FETCHING_DRIVER_SCHEDULE_FAILURE
} from '../constants/actionTypes';

export default function riders(state = {}, action = {}) {
  switch (action.type) {
    case FETCHING_DRIVER_SCHEDULE_START:
      return {};
    case FETCHING_DRIVER_SCHEDULE_SUCCESS:
      return { ...state, ...action.schedule };
    case FETCHING_DRIVER_SCHEDULE_FAILURE:
      return { ...state, ...action };
    default:
      return state;
  }
}
