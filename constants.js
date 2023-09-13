// Export this into ClassTextInput
export const textInputs = [
  {
    key: "firstName",
    label: "First Name:",
    placeholder: "Bilbo",
    errorMessage: "First name must be at least 2 characters long",
  },
  {
    key: "lastName",
    label: "Last Name:",
    placeholder: "Baggins",
    errorMessage: "Last name must be at least 2 characters long",
  },
  {
    key: "email",
    label: "Email:",
    placeholder: "bilbo-baggins@adventurehobbits.net",
    errorMessage: "Email is Invalid",
  },
  {
    key: "city",
    label: "City:",
    placeholder: "Hobbiton",
    errorMessage: "City is Invalid",
    list: "cities",
  },
];

export const phoneInputs = [
  {
    type: "text",
    id: "phone-input-1",
    placeholder: "55",
    minLength: 2,
    maxLength: 2,
  },
  {
    type: "text",
    id: "phone-input-2",
    placeholder: "55",
    minLength: 2,
    maxLength: 2,
  },
  {
    type: "text",
    id: "phone-input-3",
    placeholder: "55",
    minLength: 2,
    maxLength: 2,
  },
  {
    type: "text",
    id: "phone-input-4",
    placeholder: "5",
    minLength: 1,
    maxLength: 1,
  },
];

export const profileInfos = [
  { label: "Email:", key: "email" },
  { label: "First Name:", key: "firstName" },
  { label: "Last Name:", key: "lastName" },
  { label: "City:", key: "city" },
  { label: "Phone:", key: "phone" },
];
