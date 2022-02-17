import axios from "axios";

import {
  ALL_EVENT_FAIL,
  ALL_EVENT_REQUEST,
  ALL_EVENT_SUCCESS,
  MY_EVENT_REQUEST,
  MY_EVENT_SUCCESS,
  MY_EVENT_FAIL,
  NEW_EVENT_REQUEST,
  NEW_EVENT_SUCCESS,
  NEW_EVENT_FAIL,
  EVENT_DETAILS_REQUEST,
  EVENT_DETAILS_FAIL,
  EVENT_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from "../Constants/eventConstants";

// Get All Events
export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_EVENT_REQUEST });

    const { data } = await axios.get("/api/events");
    // console.log(`get events data: ${JSON.stringify(data.events)}`);
    dispatch({
      type: ALL_EVENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_EVENT_FAIL,
      payload: error.data.message,
    });
  }
};

// Get All Events For My
export const getMyEvents = () => async (dispatch) => {
  try {
    dispatch({ type: MY_EVENT_REQUEST });

    const { data } = await axios.get("/api/events/me");

    dispatch({
      type: MY_EVENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MY_EVENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Event
export const createEvent = (eventData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_EVENT_REQUEST });

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    const { data } = await axios.post(`/api/events/create`, eventData, config);

    dispatch({
      type: NEW_EVENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_EVENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// // Get Events Details
// export const getEventDetails = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: EVENT_DETAILS_REQUEST });

//     const { data } = await axios.get(`/api/event/${id}`);

//     dispatch({
//       type: EVENT_DETAILS_SUCCESS,
//       payload: data.event,
//     });
//   } catch (error) {
//     dispatch({
//       type: EVENT_DETAILS_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
