import React from "react";
//import { similarInputs } from "../../constants";
//import { ErrorMessage } from "../ErrorMessage";

class ClassTextInput extends React.Component {
  render() {
    const { input, value, onChange } = this.props;
    return (
      <div className="input-wrap">
        <label>{input.label}:</label>
        <input
          placeholder={input.placeholder}
          value={value}
          onChange={onChange}
        ></input>
        {/* <ErrorMessage message={input.errorMessage} /> */}
      </div>
    );
  }
}

export default ClassTextInput;
