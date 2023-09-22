import React from "react";
import ClassTextInput from "./ClassTextInput";
import ClassPhoneInput from "./ClassPhoneInput";
import { ErrorMessage } from "../ErrorMessage";
import {
  isEmailValid,
  isNameValid,
  isPhoneNumberValid,
  containsOnlyDigits,
} from "../utils/validations";
import { allCities } from "../utils/all-cities";
import { textInputs, phoneInputs } from "../../constants";

export class ClassForm extends React.Component {
  state = {
    /* Set to empty strings b/c values of input fields are set to these. If this were to be set to null, 'false' would appear in inputs if user hasn't entered anything. */
    userInputs: {
      email: "",
      firstName: "",
      lastName: "",
      phone: ["", "", "", ""],
      city: "",
    },
    hasFailedSubmission: false,
  };

  // This DOM parent for phone inputs is in this component, as FunctionalPhoneInput component produces only one phone input field
  phoneInputsParentElement = React.createRef();

  setUserInputs = (value, inputType) => {
    this.setState((prevState) => ({
      ...prevState,
      userInputs: {
        ...prevState.userInputs,
        [`${inputType}`]: value,
      },
    }));
  };

  // Define this here, as adding all this logic in onChange when passing to FunctionalPhoneInput.jsx would be a bit of a clusterfuck
  handlePhoneInput = (index) => (e) => {
    const value = e.target.value;
    // If input value contains only digits (not empty string in this case), set index (that corresponds w/ field's index of its parent in the DOM) of phone array in state; else, leave index of phone array in state as it is.
    if (containsOnlyDigits(value)) {
      // newPhoneState is an array, in which, if index of phone input in phoneInputs is equal to the index of the phone input in newUserPhone (phone object in newUserData, passed to this component from ClassForm), the value of that phone input in newUserPhone is set to value that user inputs (defined on first line of this function); else, the existing value of phone input remains the same.
      const newPhoneState = this.state.userInputs.phone.map(
        (phoneInput, phoneInputIndex) =>
          index === phoneInputIndex ? value : phoneInput
      );

      // Set phone array in state of ClassForm to newPhoneState:
      this.setUserInputs(newPhoneState, "phone");

      // Logic to autoskip back & forth b/t phone-input fields:
      const phoneInputDOMElements = Array.from(
        this.phoneInputsParentElement.current.children
      );
      // If length of input is equal to maxLength of its field, then focus the next field, if it exists:
      if (value.length === e.target.maxLength) {
        phoneInputDOMElements[
          phoneInputDOMElements.indexOf(e.target) + 1
        ]?.focus();
        // If, after change, there is nothing input, focus the previous field, if it exists:
      } else if (value === "") {
        phoneInputDOMElements[
          phoneInputDOMElements.indexOf(e.target) - 1
        ]?.focus();
      }
    }
  };

  render() {
    const { setUser } = this.props;

    // Validation of inputs:
    const firstNameIsValid = isNameValid(this.state.userInputs.firstName);

    const lastNameIsValid = isNameValid(this.state.userInputs.lastName);

    const emailIsValid = isEmailValid(this.state.userInputs.email);

    const cityIsValid = allCities
      .map((city) => city.toLowerCase())
      .includes(this.state.userInputs.city.toLowerCase().trim());

    const phoneNumberIsValid = isPhoneNumberValid(this.state.userInputs.phone);

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
        setUser(this.state.userInputs);
        this.setState({
          userInputs: {
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
            inputProps={{
              id: input.id,
              placeholder: input.placeholder,
              value: this.state.userInputs[input.id],
              list: input.list ? input.list : undefined,
              onChange: (e) => {
                this.setUserInputs(e.target.value, input.id);
              },
            }}
            label={input.label}
            errorMessage={
              this.state.hasFailedSubmission &&
              !validityCheckers[`${input.id}IsValid`]
                ? input.errorMessage
                : ""
            }
          />
        ))}

        {/* Phone inputs */}
        <div className="input-wrap">
          <label htmlFor="phone">Phone:</label>
          <div id="phone-input-wrap" ref={this.phoneInputsParentElement}>
            {phoneInputs.map((input) => (
              <ClassPhoneInput
                key={input.id}
                inputProps={{
                  id: input.id,
                  placeholder: input.placeholder,
                  minLength: input.minLength,
                  maxLength: input.maxLength,
                  value:
                    this.state.userInputs.phone[phoneInputs.indexOf(input)],
                  onChange: this.handlePhoneInput(phoneInputs.indexOf(input)),
                }}
                inputIndexInPhoneInputs={phoneInputs.indexOf(input)}
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
