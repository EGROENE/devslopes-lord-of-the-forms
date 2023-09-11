// Export this into ClassTextInput
export const textInputs = [
  {
    id: "firstName",
    label: "First Name",
    placeholder: "Bilbo",
    errorMessage: "First name must be at least 2 characters long",
  },
  {
    id: "lastName",
    label: "Last Name",
    placeholder: "Baggins",
    errorMessage: "Last name must be at least 2 characters long",
  },
  {
    id: "email",
    label: "Email",
    placeholder: "bilbo-baggins@adventurehobbits.net",
    errorMessage: "Email is Invalid",
  },
  {
    id: "city",
    label: "City",
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
  { label: "Email", id: "email" },
  { label: "First Name", id: "firstName" },
  { label: "Last Name", id: "lastName" },
  { label: "City", id: "city" },
  { label: "Phone", id: "phone" },
];
