import { ErrorMessage } from "../ErrorMessage";
import { FunctionalTextInput } from "./FunctionalTextInput";
import { allCities } from "../utils/all-cities";
import { FunctionalPhoneInput } from "./FunctionalPhoneInput";

export const FunctionalForm = ({
  userData,
  inputErrors,
  handleChange,
  attemptedSubmissionTally,
  handleSubmission,
  setErrors,
  resetErrors,
  handlePhoneInput,
  phoneInputsParentElement,
}) => {
  return (
    <form onSubmit={handleSubmission}>
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* Text inputs (first/last names, email) */}
      <FunctionalTextInput
        handleChange={handleChange}
        setErrors={setErrors}
        resetErrors={resetErrors}
        attemptedSubmissionTally={attemptedSubmissionTally}
        inputErrors={inputErrors}
        userData={userData}
      />

      {/* City Input */}
      <div className="input-wrap">
        <label htmlFor="city">City:</label>
        <select name="city" id="city" onChange={(e) => handleChange(e, "city")}>
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
        <FunctionalPhoneInput
          phoneInputsParentElement={phoneInputsParentElement}
          userData={userData}
          handlePhoneInput={handlePhoneInput}
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
};
