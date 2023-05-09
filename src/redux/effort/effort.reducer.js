import * as type from "./effort.type";
const INITIAL_STATE = {
  effortItem: [],
};

const effortReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case type.RECEIVE_EFFORT:
      return {
        ...state,
        effortItem: action.payload,
      };
    default:
      return state;
  }
};
export default effortReducer;
