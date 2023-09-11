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
  const [hasFailedSubmission, setHasFailedSubmission] = useState(false);
  const [hasFormBeenSubmittedAtLeastOnce, setHasFormBeenSubmittedAtLeastOnce] =
    useState(false);

  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation
        hasFormBeenSubmittedAtLeastOnce={hasFormBeenSubmittedAtLeastOnce}
        setHasFailedSubmission={setHasFormBeenSubmittedAtLeastOnce}
        prevUserData={prevUserData}
        setPrevUserData={setPrevUserData}
      />
      <FunctionalForm
        hasFailedSubmission={hasFailedSubmission}
        setHasFailedSubmission={setHasFailedSubmission}
        setPrevUserData={setPrevUserData}
        hasFormBeenSubmittedAtLeastOnce={hasFormBeenSubmittedAtLeastOnce}
        setHasFormBeenSubmittedAtLeastOnce={setHasFormBeenSubmittedAtLeastOnce}
      />
    </>
  );
};
