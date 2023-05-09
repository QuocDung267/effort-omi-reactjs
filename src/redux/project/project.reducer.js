import * as type from "./project.type";
import {
  updateMemberInUpdateProjectPage,
  updateMemberInAddProjectPage,
  addMember,
} from "./project.utils";
const INITIAL_STATE = {
  projectItem: [],
  memberInProject: [],
  projectSelected: {},
};

const projectReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case type.RECEIVE_PROJECT:
      return {
        ...state,
        projectItem: action.payload,
      };
    case type.ADD_MEMBER_TO_PROJECT:
      return {
        ...state,
        memberInProject: addMember(state.memberInProject, action.payload),
      };
    case type.REMOVE_PROJECT_SELECTED:
      return {
        ...state,
        projectSelected: [],
      };
    case type.REMOVE_MEMBER_FROM_PROJECT:
      return {
        ...state,
        memberInProject: state.memberInProject.filter(
          (member) => member.email !== action.payload.email
        ),
      };
    case type.UPDATE_MEMBER_IN_ADD_PROJECT:
      return {
        ...state,
        memberInProject: updateMemberInAddProjectPage(
          state.memberInProject,
          action.payload
        ),
      };
    case type.REMOVE_ALL_MEMBER_IN_PROJECT:
      return {
        ...state,
        memberInProject: [],
      };
    case type.PICK_PROJECT_DETAILS:
      return {
        ...state,
        projectSelected: action.payload,
      };
    case type.UPDATE_ADD_MEMBER_IN_PROJECT:
      return {
        ...state,
        projectSelected: {
          ...state.projectSelected,
          member: [...state.projectSelected.member, action.payload],
        },
      };
    case type.UPDATE_MEMBER_IN_PROJECT:
      return {
        ...state,
        projectSelected: {
          ...state.projectSelected,
          member: updateMemberInUpdateProjectPage(
            state.projectSelected.member,
            action.payload
          ),
        },
      };
    default:
      return state;
  }
};
export default projectReducer;
