import { Component } from "react";
import ClassTextInput from "./ClassTextInput";
import ClassPhoneInput from "./ClassPhoneInput";
import { ErrorMessage } from "../ErrorMessage";
import { isEmailValid, isNameValid } from "../utils/validations";
import { allCities } from "../utils/all-cities";

export class ClassForm extends Component {
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

    // Yes, I know the name sounds stupid, lol
    const nonPhoneValidityCheckers = {
      firstNameIsValid: firstNameIsValid,
      lastNameIsValid: lastNameIsValid,
      emailIsValid: emailIsValid,
      cityIsValid: cityIsValid,
    };

    const areNoErrors =
      Object.values(nonPhoneValidityCheckers).every(
        (value) => value === true
      ) && this.state.isNoPhoneError;

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
        <ClassTextInput
          nonPhoneValidityCheckers={nonPhoneValidityCheckers}
          hasFailedSubmission={this.state.hasFailedSubmission}
          newUserInputs={this.state.newUserInputs}
          setNewUserInputs={this.setNewUserInputs}
          setAreNoTextInputErrors={this.setAreNoTextInputErrors}
        />

        {/* Phone inputs */}
        <div className="input-wrap">
          <label htmlFor="phone">Phone:</label>
          <ClassPhoneInput
            newUserPhone={this.state.newUserInputs.phone}
            setNewUserInputs={this.setNewUserInputs}
            setIsNoPhoneError={this.setIsNoPhoneError}
          />
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
