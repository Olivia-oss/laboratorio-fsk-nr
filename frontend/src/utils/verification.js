export function verifyLong(password) {
  return password.length >= 8;
}

export function verifyCapital(password) {
  return /[A-Z]/.test(password);
}

export function verifyLower(password) {
  return /[a-z]/.test(password);
}

export function verifyNumber(password) {
  return /[0-9]/.test(password);
}

export function verifyChar(password) {
  return /[!@#$%^&*(),.?":{}|<>]/.test(password);
}

export const verifyPasswordMsg = (password) => {
  if (!verifyLong(password)) {
    return "Ingresa mínimo 8 caracteres";
  } else if (!verifyCapital(password)) {
    return "Ingresa mínimo una letra mayúscula";
  } else if (!verifyLower(password)) {
    return "Ingresa mínimo una letra minúscula";
  } else if (!verifyNumber(password)) {
    return "Ingresa mínimo un número";
  } else if (!verifyChar(password)) {
    return "Ingresa mínimo un símbolo, ejemplo [./?,]";
  }
  return "";
};

export function verifyEmailRegex(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}
