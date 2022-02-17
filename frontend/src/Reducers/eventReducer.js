import {
  ALL_EVENT_FAIL,
  ALL_EVENT_REQUEST,
  ALL_EVENT_SUCCESS,
  MY_EVENT_FAIL,
  MY_EVENT_REQUEST,
  MY_EVENT_SUCCESS,
  NEW_EVENT_REQUEST,
  NEW_EVENT_SUCCESS,
  NEW_EVENT_FAIL,
  CLEAR_ERRORS,
} from "../Constants/eventConstants";

export const eventsReducer = (state = { events: [] }, action) => {
  switch (action.type) {
    case ALL_EVENT_REQUEST:
    case MY_EVENT_REQUEST:
      return {
        loading: true,
        events: [],
      };
    case ALL_EVENT_SUCCESS:
    case MY_EVENT_SUCCESS:
      return {
        loading: false,
        events: action.payload.events,
      };
    case ALL_EVENT_FAIL:
    case MY_EVENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newEventReducer = (state = { event: {} }, action) => {
  switch (action.type) {
    case NEW_EVENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_EVENT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        event: action.payload.event,
        message: "Event Created Successfully",
      };
    case NEW_EVENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// export const eventReducer = (state = {}, action) => {
//   switch (action.type) {
//     case DELETE_EVENT_REQUEST:
//     case UPDATE_EVENT_REQUEST:
//       return {
//         ...state,
//         loading: true,
//       };
//     case DELETE_EVENT_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         isDeleted: action.payload,
//       };

//     case UPDATE_EVENT_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         isUpdated: action.payload,
//       };
//     case DELETE_EVENT_FAIL:
//     case UPDATE_EVENT_FAIL:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };
//     case DELETE_EVENT_RESET:
//       return {
//         ...state,
//         isDeleted: false,
//       };
//     case UPDATE_EVENT_RESET:
//       return {
//         ...state,
//         isUpdated: false,
//       };
//     case CLEAR_ERRORS:
//       return {
//         ...state,
//         error: null,
//       };
//     default:
//       return state;
//   }
// };

// export const eventDetailsReducer = (state = { event: {} }, action) => {
//   switch (action.type) {
//     case EVENT_DETAILS_REQUEST:
//       return {
//         loading: true,
//         ...state,
//       };
//     case EVENT_DETAILS_SUCCESS:
//       return {
//         loading: false,
//         event: action.payload,
//       };
//     case EVENT_DETAILS_FAIL:
//       return {
//         loading: false,
//         error: action.payload,
//       };

//     case CLEAR_ERRORS:
//       return {
//         ...state,
//         error: null,
//       };
//     default:
//       return state;
//   }
// };
