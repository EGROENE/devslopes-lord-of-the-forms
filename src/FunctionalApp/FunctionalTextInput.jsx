import { textInputs } from "../../constants";
import { ErrorMessage } from "../ErrorMessage";

export const FunctionalTextInput = ({
  handleNonPhoneTextInput,
  hasFailedSubmission,
  inputErrors,
  userData,
}) => {
  return (
    <>
      {textInputs.map((input) => (
        <div key={input.id}>
          <div className="input-wrap">
            <label>{input.label}</label>
            <input
              type="text"
              placeholder={input.placeholder}
              value={userData[`${input.id}`]}
              list={input.list ? input.list : undefined}
              onChange={(e) => {
                handleNonPhoneTextInput(e, input.id);
              }}
            />
          </div>
          {hasFailedSubmission && (
            <ErrorMessage
              message={input.errorMessage}
              show={inputErrors[`${input.id}Error`]}
            />
          )}
        </div>
      ))}
    </>
  );
};
