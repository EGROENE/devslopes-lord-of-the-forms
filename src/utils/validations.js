export const isNameValid = (value) => {
  if (
    value
      .split("")
      .every((char) => char.toLowerCase() !== char.toUpperCase()) &&
    value.length >= 2
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
