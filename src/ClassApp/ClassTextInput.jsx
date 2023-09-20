import React from "react";
import { ErrorMessage } from "../ErrorMessage";

class ClassTextInput extends React.Component {
  render() {
    const {
      newUserInputs,
      setNewUserInputs,
      id,
      label,
      placeholder,
      list,
      errorMessage,
      hasFailedSubmission,
      validityCheckers,
    } = this.props;

    // Declared here in render b/c some props are used
    const handleNonPhoneTextInput = (e, inputType) => {
      const value = e.target.value;
      setNewUserInputs(value, inputType);
    };

    return (
      <>
        <div>
          <div className="input-wrap">
            <label htmlFor={id}>{label}</label>
            <input
              id={id}
              autoComplete="on"
              type="text"
              inputMode="text"
              placeholder={placeholder}
              value={newUserInputs[`${id}`]}
              list={list}
              onChange={(e) => {
                handleNonPhoneTextInput(e, id);
              }}
            />
          </div>
          {hasFailedSubmission && (
            <ErrorMessage
              message={errorMessage}
              show={!validityCheckers[`${id}IsValid`]}
            />
          )}
        </div>
      </>
    );
  }
}

export default ClassTextInput;
