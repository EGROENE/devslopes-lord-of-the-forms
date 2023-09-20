export const isNameValid = (value) => {
  if (
    /^[a-zA-ZÄäÖöÜüßÉéÍíóÓÑñ -.]*$/i.test(value) &&
    value.replace(/\s/g, "").length >= 2 &&
    value.replace(/-/g, "").length &&
    value.replace(/'/g, "").length &&
    value.replace(/\./g, "").length
  ) {
    return true;
  } else {
    return false;
  }
};

export function isEmailValid(emailAddress) {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !!emailAddress.match(regex);
}

export function containsOnlyDigits(value) {
  const regex = /^[0-9]*$/;
  return !!value.match(regex);
}

/* Using containsOnlyDigits in this function isn't necessary, as it's already used on input value inside FunctionalPhoneInput. Otherwise, it would be used here. */
// Expects an array
export function isPhoneNumberValid(value) {
  if (value.toString().replace(/,/g, "").length !== 7) {
    return false;
  } else {
    return true;
  }
}
