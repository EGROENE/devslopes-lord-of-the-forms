import { Component } from "react";
import ClassTextInput from "./ClassTextInput";
import { allCities } from "../utils/all-cities";
import ClassPhoneInput from "./ClassPhoneInput";
import { ErrorMessage } from "../ErrorMessage";

export class ClassForm extends Component {
  render() {
    const {
      userData,
      inputErrors,
      handleChange,
      setErrors,
      resetErrors,
      handlePhoneInput,
      phoneInputsParentElement,
      attemptedSubmissionTally,
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
          attemptedSubmissionTally={attemptedSubmissionTally}
          handleChange={handleChange}
          userData={userData}
          setErrors={setErrors}
          resetErrors={resetErrors}
        />

        {/* Dropdown input for city */}
        <div className="input-wrap">
          <label htmlFor="city">City:</label>
          <select
            name="city"
            id="city"
            onChange={(e) => handleChange(e, "city")}
          >
            {allCities.map((city) => (
              <option key={city} selected={city === userData.city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Phone inputs */}
        <div className="input-wrap">
          <label htmlFor="phone">Phone:</label>
          <ClassPhoneInput
            inputErrors={inputErrors}
            attemptedSubmissionTally={attemptedSubmissionTally}
            handlePhoneInput={handlePhoneInput}
            userData={userData}
            phoneInputsParentElement={phoneInputsParentElement}
          />
        </div>
        {attemptedSubmissionTally > 0 && (
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
