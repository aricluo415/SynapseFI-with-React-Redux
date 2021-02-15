import { FETCH_USER } from "./types";

export const fetchUser = () => dispatch => {
  console.log("getting User...");
  fetch("/api/users")
    .then(res => res.json())
    .then(user =>
      dispatch({
        type: FETCH_USER,
        payload: user
      })
    );
};
