import { useRef, useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { FunctionalTextInput } from "./FunctionalTextInput";
import { allCities } from "../utils/all-cities";
import { FunctionalPhoneInput } from "./FunctionalPhoneInput";
import { containsOnlyDigits } from "../utils/validations";

export const FunctionalForm = ({
  hasFailedSubmission,
  setHasFailedSubmission,
  setPrevUserData,
  hasFormBeenSubmittedAtLeastOnce,
  setHasFormBeenSubmittedAtLeastOnce,
}) => {
  const phoneInputsParentElement = useRef(0);
  const [userData, setUserData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: ["", "", "", ""],
    city: "Hobbiton",
  });
  const [inputErrors, setInputErrors] = useState({
    emailError: true,
    firstNameError: true,
    lastNameError: true,
    phoneError: true,
  });
  // Method to update state value onChange of text, select inputs
  // Put in FunctionalForm.jsx:
  const handleChange = (e, inputType) => {
    const value = e.target.value;
    setUserData((prevState) => {
      return { ...prevState, [`${inputType}`]: value };
    });
  };

  // Put in FunctionalForm.jsx:
  const handlePhoneInput = (index) => (e) => {
    const value = e.target.value;
    if (containsOnlyDigits(value)) {
      const newPhoneState = userData.phone.map((phoneInput, phoneInputIndex) =>
        index === phoneInputIndex ? value : phoneInput
      );

      // Set phone array in state to updated state array
      setUserData((prevState) => {
        return { ...prevState, phone: newPhoneState };
      });

      // If length of string containing only the digits in userData.phone is not equal to 6 (account for delay in setting of state above), set inputErrors.phone to true; else, to false:
      if (userData.phone.toString().replace(/,/g, "").length !== 6) {
        setErrors("phone");
      } else {
        resetErrors("phone");
      }

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

  // Put in FunctionalForm.jsx:
  const setErrors = (inputType) => {
    setInputErrors((prevState) => {
      return { ...prevState, [`${inputType}Error`]: true };
    });
  };

  // Put in FunctionalForm.jsx:
  const resetErrors = (inputType) => {
    setInputErrors((prevState) => {
      return { ...prevState, [`${inputType}Error`]: false };
    });
  };

  // Put in FunctionalForm.jsx:
  const handleSubmission = (e) => {
    e.preventDefault();

    const areNoErrors = Object.values(inputErrors).every(
      (value) => value === false
    );
    // If no errors...
    if (areNoErrors) {
      setPrevUserData({
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        city: userData.city,
      });
      setUserData({
        email: "",
        firstName: "",
        lastName: "",
        phone: ["", "", "", ""],
        city: "Hobbiton",
      });
      setInputErrors({
        emailError: true,
        firstNameError: true,
        lastNameError: true,
        phoneError: true,
      });
      setHasFailedSubmission(false);
      if (!hasFormBeenSubmittedAtLeastOnce) {
        setHasFormBeenSubmittedAtLeastOnce(true);
      }
    } else {
      // ELSE...
      alert("Bad inputs.");
      setHasFailedSubmission(true);
    }
  };
  return (
    <form onSubmit={handleSubmission}>
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* Text inputs (first/last names, email) */}
      <FunctionalTextInput
        handleChange={handleChange}
        setErrors={setErrors}
        resetErrors={resetErrors}
        hasFailedSubmission={hasFailedSubmission}
        inputErrors={inputErrors}
        userData={userData}
      />

      {/* City Input */}
      <div className="input-wrap">
        <label htmlFor="city">City:</label>
        <select name="city" id="city" onChange={(e) => handleChange(e, "city")}>
          {allCities.map((city) => (
            <option key={city} selected={city === userData.city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Phone inputs */}
      <div className="input-wrap">
        <label htmlFor="phone">Phone:</label>
        <FunctionalPhoneInput
          phoneInputsParentElement={phoneInputsParentElement}
          userData={userData}
          handlePhoneInput={handlePhoneInput}
        />
      </div>
      {hasFailedSubmission && (
        <ErrorMessage
          message="Invalid Phone Number"
          show={inputErrors.phoneError}
        />
      )}

      <input type="submit" value="Submit" />
    </form>
  );
};
