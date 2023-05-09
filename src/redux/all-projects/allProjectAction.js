import * as type from "./allProjectsType";

export const receiveAllProjectAction = (projects) => ({
  type: type.RECEIVE_ALL_PROJECT,
  payload: projects,
});
