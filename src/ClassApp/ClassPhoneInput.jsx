import React from "react";

class ClassPhoneInput extends React.Component {
  render() {
    const { inputProps, inputIndexInPhoneInputs, phoneInputsLength } =
      this.props;

    return (
      <>
        <input
          value={inputProps.value}
          key={inputProps.id}
          type="text"
          id={inputProps.id}
          inputMode="number"
          placeholder={inputProps.placeholder}
          minLength={inputProps.minLength}
          maxLength={inputProps.maxLength}
          onChange={inputProps.onChange}
        />
        {inputIndexInPhoneInputs !== phoneInputsLength - 1 && " - "}
      </>
    );
  }
}

export default ClassPhoneInput;
