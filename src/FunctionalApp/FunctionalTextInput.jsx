import { ErrorMessage } from "../ErrorMessage";

export const FunctionalTextInput = ({
  hasFailedSubmission,
  newUserInputs,
  setNewUserInputs,
  id,
  label,
  placeholder,
  list,
  errorMessage,
  validityCheckers,
}) => {
  const handleNonPhoneTextInput = (e, inputType) => {
    const value = e.target.value;
    setNewUserInputs((prevState) => {
      return { ...prevState, [`${inputType}`]: value };
    });
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
            list={list ? list : undefined}
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
};
