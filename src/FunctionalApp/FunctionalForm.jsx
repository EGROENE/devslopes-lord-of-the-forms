import { useState, useRef } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { FunctionalTextInput } from "./FunctionalTextInput";
import { FunctionalPhoneInput } from "./FunctionalPhoneInput";
import { phoneInputs, textInputs } from "../../constants";
import {
  isNameValid,
  isEmailValid,
  isPhoneNumberValid,
} from "../utils/validations";
import { allCities } from "../utils/all-cities";

export const FunctionalForm = ({ setUser }) => {
  /* Set to empty strings b/c values of input fields are set to these. If this were to be set to null, 'false' would appear in inputs if user hasn't entered anything. */
  const [newUserInputs, setNewUserInputs] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: ["", "", "", ""],
    city: "",
  });

  const [hasFailedSubmission, setHasFailedSubmission] = useState(false);

  // This DOM parent for phone inputs is in this component, as FunctionalPhoneInput component produces only one phone-input field
  const phoneInputsParentElement = useRef(0);

  // Error handling:
  const firstNameIsValid = isNameValid(newUserInputs.firstName);

  const lastNameIsValid = isNameValid(newUserInputs.lastName);

  const emailIsValid = isEmailValid(newUserInputs.email);

  const cityIsValid = allCities
    .map((city) => city.toLowerCase())
    .includes(newUserInputs.city.toLowerCase().trim());

  const phoneNumberIsValid = isPhoneNumberValid(newUserInputs.phone);

  const validityCheckers = {
    firstNameIsValid: firstNameIsValid,
    lastNameIsValid: lastNameIsValid,
    emailIsValid: emailIsValid,
    cityIsValid: cityIsValid,
    phoneNumberIsValid: phoneNumberIsValid,
  };

  const handleSubmission = (e) => {
    e.preventDefault();

    const areNoErrors = Object.values(validityCheckers).every(
      (value) => value === true
    );

    if (areNoErrors) {
      // Set 'registered' user account data. This data will appear in profile info box after successful submission.
      setUser({ ...newUserInputs });
      /* Reset to empty strings b/c values of input fields are set to these. If this were to be set to null, 'false' would appear in inputs if user hasn't entered anything. */
      setNewUserInputs({
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
          newUserInputs={newUserInputs}
          setNewUserInputs={setNewUserInputs}
          id={input.id}
          label={input.label}
          placeholder={input.placeholder}
          list={input.list}
          errorMessage={input.errorMessage}
          validityCheckers={validityCheckers}
          hasFailedSubmission={hasFailedSubmission}
        />
      ))}

      {/* Phone */}
      <div className="input-wrap">
        <label htmlFor="phone">Phone:</label>
        <div id="phone-input-wrap" ref={phoneInputsParentElement}>
          {phoneInputs.map((input) => (
            <FunctionalPhoneInput
              key={input.id}
              id={input.id}
              name="phone"
              type={input.type}
              newUserPhone={newUserInputs.phone}
              setNewUserInputs={setNewUserInputs}
              inputIndexInPhoneInputs={phoneInputs.indexOf(input)}
              placeholder={input.placeholder}
              minLength={input.minLength}
              maxLength={input.maxLength}
              phoneInputsParentElement={phoneInputsParentElement}
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
