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
        emailError: false,
        firstNameError: false,
        lastNameError: false,
        phoneError: false,
      },
    };
  }

  // Method to update state value of input:
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

  handlePhoneInput = (index) => (e) => {
    const value = e.target.value;
    if (containsOnlyDigits(value)) {
      const newPhoneState = this.state.userData.phone.map(
        (phoneInput, phoneInputIndex) =>
          index === phoneInputIndex ? value : phoneInput
      );

      this.setState((prevState) => ({
        ...prevState,
        userData: {
          ...prevState.userData,
          phone: newPhoneState,
        },
      }));

      const phoneInputDOMElements = Array.from(
        this.phoneInputsParentElement.current.children
      );

      if (value.length === e.target.maxLength) {
        phoneInputDOMElements[
          phoneInputDOMElements.indexOf(e.target) + 1
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

  render() {
    return (
      <>
        <h2>Class</h2>
        <ProfileInformation userData={this.state.userData} />
        <ClassForm
          userData={this.state.userData}
          inputErrors={this.state.inputErrors}
          handleChange={this.handleChange}
          isNameValid={this.isNameValid}
          setErrors={this.setErrors}
          resetErrors={this.resetErrors}
          handlePhoneInput={this.handlePhoneInput}
          phoneInputsParentElement={this.phoneInputsParentElement}
        />
      </>
    );
  }
}
