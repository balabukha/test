import {
  FETCHING_DATA_START,
  FETCHING_DATA_SUCCESS,
  FETCHING_DATA_FAILURE,
  FETCHING_DRIVER_SCHEDULE_START,
  FETCHING_DRIVER_SCHEDULE_SUCCESS,
  FETCHING_DRIVER_SCHEDULE_FAILURE
} from '../constants/actionTypes';

import api from '../api';

/**
 * Action Получение информации о гонщиках
 * @param { Number } param
 * @returns {{ riders }}
 */
export const fetchData = param => async dispatch => {
  dispatch({ type: FETCHING_DATA_START });
  try {
    const riders = await api.data.fetchData(param);
    dispatch({ type: FETCHING_DATA_SUCCESS, riders });
  } catch (error) {
    dispatch({ type: FETCHING_DATA_FAILURE });
  }
};

/**
 * Action Получение информации о Заездах
 * @param { String } param
 * @returns {{ schedule }}
 */
export const fetchSchedule = param => async dispatch => {
  dispatch({ type: FETCHING_DRIVER_SCHEDULE_START });
  try {
    const schedule = await api.data.fetchSchedule(param);
    dispatch({ type: FETCHING_DRIVER_SCHEDULE_SUCCESS, schedule });
  } catch (error) {
    dispatch({ type: FETCHING_DRIVER_SCHEDULE_FAILURE });
  }
};
