export const validatePassword = (password) => {
  const strongRegex = new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$");
  return strongRegex.test(password);
};

export const validateEmail = (email) => {
  const strongRegex = new RegExp(
    "^[a-zA-Z0-9]+(.?[a-zA-Z0-9])*(@ominext.com)$"
  );
  return strongRegex.test(email);
};
