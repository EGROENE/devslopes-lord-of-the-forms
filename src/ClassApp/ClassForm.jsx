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
    /* Set to empty strings b/c values of input fields are set to these. If this were to be set to null, 'false' would appear in inputs if user hasn't entered anything. */
    newUserInputs: {
      email: "",
      firstName: "",
      lastName: "",
      phone: ["", "", "", ""],
      city: "",
    },
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

  // This DOM parent for phone inputs is in this component, as FunctionalPhoneInput component produces only one phone input field
  phoneInputsParentElement = React.createRef();

  render() {
    const { setUser } = this.props;

    // Validation of inputs:
    const firstNameIsValid = isNameValid(this.state.newUserInputs.firstName);

    const lastNameIsValid = isNameValid(this.state.newUserInputs.lastName);

    const emailIsValid = isEmailValid(this.state.newUserInputs.email);

    const cityIsValid = allCities
      .map((city) => city.toLowerCase())
      .includes(this.state.newUserInputs.city.toLowerCase().trim());

    const phoneNumberIsValid = isPhoneNumberValid(
      this.state.newUserInputs.phone
    );

    const validityCheckers = {
      firstNameIsValid: firstNameIsValid,
      lastNameIsValid: lastNameIsValid,
      emailIsValid: emailIsValid,
      cityIsValid: cityIsValid,
      phoneNumberIsValid: phoneNumberIsValid,
    };

    const areNoErrors = Object.values(validityCheckers).every(
      (value) => value === true
    );

    const handleSubmission = (e) => {
      e.preventDefault();
      if (areNoErrors) {
        // Set 'registered' user account data. This data will appear in profile info box after successful submission.
        setUser(this.state.newUserInputs);
        this.setState({
          newUserInputs: {
            email: "",
            firstName: "",
            lastName: "",
            phone: ["", "", "", ""],
            city: "",
          },
          hasFailedSubmission: false,
        });
      } else {
        alert("Bad inputs.");
        this.setState((prevState) => ({
          ...prevState,
          hasFailedSubmission: true,
        }));
      }
    };

    return (
      <form onSubmit={handleSubmission}>
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
                phoneInputsLength={phoneInputs.length}
              />
            ))}
          </div>
        </div>
        {this.state.hasFailedSubmission && (
          <ErrorMessage
            message="Invalid Phone Number"
            show={!validityCheckers.phoneNumberIsValid}
          />
        )}

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
