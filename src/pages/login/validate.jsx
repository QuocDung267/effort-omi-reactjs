export const loginMessagesForm = {};

export const validate = (user) => {
  let result = true;

  if (!user.email) {
    loginMessagesForm.email = "please input your username";
    result = false;
  } else {
    loginMessagesForm.email = "";
  }

  if (!user.password) {
    loginMessagesForm.password = "please input your password";
    result = false;
  } else {
    loginMessagesForm.password = "";
  }

  return result;
};
