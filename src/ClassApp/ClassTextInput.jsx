import React from "react";

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
