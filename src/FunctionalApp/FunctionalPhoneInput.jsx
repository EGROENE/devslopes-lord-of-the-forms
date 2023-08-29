import { phoneInputs } from "../../constants"

export const FunctionalPhoneInput = ({phoneInputsParentElement, userData, handlePhoneInput}) => {
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
    )
}