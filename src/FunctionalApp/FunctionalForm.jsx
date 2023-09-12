import { useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { FunctionalTextInput } from "./FunctionalTextInput";
import { FunctionalPhoneInput } from "./FunctionalPhoneInput";
import { isNameValid, isEmailValid } from "../utils/validations";
import { allCities } from "../utils/all-cities";

export const FunctionalForm = ({
  setPrevUserData,
  hasFormBeenSubmittedAtLeastOnce,
  setHasFormBeenSubmittedAtLeastOnce,
}) => {
  const [userData, setUserData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: ["", "", "", ""],
    city: "",
  });

  const [inputErrors, setInputErrors] = useState({
    emailError: true,
    firstNameError: true,
    lastNameError: true,
    phoneError: true,
    cityError: true,
  });

  const [hasFailedSubmission, setHasFailedSubmission] = useState(false);

  // Call onChange of all fields except phone inputs:
  const handleTextInputChange = (e, inputType) => {
    const value = e.target.value;
    setUserData((prevState) => {
      return { ...prevState, [`${inputType}`]: value };
    });
    // Set/reset errors in state, depending on the type of input this method is called on when changed:
    if (inputType === "firstName" || inputType === "lastName") {
      if (!isNameValid(e.target.value)) {
        setErrors(inputType);
      } else {
        resetErrors(inputType);
      }
    } else if (inputType === "email") {
      if (!isEmailValid(e.target.value)) {
        setErrors(inputType);
      } else {
        resetErrors(inputType);
      }
    } else if (inputType === "city") {
      if (
        !allCities
          .map((city) => city.toLowerCase())
          .includes(e.target.value.toLowerCase())
      ) {
        setErrors(inputType);
      } else {
        resetErrors(inputType);
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
        city: "",
      });
      setInputErrors({
        emailError: true,
        firstNameError: true,
        lastNameError: true,
        phoneError: true,
        cityError: true,
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
        handleTextInputChange={handleTextInputChange}
        hasFailedSubmission={hasFailedSubmission}
        inputErrors={inputErrors}
        userData={userData}
      />

      {/* Phone inputs */}
      <div className="input-wrap">
        <label htmlFor="phone">Phone:</label>
        <FunctionalPhoneInput
          userData={userData}
          setUserData={setUserData}
          setErrors={setErrors}
          resetErrors={resetErrors}
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
