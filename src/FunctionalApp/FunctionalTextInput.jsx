import { textInputs } from "../../constants";
import { ErrorMessage } from "../ErrorMessage";
import { isEmailValid, isNameValid } from "../utils/validations";
import { allCities } from "../utils/all-cities";

export const FunctionalTextInput = ({
  setErrors,
  resetErrors,
  setUserData,
  hasFailedSubmission,
  inputErrors,
  userData,
}) => {
  const handleNonPhoneTextInput = (e, inputType) => {
    const value = e.target.value;
    setUserData((prevState) => {
      return { ...prevState, [`${inputType}`]: value };
    });
    // Set/reset errors in state, depending on the type of input this method is called on when changed:
    if (inputType === "firstName" || inputType === "lastName") {
      if (!isNameValid(e.target.value)) {
        setErrors(inputType);
      } else {
        resetErrors(inputType);
      }
    } else if (inputType === "email") {
      if (!isEmailValid(e.target.value)) {
        setErrors(inputType);
      } else {
        resetErrors(inputType);
      }
    } else if (inputType === "city") {
      if (
        !allCities
          .map((city) => city.toLowerCase())
          .includes(e.target.value.toLowerCase())
      ) {
        setErrors(inputType);
      } else {
        resetErrors(inputType);
      }
    }
  };

  return (
    <>
      {textInputs.map((input) => (
        <div key={input.id}>
          <div className="input-wrap">
            <label>{input.label}</label>
            <input
              type="text"
              placeholder={input.placeholder}
              value={userData[`${input.id}`]}
              list={input.list ? input.list : undefined}
              onChange={(e) => {
                handleNonPhoneTextInput(e, input.id);
              }}
            />
          </div>
          {hasFailedSubmission && (
            <ErrorMessage
              message={input.errorMessage}
              show={inputErrors[`${input.id}Error`]}
            />
          )}
        </div>
      ))}
    </>
  );
};
