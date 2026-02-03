const isValidPassword = (password: string) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  if (!passwordRegex.test(String(password)))
    return "비밀번호가 안전 기준을 충족하지 않습니다.";
  else return "";
};

const isValidBirth = (value: string) => {
    if (!/^\d{6}$/.test(value)) return false;
    const yy = parseInt(value.slice(0, 2), 10);
    const mm = parseInt(value.slice(2, 4), 10);
    const dd = parseInt(value.slice(4, 6), 10);
    const year = yy <= 20 ? 2000 + yy : 1900 + yy;
    const date = new Date(year, mm - 1, dd);
    return date.getFullYear() === year && date.getMonth() === mm - 1 && date.getDate() === dd;
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
