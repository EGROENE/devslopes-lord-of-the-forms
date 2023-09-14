import { useRef } from "react";
import { phoneInputs } from "../../constants";
import { containsOnlyDigits } from "../utils/validations";

export const FunctionalPhoneInput = ({
  newUserPhone,
  setNewUserInputs,
  setIsNoPhoneError,
}) => {
  const phoneInputsParentElement = useRef(0);

  // Call onChange of phone inputs:
  const handlePhoneInput = (index) => (e) => {
    const value = e.target.value;
    if (containsOnlyDigits(value)) {
      const newPhoneState = newUserPhone.map((phoneInput, phoneInputIndex) =>
        index === phoneInputIndex ? value : phoneInput
      );

      // Set phone array in state to updated state array
      setNewUserInputs((prevState) => {
        return { ...prevState, phone: newPhoneState };
      });

      /* If length of string containing only the digits in newUserPhone is not equal to 6 (account for delay in setting of state above), set isNoPhoneError to true; else, to false: */
      if (newUserPhone.toString().replace(/,/g, "").length !== 6) {
        setIsNoPhoneError(false);
      } else {
        setIsNoPhoneError(true);
      }

      // Logic to autoskip back & forth b/t phone-input fields:
      const phoneInputDOMElements = Array.from(
        phoneInputsParentElement.current.children
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

  return (
    <div id="phone-input-wrap" ref={phoneInputsParentElement}>
      {phoneInputs.map((input) => (
        <>
          <input
            value={newUserPhone && newUserPhone[phoneInputs.indexOf(input)]}
            key={input.id}
            type={input.type}
            id={input.id}
            placeholder={input.placeholder}
            minLength={input.minLength}
            maxLength={input.maxLength}
            onChange={handlePhoneInput(phoneInputs.indexOf(input))}
          />
          {phoneInputs.indexOf(input) !== phoneInputs.length - 1 && " - "}
        </>
      ))}
    </div>
  );
};
