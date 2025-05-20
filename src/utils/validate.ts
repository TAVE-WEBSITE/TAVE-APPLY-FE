const isValidPassword = (password: string) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  if (!passwordRegex.test(String(password)))
    return "적절하지 않은 비밀번호입니다";
  else return "";
};

const isValidBirth = (value: number): boolean => {
  const birthRegex = /^(?:[0-9]{2})(?:0[1-9]|1[0-2])(?:0[1-9]|[12][0-9]|3[01])$/;
  return birthRegex.test(String(value));
};

const validatePasswordConfirm = (password: string, confirmPassword: string) => {
  if (password !== confirmPassword) return "비밀번호가 일치하지 않습니다";
  else return "";
};

const isValidPhoneNumber = (phoneNumber: string) => {
  const phoneRegex = /^[0-9]{3}-[0-9]{4}-[0-9]{4}$/;
  return phoneRegex.test(phoneNumber);
};

export {
  isValidPassword,
  isValidBirth,
  isValidPhoneNumber,
  validatePasswordConfirm,
};
