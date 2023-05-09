import * as type from "./allProjectsType";

const initialState = {
  allProject: [],
};

const allProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.RECEIVE_ALL_PROJECT:
      return {
        ...state,
        allProject: action.payload,
      };
    default:
      return state;
  }
};
export default allProjectReducer;
