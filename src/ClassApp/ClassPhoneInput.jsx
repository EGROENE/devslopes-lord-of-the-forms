import React from "react";
import { phoneInputs } from "../../constants";

class ClassPhoneInput extends React.Component {
  /* constructor() {
    super();
    this.phoneInputsParentElement = React.createRef();
  } */

  /* componentDidMount() {
    console.log(this.phoneInputsParentElement.current);
    console.log(Array.from(this.phoneInputsParentElement.current.children));
  } */

  /* focusPhoneInputs = (e, input) => {
    const phoneInputDOMElements = Array.from(
      this.phoneInputsParentElement.current.children
    );

    console.log(phoneInputDOMElements);
    const value = e.target.value;
    console.log(value);
    console.log(value.length);

    const maxLength = input.maxLength;
    console.log(maxLength);
    console.log(phoneInputDOMElements[phoneInputDOMElements.indexOf(input)]);
    console.log(
      phoneInputDOMElements[phoneInputDOMElements.indexOf(input) + 1]
    );

    phoneInputDOMElements[phoneInputDOMElements.indexOf(input) + 1]?.focus();
  }; */

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
              /* onChange={(e) => {
                handlePhoneInput(phoneInputs.indexOf(input));
                this.focusPhoneInputs(e, e.target);
              }} */
              //onChange={e => { this.functionOne(e); this.functionTwo() }}
            />
            {phoneInputs.indexOf(input) !== phoneInputs.length - 1 && " - "}
          </>
        ))}
      </div>
    );
  }
}

export default ClassPhoneInput;
