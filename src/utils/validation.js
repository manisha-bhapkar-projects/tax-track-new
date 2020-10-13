export function validationNameWithRegex(name, nameRegex) {
  if (name && nameRegex.test(name)) {
    return true;
  }
  return false;
}

export function validdateEmail(email) {
  const emailRegex = /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  if (email && emailRegex.test(email.trim())) {
    return true;
  }
  return false;
}
