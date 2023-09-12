import { useState } from "react";
import { ProfileInformation } from "../ProfileInformation";
import { FunctionalForm } from "./FunctionalForm";

export const FunctionalApp = () => {
  const [prevUserData, setPrevUserData] = useState(null);

  // Define hasFormBeenSubmittedAtLeastOnce & its setter here, since it'll be passed into multiple child components
  const [hasFormBeenSubmittedAtLeastOnce, setHasFormBeenSubmittedAtLeastOnce] =
    useState(false);

  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation
        hasFormBeenSubmittedAtLeastOnce={hasFormBeenSubmittedAtLeastOnce}
        prevUserData={prevUserData}
      />
      <FunctionalForm
        setPrevUserData={setPrevUserData}
        hasFormBeenSubmittedAtLeastOnce={hasFormBeenSubmittedAtLeastOnce}
        setHasFormBeenSubmittedAtLeastOnce={setHasFormBeenSubmittedAtLeastOnce}
      />
    </>
  );
};
