import { ErrorMessage } from "../ErrorMessage";
import { FunctionalTextInput } from "./FunctionalTextInput";
import { allCities } from "../utils/all-cities";
import { FunctionalPhoneInput } from "./FunctionalPhoneInput";

/* const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number"; */

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

      {/* <div className="input-wrap">
        <label htmlFor="phone">Phone:</label>
        <div id="phone-input-wrap">
          <input type="text" id="phone-input-1" placeholder="55" />
          -
          <input type="text" id="phone-input-2" placeholder="55" />
          -
          <input type="text" id="phone-input-3" placeholder="55" />
          -
          <input type="text" id="phone-input-4" placeholder="5" />
        </div>
      </div>

      <ErrorMessage message={phoneNumberErrorMessage} show={true} /> */}

      <input type="submit" value="Submit" />
    </form>
  );
};
