import React from "react";
import { ClassForm } from "./ClassForm";
import { ProfileInformation } from "../ProfileInformation";
import { containsOnlyDigits } from "../utils/validations";

export class ClassApp extends React.Component {
  constructor(props) {
    super(props);
    this.phoneInputsParentElement = React.createRef();
    this.state = {
      userData: {
        email: "",
        firstName: "",
        lastName: "",
        phone: ["", "", "", ""],
        city: "Hobbiton",
      },
      inputErrors: {
        emailError: true,
        firstNameError: true,
        lastNameError: true,
        phoneError: true,
      },
      attemptedSubmissionTally: 0,
      successfulSubmissionTally: 0,
    };
  }

  // Method to update state value onChange of text, select inputs
  handleChange = (e, inputType) => {
    const value = e.target.value;
    this.setState((prevState) => ({
      ...prevState,
      userData: {
        ...prevState.userData,
        [`${inputType}`]: value,
      },
    }));
  };

  // Run onChange of phone inputs
  handlePhoneInput = (index) => (e) => {
    const value = e.target.value;
    // If input value contains only digits (not empty string in this case), set index (that corresponds w/ field's index of its parent in the DOM) of phone array in state; else, leave index of phone array in state as it is.
    if (containsOnlyDigits(value)) {
      const newPhoneState = this.state.userData.phone.map(
        (phoneInput, phoneInputIndex) =>
          index === phoneInputIndex ? value : phoneInput
      );

      // Set phone array in state to updated state array
      this.setState((prevState) => ({
        ...prevState,
        userData: {
          ...prevState.userData,
          phone: newPhoneState,
        },
      }));

      // If length of string containing only the digits in userData.phone is not equal to 6 (account for delay in setting of state above), set inputErrors.phone to true; else, to false:
      if (this.state.userData.phone.toString().replace(/,/g, "").length !== 6) {
        this.setErrors("phone");
      } else {
        this.resetErrors("phone");
      }

      // Logic to autoskip back & forth b/t phone-input fields:
      const phoneInputDOMElements = Array.from(
        this.phoneInputsParentElement.current.children
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

  setErrors = (inputType) => {
    this.setState((prevState) => ({
      ...prevState,
      inputErrors: {
        ...prevState.inputErrors,
        [`${inputType}Error`]: true,
      },
    }));
  };

  resetErrors = (inputType) => {
    this.setState((prevState) => ({
      ...prevState,
      inputErrors: {
        ...prevState.inputErrors,
        [`${inputType}Error`]: false,
      },
    }));
  };

  handleSubmission = (e) => {
    e.preventDefault();

    const areNoErrors = Object.values(this.state.inputErrors).every(
      (value) => value === false
    );
    // If no errors...
    if (areNoErrors) {
      this.setState((prevState) => ({
        userData: {
          email: "",
          firstName: "",
          lastName: "",
          phone: ["", "", "", ""],
          city: "Hobbiton",
        },
        inputErrors: {
          emailError: true,
          firstNameError: true,
          lastNameError: true,
          phoneError: true,
        },
        attemptedSubmissionTally: 0,
        successfulSubmissionTally: prevState.successfulSubmissionTally + 1,
        prevUserData: {
          email: prevState.userData.email,
          firstName: prevState.userData.firstName,
          lastName: prevState.userData.lastName,
          phone: prevState.userData.phone,
          city: prevState.userData.city,
        },
      }));
    } else {
      // ELSE...
      alert("Please fix errors before submitting.");
      this.setState((prevState) => ({
        ...prevState,
        attemptedSubmissionTally: prevState.attemptedSubmissionTally + 1,
      }));
    }
  };

  render() {
    return (
      <>
        <h2>Class</h2>
        <ProfileInformation
          successfulSubmissionTally={this.state.successfulSubmissionTally}
          prevUserData={this.state.prevUserData}
        />
        <ClassForm
          userData={this.state.userData}
          inputErrors={this.state.inputErrors}
          handleChange={this.handleChange}
          setErrors={this.setErrors}
          resetErrors={this.resetErrors}
          handlePhoneInput={this.handlePhoneInput}
          phoneInputsParentElement={this.phoneInputsParentElement}
          attemptedSubmissionTally={this.state.attemptedSubmissionTally}
          handleSubmission={this.handleSubmission}
        />
      </>
    );
  }
}
