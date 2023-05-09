import * as type from "./commonType";

const initialState = {
  toggle: true,
  projectCodeSelected: " ",
  group: [],
  searchKey: "",
  memberInGroup: [],
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.SIDE_BAR_TOGGLE:
      return {
        ...state,
        toggle: !state.toggle,
      };
    case type.SELECT_PROJECT_CODE:
      return {
        ...state,
        projectCodeSelected: action.payload,
      };

    case type.RECEVIE_GROUP:
      return {
        ...state,
        group: action.payload,
      };
    case type.RECEVIE_SEARCH_KEY:
      return {
        ...state,
        searchKey: action.payload,
      };
    case type.RECEVIE_MEMBER_IN_GROUP:
      return {
        ...state,
        memberInGroup: action.payload,
      };
    case type.REMOVE_MEMBER_IN_GROUP:
      return {
        ...state,
        memberInGroup: [],
      };
    default:
      return state;
  }
};

export default commonReducer;
