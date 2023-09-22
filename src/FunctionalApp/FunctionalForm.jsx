import { useState, useRef } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { FunctionalTextInput } from "./FunctionalTextInput";
import { FunctionalPhoneInput } from "./FunctionalPhoneInput";
import { phoneInputs, textInputs } from "../../constants";
import {
  isNameValid,
  isEmailValid,
  isPhoneNumberValid,
  containsOnlyDigits,
} from "../utils/validations";
import { allCities } from "../utils/all-cities";

export const FunctionalForm = ({ setUser }) => {
  /* Set to empty strings b/c values of input fields are set to these. If this were to be set to null, 'false' would appear in inputs if user hasn't entered anything. */
  const [userInputs, setUserInputs] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: ["", "", "", ""],
    city: "",
  });

  const [hasFailedSubmission, setHasFailedSubmission] = useState(false);

  // This DOM parent for phone inputs is in this component, as FunctionalPhoneInput component produces only one phone input field
  const phoneInputsParentElement = useRef();

  // Validation of inputs:
  const firstNameIsValid = isNameValid(userInputs.firstName);

  const lastNameIsValid = isNameValid(userInputs.lastName);

  const emailIsValid = isEmailValid(userInputs.email);

  const cityIsValid = allCities
    .map((city) => city.toLowerCase())
    .includes(userInputs.city.toLowerCase().trim());

  const phoneNumberIsValid = isPhoneNumberValid(userInputs.phone);

  const validityCheckers = {
    firstNameIsValid: firstNameIsValid,
    lastNameIsValid: lastNameIsValid,
    emailIsValid: emailIsValid,
    cityIsValid: cityIsValid,
    phoneNumberIsValid: phoneNumberIsValid,
  };

  // Define this here, as adding all this logic in onChange when passing to FunctionalPhoneInput.jsx would be a bit of a clusterfuck
  const handlePhoneInput = (index) => (e) => {
    const value = e.target.value;
    // Call containsOnlyDigits here to only allow digits to be typed in
    if (containsOnlyDigits(value)) {
      const newPhoneState = userInputs.phone.map(
        (phoneInput, phoneInputIndex) =>
          index === phoneInputIndex ? value : phoneInput
      );

      // Set phone array in state to updated state array
      setUserInputs((prevState) => {
        return { ...prevState, phone: newPhoneState };
      });

      // Logic to autoskip back & forth b/t phone-input fields:
      const phoneInputDOMElements = Array.from(
        phoneInputsParentElement.current.children
      );

      if (value.length === e.target.maxLength) {
        phoneInputDOMElements[
          phoneInputDOMElements.indexOf(e.target) + 1
        ]?.focus();
      } else if (value === "") {
        phoneInputDOMElements[
          phoneInputDOMElements.indexOf(e.target) - 1
        ]?.focus();
      }
    }
  };

  const handleSubmission = (e) => {
    e.preventDefault();

    const areNoErrors = Object.values(validityCheckers).every(
      (value) => value === true
    );

    if (areNoErrors) {
      // Set 'registered' user account data. This data will appear in profile info box after successful submission.
      setUser({ ...userInputs });
      setUserInputs({
        email: "",
        firstName: "",
        lastName: "",
        phone: ["", "", "", ""],
        city: "",
      });
      setHasFailedSubmission(false);
    } else {
      alert("Bad inputs.");
      setHasFailedSubmission(true);
    }
  };

  return (
    <form onSubmit={handleSubmission}>
      <u>
        <h3>User Information Form</h3>
      </u>
      {/* Text inputs (first/last names, email, city) */}
      {textInputs.map((input) => (
        <FunctionalTextInput
          key={input.id}
          inputProps={{
            id: input.id,
            placeholder: input.placeholder,
            value: userInputs[input.id],
            list: input.list ? input.list : undefined,
            onChange: (e) => {
              setUserInputs({
                ...userInputs,
                [input.id]: e.target.value,
              });
            },
          }}
          label={input.label}
          errorMessage={
            hasFailedSubmission && !validityCheckers[`${input.id}IsValid`]
              ? input.errorMessage
              : ""
          }
        />
      ))}

      {/* Phone */}
      <div className="input-wrap">
        <label htmlFor="phone">Phone:</label>
        <div id="phone-input-wrap" ref={phoneInputsParentElement}>
          {phoneInputs.map((input) => (
            <FunctionalPhoneInput
              key={input.id}
              inputProps={{
                id: input.id,
                placeholder: input.placeholder,
                minLength: input.minLength,
                maxLength: input.maxLength,
                value: userInputs.phone[phoneInputs.indexOf(input)],
                onChange: handlePhoneInput(phoneInputs.indexOf(input)),
              }}
              // These 2 props are used to set hyphens appropriately
              inputIndexInPhoneInputs={phoneInputs.indexOf(input)}
              phoneInputsLength={phoneInputs.length}
            />
          ))}
        </div>
      </div>
      {hasFailedSubmission && (
        <ErrorMessage
          message="Invalid Phone Number"
          show={!validityCheckers.phoneNumberIsValid}
        />
      )}
      <input type="submit" value="Submit" />
    </form>
  );
};
