import { Component } from "react";
import { ErrorMessage } from "../ErrorMessage";
import ClassTextInput from "./ClassTextInput";
// Generate a ClassTextInput for every item in similarInputs:
import { similarInputs } from "../../constants";
import { allCities } from "../utils/all-cities";
import { isNameValid, isEmailValid } from "../utils/validations";
import ClassPhoneInput from "./ClassPhoneInput";

/* const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number"; */

export class ClassForm extends Component {
  render() {
    const {
      userData,
      inputErrors,
      handleChange,
      setErrors,
      resetErrors,
      handlePhoneInput,
    } = this.props;
    return (
      <form>
        <u>
          <h3>User Information Form</h3>
        </u>
        {similarInputs.map((input) => (
          <>
            <ClassTextInput
              input={input}
              value={userData[`${input.id}`]}
              onChange={(e) => {
                handleChange(e, input.id);
                // if input fails its validation, then set input's error; if it passes, reset its error
                // seems I need to base what is passed into 'show' on input's individual error state; individualization of this failed otherwise
                if (input.id.includes("Name")) {
                  if (!isNameValid(e.target.value)) {
                    // call setErrors
                    setErrors(input.id);
                  } else {
                    // call resetErrors
                    resetErrors(input.id);
                  }
                } else if (input.id.includes("email")) {
                  if (!isEmailValid(e.target.value)) {
                    // call setErrors
                    setErrors(input.id);
                  } else {
                    // call resetErrors
                    resetErrors(input.id);
                  }
                }
              }}
            />
            <ErrorMessage
              message={input.errorMessage}
              show={inputErrors[`${input.id}Error`]}
            />
          </>
        ))}

        <div className="input-wrap">
          <label htmlFor="city">City:</label>
          <select
            name="city"
            id="city"
            onChange={(e) => handleChange(e, "city")}
          >
            {allCities.map((city) => (
              <option key={city} selected={city === "Hobbiton"}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className="input-wrap">
          <label htmlFor="phone">Phone:</label>
          <ClassPhoneInput
            handlePhoneInput={handlePhoneInput}
            userData={userData}
          />
        </div>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
