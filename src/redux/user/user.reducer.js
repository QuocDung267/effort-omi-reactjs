import userActionType from "./user.type";
const INITIAL_STATE = {
  userDetail: [],
  userItems: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionType.RECEIVE_DETAIL_USER:
      return {
        ...state,
        userDetail: action.payload,
      };
    case userActionType.RECEIVE_ALL_USER:
      return {
        ...state,
        userItems: action.payload,
      };
    default:
      return state;
  }
};
export default userReducer;
