import { useState } from "react";
import { ProfileInformation } from "../ProfileInformation";
import { FunctionalForm } from "./FunctionalForm";

export const FunctionalApp = () => {
  const { userData, setUserData } = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: ["", "", "", ""],
    city: "Hobbiton",
  });
  const { inputErrors, setInputErrors } = useState({
    emailError: true,
    firstName: true,
    lastNameError: true,
    phoneError: true,
    cityError: true,
  });
  const { attemptedSubmissionTally, setAttemptedSubmissionTally } = useState(0);
  const { successfulSubmissionTally, setSuccessfulSubmissionTally } =
    useState(0);
  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation userData={null} />
      <FunctionalForm />
    </>
  );
};
