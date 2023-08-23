import { Component } from "react";
import { ClassForm } from "./ClassForm";
import { ProfileInformation } from "../ProfileInformation";

/* const defaultUser = {
  email: "default@default.com",
  firstName: "Default",
  lastName: "Default",
  phone: "1234567",
  city: "Hobbiton",
}; */

export class ClassApp extends Component {
  state = {
    userData: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      city: "",
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

  isNameValid = (e, nameType) => {
    const value = e.target.value;
    // Should this not got here, but instead be part of both setStates in conditionals below? Seems more efficient, but should this be used only once? Which is the highest priority?
    /* this.setState((prevState) => ({
      ...prevState,
      userData: {
        ...prevState.userData,
        [`${nameType}`]: value,
      },
    })); */
    if (
      value
        .split("")
        .every((char) => char.toLowerCase() !== char.toUpperCase()) &&
      value.length > 2
    ) {
      this.setState((prevState) => ({
        ...prevState,
        inputErrors: {
          ...prevState.inputErrors,
          [`${nameType}Error`]: false,
        },
      }));
    } else {
      this.setState((prevState) => ({
        ...prevState,
        inputErrors: {
          ...prevState.inputErrors,
          [`${nameType}Error`]: true,
        },
      }));
    }
  };

  isEmailValid = (e) => {
    let value = e.target.value;
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
          isEmailValid={this.isEmailValid}
        />
      </>
    );
  }
}
