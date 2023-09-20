import { containsOnlyDigits } from "../utils/validations";

export const FunctionalPhoneInput = ({
  newUserPhone,
  setNewUserInputs,
  id,
  type,
  phoneInputsParentElement,
  inputIndexInPhoneInputs,
  placeholder,
  minLength,
  maxLength,
  phoneInputsLength,
}) => {
  // Call onChange of phone inputs:
  const handlePhoneInput = (index) => (e) => {
    const value = e.target.value;
    // Call containsOnlyDigits here to only allow digits to be typed in
    if (containsOnlyDigits(value)) {
      const newPhoneState = newUserPhone.map((phoneInput, phoneInputIndex) =>
        index === phoneInputIndex ? value : phoneInput
      );

      // Set phone array in state to updated state array
      setNewUserInputs((prevState) => {
        return { ...prevState, phone: newPhoneState };
      });

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
      {inputIndexInPhoneInputs !== phoneInputsLength - 1 && " - "}
    </>
  );
};
