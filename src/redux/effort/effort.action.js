import * as type from "./effort.type";

export const receiveEffortAction = (effort) => ({
  type: type.RECEIVE_EFFORT,
  payload: effort,
});
