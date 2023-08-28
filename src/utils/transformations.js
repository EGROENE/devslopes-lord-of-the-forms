export const capitalize = (words) => {
  // todo: build this function
  // `capitalize("jOn")` should output `"Jon"`
  // Capitalizes words even after special characters, like apostrophes & hyphens
  let regex = /(\b[a-z](?!\s))/g;
  return (words = words.replace(regex, function (word) {
    return word.toUpperCase();
  }));
};

export const formatPhoneNumber = (phoneNumArray) => {
  // todo: build this function
  // `formatPhoneNumber("1234567")` should be `"12-34-56-7"`
  let stringifiedNumberArray = phoneNumArray.toString();
  let cleaned = ("" + stringifiedNumberArray).replace(/\D/g, "");
  let match = cleaned.match(/^(\d{2})(\d{2})(\d{2})(\d{1})$/);
  if (match) {
    return match[1] + "-" + match[2] + "-" + match[3] + "-" + match[4];
  }
  return undefined;
};
