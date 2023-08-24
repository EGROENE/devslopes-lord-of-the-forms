import { Component } from "react";
import { ErrorMessage } from "../ErrorMessage";
import ClassTextInput from "./ClassTextInput";
// Generate a ClassTextInput for every item in inputInfo:
import { inputInfo } from "../../constants";
import { allCities } from "../utils/all-cities";
import { isEmailValid } from "../utils/validations";

/* const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid"; */
const phoneNumberErrorMessage = "Invalid Phone Number";

export class ClassForm extends Component {
  render() {
    const { userData, inputErrors, isNameValid, handleChange } = this.props;
    return (
      <form>
        <u>
          <h3>User Information Form</h3>
        </u>
        {inputInfo.map((input) => (
          <>
            <ClassTextInput
              input={input}
              value={userData[`${input.id}`]}
              onChange={(e) => {
                isNameValid(e, input.id);
                if (input.id.includes("Name")) {
                  handleChange(e, input.id);
                } else {
                  isEmailValid(e);
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
          <select name="city" id="city">
            {allCities.map((city) => (
              <option key={city} selected={city === "Hobbiton"}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className="input-wrap">
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

        <ErrorMessage message={phoneNumberErrorMessage} />

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
