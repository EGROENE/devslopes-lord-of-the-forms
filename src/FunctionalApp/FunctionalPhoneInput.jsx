export const FunctionalPhoneInput = ({
  inputProps,
  inputIndexInPhoneInputs,
  phoneInputsLength,
}) => {
  return (
    <>
      <input
        name="phone"
        type="text"
        inputMode="number"
        value={inputProps.value}
        key={inputProps.id}
        id={inputProps.id}
        placeholder={inputProps.placeholder}
        minLength={inputProps.minLength}
        maxLength={inputProps.maxLength}
        onChange={inputProps.onChange}
      />
      {inputIndexInPhoneInputs !== phoneInputsLength - 1 && " - "}
    </>
  );
};
