import { NEW_MESSAGE, NEW_QUESTION } from "../actions/types";

const initialState = {
  messages: [],
  message: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case NEW_MESSAGE:
      return {
        ...state,
        message: action.payload
      };
    case NEW_QUESTION:
      return {
        ...state,
        message: action.payload
      };
    default:
      return state;
  }
}
