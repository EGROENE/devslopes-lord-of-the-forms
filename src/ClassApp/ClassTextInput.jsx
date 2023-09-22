import React from "react";
import { ErrorMessage } from "../ErrorMessage";

class ClassTextInput extends React.Component {
  render() {
    const { inputProps, label, errorMessage } = this.props;

    return (
      <>
        <div>
          <div className="input-wrap">
            <label htmlFor={inputProps.id}>{label}</label>
            <input
              id={inputProps.id}
              autoComplete="on"
              type="text"
              inputMode="text"
              placeholder={inputProps.placeholder}
              value={inputProps.value}
              list={inputProps.list}
              onChange={inputProps.onChange}
            />
          </div>
          {errorMessage && (
            <ErrorMessage message={errorMessage} show={Boolean(errorMessage)} />
          )}
        </div>
      </>
    );
  }
}

export default ClassTextInput;
