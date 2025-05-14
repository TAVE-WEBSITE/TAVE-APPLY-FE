const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "적절하지 않은 이메일 형식입니다";
  else return "";
};

const isValidPassword = (password: string) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  if (!passwordRegex.test(String(password)))
    return "적절하지 않은 비밀번호입니다";
  else return "";
};

const isValidBirth = (value: number): boolean => {
  const regex = /^(?:[0-9]{2})(?:0[1-9]|1[0-2])(?:0[1-9]|[12][0-9]|3[01])$/;
  return regex.test(String(value));
};

const validatePasswordConfirm = (password: string, confirmPassword: string) => {
  if (password !== confirmPassword) return "비밀번호가 일치하지 않습니다";
  else return "";
};

const isValidPhoneNumber = (phoneNumber: string) => {
  // 000-0000-0000 형식 검증 (하이픈 포함)
  const phoneRegex = /^[0-9]{3}-[0-9]{4}-[0-9]{4}$/;
  if (!phoneRegex.test(phoneNumber)) return false;
  else return true;
};

export {
  isValidEmail,
  isValidPassword,
  isValidBirth,
  isValidPhoneNumber,
  validatePasswordConfirm,
};
