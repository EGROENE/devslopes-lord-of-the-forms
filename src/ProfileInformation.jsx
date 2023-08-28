import { profileInfos } from "../constants";
import { capitalize, formatPhoneNumber } from "./utils/transformations";

export const InfoRow = ({ label, value }) => {
  return (
    <div>
      <span style={{ marginRight: 5 }}>
        <b>{label}:</b>
      </span>
      <span>{value}</span>
    </div>
  );
};
export const ProfileInformation = ({
  prevUserData,
  successfulSubmissionTally,
}) => {
  const setProfileInfoValue = (id) => {
    if (id.includes("Name")) {
      return capitalize(prevUserData[`${id}`]);
    } else if (id.includes("phone")) {
      return formatPhoneNumber(prevUserData[`${id}`]);
    } else {
      return prevUserData[`${id}`];
    }
  };
  if (successfulSubmissionTally > 0) {
    // eslint-disable-next-line no-unused-vars
    //const { email, firstName, lastName, phone, city } = userData;
    return (
      <>
        <u>
          <h3>Your Submitted User Information</h3>
        </u>
        <div className="user-info">
          {profileInfos.map((info) => (
            <InfoRow
              key={info.id}
              label={info.label}
              value={setProfileInfoValue(info.id)}
            />
          ))}
          {/* {<InfoRow label="Email" value={userData.email} />
            <InfoRow label="First Name" value={userData.firstName} />
            <InfoRow label="Last Name" value={userData.lastName} />
            <InfoRow label="City" value={userData.city} />
            <InfoRow label="Phone" value={"12-34-56-7"} />} */}
        </div>
      </>
    );
  } else {
    return (
      <>
        <u>
          <h3>Your Submitted User Information</h3>
        </u>
        <div className="user-info">
          <div>No information provided</div>
        </div>
      </>
    );
  }
};
