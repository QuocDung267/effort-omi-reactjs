import * as type from "./project.type";

export const receiveProjectAction = (project) => ({
  type: type.RECEIVE_PROJECT,
  payload: project,
});
export const addMemberToProjectAction = (member) => ({
  type: type.ADD_MEMBER_TO_PROJECT,
  payload: member,
});
export const updateAddMemberInPojectAction = (member) => ({
  type: type.UPDATE_ADD_MEMBER_IN_PROJECT,
  payload: member,
});
export const updateMemberInAddPojectAction = (member) => ({
  type: type.UPDATE_MEMBER_IN_ADD_PROJECT,
  payload: member,
});

export const updateMemberInPojectAction = (member) => ({
  type: type.UPDATE_MEMBER_IN_PROJECT,
  payload: member,
});
export const removeMemberFromProjectAction = (member) => ({
  type: type.REMOVE_MEMBER_FROM_PROJECT,
  payload: member,
});
export const removeAllMemberFromProjectAction = () => ({
  type: type.REMOVE_ALL_MEMBER_IN_PROJECT,
});
export const removeProjectSelectedAction = () => ({
  type: type.REMOVE_PROJECT_SELECTED,
});

export const projectSelectedAction = (project) => ({
  type: type.PICK_PROJECT_DETAILS,
  payload: project,
});
