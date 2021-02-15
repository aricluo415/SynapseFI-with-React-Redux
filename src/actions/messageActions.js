import { NEW_MESSAGE, NEW_QUESTION } from "./types";

export const newMessage = messageData => dispatch => {
  fetch("/api/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(messageData)
  })
    .then(res => res.json())
    .then(message => {
      dispatch({
        type: NEW_MESSAGE,
        payload: message
      });
    });
};
export const newQuestion = questionData => dispatch => {
  dispatch({
    type: NEW_QUESTION,
    payload: questionData
  });
};
