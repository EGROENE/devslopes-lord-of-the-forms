import React from "react";
import { containsOnlyDigits } from "../utils/validations";
import { phoneInputs } from "../../constants";

class ClassPhoneInput extends React.Component {
  render() {
    const {
      newUserPhone,
      setNewUserInputs,
      id,
      type,
      phoneInputsParentElement,
      inputIndexInPhoneInputs,
      placeholder,
      minLength,
      maxLength,
    } = this.props;

    const handlePhoneInput = (index) => (e) => {
      const value = e.target.value;
      // If input value contains only digits (not empty string in this case), set index (that corresponds w/ field's index of its parent in the DOM) of phone array in state; else, leave index of phone array in state as it is.
      if (containsOnlyDigits(value)) {
        // newPhoneState is an array, in which, if index of phone input in phoneInputs is equal to the index of the phone input in newUserPhone (phone object in newUserData, passed to this component from ClassForm), the value of that phone input in newUserPhone is set to value that user inputs (defined on first line of this function); else, the existing value of phone input remains the same.
        const newPhoneState = newUserPhone.map((phoneInput, phoneInputIndex) =>
          index === phoneInputIndex ? value : phoneInput
        );

        // Set phone array in state of ClassForm to newPhoneState:
        setNewUserInputs(newPhoneState, "phone");

        // Logic to autoskip back & forth b/t phone-input fields:
        const phoneInputDOMElements = Array.from(
          phoneInputsParentElement.current.children
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

    return (
      <>
        <input
          value={newUserPhone[inputIndexInPhoneInputs]}
          key={id}
          type={type}
          id={id}
          inputMode="number"
          placeholder={placeholder}
          minLength={minLength}
          maxLength={maxLength}
          onChange={handlePhoneInput(inputIndexInPhoneInputs)}
        />
        {inputIndexInPhoneInputs !== phoneInputs.length - 1 && " - "}
      </>
    );
  }
}

export default ClassPhoneInput;
