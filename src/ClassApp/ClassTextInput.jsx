import React from "react";
import { textInputs } from "../../constants";
//import { isNameValid, isEmailValid } from "../utils/validations";
import { ErrorMessage } from "../ErrorMessage";
//import { allCities } from "../utils/all-cities";

class ClassTextInput extends React.Component {
  render() {
    const {
      newUserInputs,
      setNewUserInputs,
      hasFailedSubmission,
      nonPhoneValidityCheckers,
    } = this.props;

    // Declared here in render b/c some props are used
    const handleNonPhoneTextInput = (e, inputType) => {
      const value = e.target.value;
      setNewUserInputs(value, inputType);
    };

    return (
      <>
        {textInputs.map((input) => (
          <div key={input.key}>
            <div className="input-wrap">
              <label>{input.label}</label>
              <input
                type="text"
                placeholder={input.placeholder}
                value={newUserInputs[`${input.key}`]}
                list={input.list}
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
  }
}

export default ClassTextInput;
