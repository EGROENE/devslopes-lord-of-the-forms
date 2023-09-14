import { textInputs } from "../../constants";
import { ErrorMessage } from "../ErrorMessage";
import { isEmailValid, isNameValid } from "../utils/validations";
import { allCities } from "../utils/all-cities";
import { useEffect } from "react";

export const FunctionalTextInput = ({
  hasFailedSubmission,
  newUserInputs,
  setNewUserInputs,
  setAreNoTextInputErrors,
}) => {
  const handleNonPhoneTextInput = (e, inputType) => {
    const value = e.target.value;
    setNewUserInputs((prevState) => {
      return { ...prevState, [`${inputType}`]: value };
    });
  };

  const firstNameIsValid = isNameValid(newUserInputs.firstName);

  const lastNameIsValid = isNameValid(newUserInputs.lastName);

  const emailIsValid = isEmailValid(newUserInputs.email);

  const cityIsValid = allCities
    .map((city) => city.toLowerCase())
    .includes(newUserInputs.city.toLowerCase().trim());

  const nonPhoneValidityCheckers = {
    firstNameIsValid: firstNameIsValid,
    lastNameIsValid: lastNameIsValid,
    emailIsValid: emailIsValid,
    cityIsValid: cityIsValid,
  };
  // areNoTextInputErrors is set to true if all values of nonPhoneValidityCheckers are true; else, it is set to false.
  // setAreNoTextInputErrors outside of a useEffect throws: Warning: Cannot update a component (`FunctionalForm`) while rendering a different component (`FunctionalTextInput`). To locate the bad setState() call inside `FunctionalTextInput`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render
  /* setAreNoTextInputErrors(
    Object.values(nonPhoneValidityCheckers).every((value) => value === true)
  ); */
  useEffect(() => {
    setAreNoTextInputErrors(
      Object.values(nonPhoneValidityCheckers).every((value) => value === true)
    );
  });

  return (
    <>
      {textInputs.map((input) => (
        <div key={input.key}>
          <div className="input-wrap">
            <label>{input.label}</label>
            <input
              type="text"
              placeholder={input.placeholder}
              value={
                newUserInputs !== null ? newUserInputs[`${input.key}`] : ""
              }
              list={input.list ? input.list : undefined}
              onChange={(e) => {
                handleNonPhoneTextInput(e, input.key);
              }}
            />
          </div>
          {hasFailedSubmission && (
            <ErrorMessage
              message={input.errorMessage}
              show={!nonPhoneValidityCheckers[`${input.key}IsValid`]}
            />
          )}
        </div>
      ))}
    </>
  );
};
