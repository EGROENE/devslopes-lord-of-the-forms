import { useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { FunctionalTextInput } from "./FunctionalTextInput";
import { FunctionalPhoneInput } from "./FunctionalPhoneInput";

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

  const setErrors = (inputType) => {
    setInputErrors((prevState) => {
      return { ...prevState, [`${inputType}Error`]: true };
    });
  };

  const resetErrors = (inputType) => {
    setInputErrors((prevState) => {
      return { ...prevState, [`${inputType}Error`]: false };
    });
  };

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

      {/* Text inputs (first/last names, email, city) */}
      <FunctionalTextInput
        hasFailedSubmission={hasFailedSubmission}
        inputErrors={inputErrors}
        userData={userData}
        setUserData={setUserData}
        setErrors={setErrors}
        resetErrors={resetErrors}
      />

      {/* Phone inputs */}
      <div className="input-wrap">
        <label htmlFor="phone">Phone:</label>
        <FunctionalPhoneInput
          userDataPhone={userData.phone}
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
