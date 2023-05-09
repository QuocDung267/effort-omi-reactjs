import userActionType from "./user.type";
export const receiveUserAction = (user) => ({
  type: userActionType.RECEIVE_DETAIL_USER,
  payload: user,
});
export const receiveListUserAction = (user) => ({
  type: userActionType.RECEIVE_ALL_USER,
  payload: user,
});
