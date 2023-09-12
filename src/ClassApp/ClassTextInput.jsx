import React from "react";
import { textInputs } from "../../constants";
import { isNameValid, isEmailValid } from "../utils/validations";
import { ErrorMessage } from "../ErrorMessage";
import { allCities } from "../utils/all-cities";

class ClassTextInput extends React.Component {
  render() {
    const {
      userData,
      handleNonPhoneTextInput,
      setErrors,
      resetErrors,
      hasFailedSubmission,
      inputErrors,
    } = this.props;
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
                  if (input.id === "firstName" || input.id === "lastName") {
                    if (!isNameValid(e.target.value)) {
                      setErrors(input.id);
                    } else {
                      resetErrors(input.id);
                    }
                  } else if (input.id === "email") {
                    if (!isEmailValid(e.target.value)) {
                      setErrors(input.id);
                    } else {
                      resetErrors(input.id);
                    }
                  } else if (input.id === "city") {
                    if (
                      !allCities
                        .map((city) => city.toLowerCase())
                        .includes(e.target.value.toLowerCase())
                    ) {
                      setErrors(input.id);
                    } else {
                      resetErrors(input.id);
                    }
                  }
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
  }
}

export default ClassTextInput;
