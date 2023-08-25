import { Component } from "react";
import { ClassForm } from "./ClassForm";
import { ProfileInformation } from "../ProfileInformation";
import { containsOnlyDigits } from "../utils/validations";

export class ClassApp extends Component {
  constructor(props) {
    super(props);
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
    if (containsOnlyDigits(e.target.value)) {
      const newPhoneState = this.state.userData.phone.map(
        (phoneInput, phoneInputIndex) =>
          index === phoneInputIndex ? e.target.value : phoneInput
      );
      this.setState((prevState) => ({
        ...prevState,
        userData: {
          ...prevState.userData,
          phone: newPhoneState,
        },
      }));
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
        />
      </>
    );
  }
}
