import React from "react";
import { phoneInputs } from "../../constants";

class ClassPhoneInput extends React.Component {
  render() {
    const { userData, handlePhoneInput, phoneInputsParentElement } = this.props;
    return (
      <div id="phone-input-wrap" ref={phoneInputsParentElement}>
        {phoneInputs.map((input) => (
          <>
            <input
              value={userData.phone[phoneInputs.indexOf(input)]}
              key={input.id}
              type={input.type}
              id={input.id}
              placeholder={input.placeholder}
              minLength={input.minLength}
              maxLength={input.maxLength}
              onChange={handlePhoneInput(phoneInputs.indexOf(input))}
            />
            {phoneInputs.indexOf(input) !== phoneInputs.length - 1 && " - "}
          </>
        ))}
      </div>
    );
  }
}

export default ClassPhoneInput;
