import { useRef, useState } from "react";
import { ProfileInformation } from "../ProfileInformation";
import { FunctionalForm } from "./FunctionalForm";
import { containsOnlyDigits } from "../utils/validations";

export const FunctionalApp = () => {
  const phoneInputsParentElement = useRef(0);
  const [userData, setUserData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: ["", "", "", ""],
    city: "Hobbiton",
  });
  const [prevUserData, setPrevUserData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
  });
  const [inputErrors, setInputErrors] = useState({
    emailError: true,
    firstName: true,
    lastNameError: true,
    phoneError: true,
    cityError: true,
  });
  const [attemptedSubmissionTally, setAttemptedSubmissionTally] = useState(0);
  const [successfulSubmissionTally, setSuccessfulSubmissionTally] = useState(0);

  // Method to update state value onChange of text, select inputs
  const handleChange = (e, inputType) => {
    const value = e.target.value;
    setUserData((prevState) => {
      return { ...prevState, [`${inputType}`]: value };
    });
  };

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
        phoneInputsParentElement.children
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

  const setErrors = (inputType) => {
    setInputErrors((prevState) => {
      return { ...prevState, [`${inputType}`]: true };
    });
  };

  const resetErrors = (inputType) => {
    setInputErrors((prevState) => {
      return { ...prevState, [`${inputType}`]: false };
    });
  };

  const handleSubmission = (e) => {
    e.preventDefault();

    const areNoErrors = Object.values(inputErrors).every(
      (value) => value === false
    );
    // If no errors...
    if (areNoErrors) {
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
      // if prevState.userData is undefined, try setting these to current userData values before resetting in setUserData above
      setPrevUserData((prevState) => {
        return {
          email: prevState.userData.email,
          firstName: prevState.userData.firstName,
          lastName: prevState.userData.lastName,
          phone: prevState.userData.phone,
          city: prevState.userData.city,
        };
      });
      setAttemptedSubmissionTally(0);
      setSuccessfulSubmissionTally(successfulSubmissionTally + 1);
    } else {
      // ELSE...
      alert("Please fix errors before submitting.");
      setAttemptedSubmissionTally(attemptedSubmissionTally + 1);
    }
  };

  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation
        successfulSubmissionTally={successfulSubmissionTally}
        prevUserData={prevUserData}
      />
      <FunctionalForm
        userData={userData}
        inputErrors={inputErrors}
        handleChange={handleChange}
        attemptedSubmissionTally={attemptedSubmissionTally}
        handleSubmission={handleSubmission}
        setErrors={setErrors}
        resetErrors={resetErrors}
        handlePhoneInput={handlePhoneInput}
        phoneInputsParentElement={phoneInputsParentElement}
      />
    </>
  );
};
