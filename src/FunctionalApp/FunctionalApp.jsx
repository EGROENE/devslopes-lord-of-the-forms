import { useState } from "react";
import { ProfileInformation } from "../ProfileInformation";
import { FunctionalForm } from "./FunctionalForm";

export const FunctionalApp = () => {
  const [prevUserData, setPrevUserData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
  });
  const [attemptedSubmissionTally, setAttemptedSubmissionTally] = useState(0);
  const [successfulSubmissionTally, setSuccessfulSubmissionTally] = useState(0);

  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation
        successfulSubmissionTally={successfulSubmissionTally}
        setAttemptedSubmissionTally={setSuccessfulSubmissionTally}
        prevUserData={prevUserData}
        setPrevUserData={setPrevUserData}
      />
      <FunctionalForm
        attemptedSubmissionTally={attemptedSubmissionTally}
        setAttemptedSubmissionTally={setAttemptedSubmissionTally}
        setPrevUserData={setPrevUserData}
        successfulSubmissionTally={successfulSubmissionTally}
        setSuccessfulSubmissionTally={setSuccessfulSubmissionTally}
      />
    </>
  );
};
