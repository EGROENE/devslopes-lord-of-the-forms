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
  const [hasFormBeenSubmittedAtLeastOnce, setHasFormBeenSubmittedAtLeastOnce] =
    useState(false);

  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation
        hasFormBeenSubmittedAtLeastOnce={hasFormBeenSubmittedAtLeastOnce}
        setAttemptedSubmissionTally={setHasFormBeenSubmittedAtLeastOnce}
        prevUserData={prevUserData}
        setPrevUserData={setPrevUserData}
      />
      <FunctionalForm
        attemptedSubmissionTally={attemptedSubmissionTally}
        setAttemptedSubmissionTally={setAttemptedSubmissionTally}
        setPrevUserData={setPrevUserData}
        hasFormBeenSubmittedAtLeastOnce={hasFormBeenSubmittedAtLeastOnce}
        setHasFormBeenSubmittedAtLeastOnce={setHasFormBeenSubmittedAtLeastOnce}
      />
    </>
  );
};
