import { ErrorMessage } from "../ErrorMessage";

export const FunctionalTextInput = ({
  inputProps: { onChange, placeholder, id, list, value },
  label,
  errorMessage,
}) => {
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
            value={value}
            list={list ? list : undefined}
            onChange={onChange}
          />
        </div>
        {errorMessage && (
          <ErrorMessage message={errorMessage} show={Boolean(errorMessage)} />
        )}
      </div>
    </>
  );
};
