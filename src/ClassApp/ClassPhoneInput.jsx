import React from "react";
import { phoneInputs } from "../../constants";

class ClassPhoneInput extends React.Component {
  render() {
    return (
      <div id="phone-input-wrap">
        {phoneInputs.map((input) => (
          <>
            <input
              key={input.id}
              type={input.type}
              id={input.id}
              placeholder={input.placeholder}
              minLength={input.minLength}
              maxLength={input.maxLength}
            />
            {phoneInputs.indexOf(input) !== phoneInputs.length - 1 && " - "}
          </>
        ))}
      </div>
    );
  }
}

export default ClassPhoneInput;
