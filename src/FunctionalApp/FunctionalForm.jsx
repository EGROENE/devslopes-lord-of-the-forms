import { useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { FunctionalTextInput } from "./FunctionalTextInput";
import { FunctionalPhoneInput } from "./FunctionalPhoneInput";

export const FunctionalForm = ({ setUser }) => {
  const [newUserInputs, setNewUserInputs] = useState({
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

  // Reset newUserInputs after setUser to newUserInputs, maybe using prevState. Only do this if there are no errors.
  const handleSubmission = (e) => {
    e.preventDefault();

    const areNoErrors = Object.values(inputErrors).every(
      (value) => value === false
    );
    // If no errors...
    if (areNoErrors) {
      setUser({ ...newUserInputs });
      setNewUserInputs({
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
        setErrors={setErrors}
        resetErrors={resetErrors}
        newUserInputs={newUserInputs}
        setNewUserInputs={setNewUserInputs}
      />

      {/* Phone inputs */}
      <div className="input-wrap">
        <label htmlFor="phone">Phone:</label>
        <FunctionalPhoneInput
          setErrors={setErrors}
          resetErrors={resetErrors}
          newUserPhone={newUserInputs.phone}
          setNewUserInputs={setNewUserInputs}
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
