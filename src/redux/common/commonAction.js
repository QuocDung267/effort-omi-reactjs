import * as type from "./commonType";

export const isToggle = () => ({
  type: type.SIDE_BAR_TOGGLE,
});
export const projectCodeSelectedAction = (projectCode) => ({
  type: type.SELECT_PROJECT_CODE,
  payload: projectCode,
});
export const receiveGroupAction = (group) => ({
  type: type.RECEVIE_GROUP,
  payload: group,
});
export const receiveSearchKeyAction = (key) => ({
  type: type.RECEVIE_SEARCH_KEY,
  payload: key,
});
export const receiveMemberInGroupAction = (members) => ({
  type: type.RECEVIE_MEMBER_IN_GROUP,
  payload: members,
});
export const removeMemberInGroupAction = () => ({
  type: type.REMOVE_MEMBER_IN_GROUP,
});
