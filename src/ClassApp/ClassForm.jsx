import React from "react";
import ClassTextInput from "./ClassTextInput";
import ClassPhoneInput from "./ClassPhoneInput";
import { ErrorMessage } from "../ErrorMessage";
import {
  isEmailValid,
  isNameValid,
  isPhoneNumberValid,
} from "../utils/validations";
import { allCities } from "../utils/all-cities";
import { textInputs, phoneInputs } from "../../constants";

export class ClassForm extends React.Component {
  state = {
    newUserInputs: {
      email: "",
      firstName: "",
      lastName: "",
      phone: ["", "", "", ""],
      city: "",
    },
    areNoTextInputErrors: false,
    isNoPhoneError: false,
    hasFailedSubmission: false,
  };

  phoneInputsParentElement = React.createRef();

  setNewUserInputs = (value, inputType) => {
    this.setState((prevState) => ({
      ...prevState,
      newUserInputs: {
        ...prevState.newUserInputs,
        [`${inputType}`]: value,
      },
    }));
  };

  // value param is equal to a boolean
  setAreNoTextInputErrors = (value) => {
    this.setState((prevState) => ({
      ...prevState,
      areNoTextInputErrors: value,
    }));
  };

  // value param is equal to a boolean
  setIsNoPhoneError = (value) => {
    this.setState((prevState) => ({
      ...prevState,
      isNoPhoneError: value,
    }));
  };

  handleSubmission = (e) => {
    e.preventDefault();
    this.setState({
      newUserInputs: {
        email: "",
        firstName: "",
        lastName: "",
        phone: ["", "", "", ""],
        city: "",
      },
      hasFailedSubmission: false,
      areNoTextInputErrors: false,
      isNoPhoneError: false,
    });
  };

  handleFormRejection = (e) => {
    e.preventDefault();
    alert("Bad inputs.");
    this.setState((prevState) => ({
      ...prevState,
      hasFailedSubmission: true,
    }));
  };

  render() {
    const { setUser } = this.props;

    const firstNameIsValid = isNameValid(this.state.newUserInputs.firstName);

    const lastNameIsValid = isNameValid(this.state.newUserInputs.lastName);

    const emailIsValid = isEmailValid(this.state.newUserInputs.email);

    const cityIsValid = allCities
      .map((city) => city.toLowerCase())
      .includes(this.state.newUserInputs.city.toLowerCase().trim());

    const phoneNumberIsValid = isPhoneNumberValid(
      this.state.newUserInputs.phone
    );

    // Yes, I know the name sounds stupid, lol
    const validityCheckers = {
      firstNameIsValid: firstNameIsValid,
      lastNameIsValid: lastNameIsValid,
      emailIsValid: emailIsValid,
      cityIsValid: cityIsValid,
      phoneNumberIsValid: phoneNumberIsValid,
    };

    const areNoErrors =
      Object.values(validityCheckers).every((value) => value === true) &&
      this.state.isNoPhoneError;

    // Called if there are no errors onSubmit of form. Sets user in state of ClassApp & resets state values of this component.
    const setUserAndHandleSubmission = (e) => {
      setUser(this.state.newUserInputs);
      this.handleSubmission(e);
    };

    return (
      <form
        onSubmit={(e) =>
          areNoErrors
            ? setUserAndHandleSubmission(e)
            : this.handleFormRejection(e)
        }
      >
        <u>
          <h3>User Information Form</h3>
        </u>

        {/* Text inputs (first/last names, email, city) */}
        {textInputs.map((input) => (
          <ClassTextInput
            key={input.id}
            newUserInputs={this.state.newUserInputs}
            setNewUserInputs={this.setNewUserInputs}
            id={input.id}
            label={input.label}
            placeholder={input.placeholder}
            list={input.list}
            errorMessage={input.errorMessage}
            validityCheckers={validityCheckers}
            hasFailedSubmission={this.state.hasFailedSubmission}
          />
        ))}

        {/* Phone inputs */}
        <div className="input-wrap">
          <label htmlFor="phone">Phone:</label>
          <div id="phone-input-wrap" ref={this.phoneInputsParentElement}>
            {phoneInputs.map((input) => (
              <ClassPhoneInput
                key={input.id}
                id={input.id}
                phoneInputsParentElement={this.phoneInputsParentElement}
                type={input.type}
                newUserPhone={this.state.newUserInputs.phone}
                setNewUserInputs={this.setNewUserInputs}
                inputIndexInPhoneInputs={phoneInputs.indexOf(input)}
                placeholder={input.placeholder}
                minLength={input.minLength}
                maxLength={input.maxLength}
              />
            ))}
          </div>
        </div>
        {this.state.hasFailedSubmission && (
          <ErrorMessage
            message="Invalid Phone Number"
            show={!this.state.isNoPhoneError}
          />
        )}

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
