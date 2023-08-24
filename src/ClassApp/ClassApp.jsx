import { Component } from "react";
import { ClassForm } from "./ClassForm";
import { ProfileInformation } from "../ProfileInformation";

export class ClassApp extends Component {
  state = {
    userData: {
      email: "",
      firstName: "",
      lastName: "",
      phone: [],
      city: "Hobbiton",
    },
    inputErrors: {
      emailError: false,
      firstNameError: false,
      lastNameError: false,
      phoneError: false,
    },
  };

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

  // maybe put this in validations.js
  isNameValid = (value) => {
    if (
      value
        .split("")
        .every((char) => char.toLowerCase() !== char.toUpperCase()) &&
      value.length >= 2
    ) {
      return true;
    } else {
      return false;
    }
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
        />
      </>
    );
  }
}
