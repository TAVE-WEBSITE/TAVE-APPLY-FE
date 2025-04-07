const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "적절하지 않은 이메일 형식입니다";
  else return "";
};

const validatePassword = (password: string) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  if (!passwordRegex.test(password)) return "적절하지 않은 비밀번호입니다";
  else return "";
};

const validatePasswordConfirm = (password: string, confirmPassword: string) => {
  if (password !== confirmPassword) return "비밀번호가 일치하지 않습니다";
  else return "";
};
export { validateEmail, validatePassword, validatePasswordConfirm };
