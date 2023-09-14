import { useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { FunctionalTextInput } from "./FunctionalTextInput";
import { FunctionalPhoneInput } from "./FunctionalPhoneInput";

export const FunctionalForm = ({ setUser }) => {
  /* Set to empty strings b/c values of input fields are set to these. If this were to be set to null, 'false' would appear in inputs if user hasn't entered anything. */
  const [newUserInputs, setNewUserInputs] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: ["", "", "", ""],
    city: "",
  });

  const [areNoTextInputErrors, setAreNoTextInputErrors] = useState(false);

  const [isNoPhoneError, setIsNoPhoneError] = useState(false);

  const [hasFailedSubmission, setHasFailedSubmission] = useState(false);

  const handleSubmission = (e) => {
    e.preventDefault();

    const areNoErrors = areNoTextInputErrors && isNoPhoneError;

    // If no errors...
    if (areNoErrors) {
      // Set 'registered' user account data. This data will appear in profile info box after successful submission.
      setUser({ ...newUserInputs });
      /* Reset to empty strings b/c values of input fields are set to these. If this were to be set to null, 'false' would appear in inputs if user hasn't entered anything. */
      setNewUserInputs({
        email: "",
        firstName: "",
        lastName: "",
        phone: ["", "", "", ""],
        city: "",
      });
      setHasFailedSubmission(false);
    } else {
      alert("Bad inputs.");
      setHasFailedSubmission(true);
    }
  };

  return (
    <form onSubmit={handleSubmission}>
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* Text inputs (first/last names, email, city) */}
      <FunctionalTextInput
        hasFailedSubmission={hasFailedSubmission}
        newUserInputs={newUserInputs}
        setNewUserInputs={setNewUserInputs}
        setAreNoTextInputErrors={setAreNoTextInputErrors}
      />

      {/* Phone inputs */}
      <div className="input-wrap">
        <label htmlFor="phone">Phone:</label>
        <FunctionalPhoneInput
          newUserPhone={newUserInputs.phone}
          setNewUserInputs={setNewUserInputs}
          setIsNoPhoneError={setIsNoPhoneError}
        />
      </div>
      {hasFailedSubmission && (
        <ErrorMessage message="Invalid Phone Number" show={!isNoPhoneError} />
      )}

      <input type="submit" value="Submit" />
    </form>
  );
};
