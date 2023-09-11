import { Component } from "react";
import ClassTextInput from "./ClassTextInput";
import ClassPhoneInput from "./ClassPhoneInput";
import { ErrorMessage } from "../ErrorMessage";

export class ClassForm extends Component {
  render() {
    const {
      userData,
      inputErrors,
      handleTextInputChange,
      setErrors,
      resetErrors,
      handlePhoneInput,
      phoneInputsParentElement,
      hasFailedSubmission,
      handleSubmission,
    } = this.props;
    return (
      <form onSubmit={handleSubmission}>
        <u>
          <h3>User Information Form</h3>
        </u>

        {/* Text inputs (first/last names, email) */}
        <ClassTextInput
          inputErrors={inputErrors}
          hasFailedSubmission={hasFailedSubmission}
          handleTextInputChange={handleTextInputChange}
          userData={userData}
          setErrors={setErrors}
          resetErrors={resetErrors}
        />

        {/* Phone inputs */}
        <div className="input-wrap">
          <label htmlFor="phone">Phone:</label>
          <ClassPhoneInput
            handlePhoneInput={handlePhoneInput}
            userData={userData}
            phoneInputsParentElement={phoneInputsParentElement}
          />
        </div>
        {hasFailedSubmission && (
          <ErrorMessage
            message="Invalid Phone Number"
            show={inputErrors.phoneError}
          />
        )}

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
