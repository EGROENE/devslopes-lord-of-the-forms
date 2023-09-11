import React from "react";
import { textInputs } from "../../constants";
import { isNameValid, isEmailValid } from "../utils/validations";
import { ErrorMessage } from "../ErrorMessage";
import { allCities } from "../utils/all-cities";

class ClassTextInput extends React.Component {
  render() {
    const {
      userData,
      handleChange,
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
                  handleChange(e, input.id);
                  // if input fails its validation, then set input's error; if it passes, reset its error
                  // seems I need to base what is passed into 'show' on input's individual error state; individualization of this failed otherwise
                  // maybe put below conditional logic into separate component
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
