//import { profileInfos } from "../constants";
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

// Wtf is this? How exactly do I get the right key-value pair from this...object?
// Getting correct pair by info.key in value if InfoRow below results in undefined in at least one instance
// Maybe put ? after keys, as they may not exist
// Maybe just use repetitive inputs in JSX below, setting value of each to captilize(user.firstName), for example. Abstracting these isn't worth the headache, and it may be overkill for a short form like this to produce form inputs automatically from an object instead of hardcoding it.
/* const formatUserData = (user) => ({
  ...user,
  firstName: capitalize(user.firstName),
  lastName: capitalize(user.lastName),
  phone: formatPhoneNumber(user.phone),
}); */

export const ProfileInformation = ({ user }) => {
  return (
    <>
      <u>
        <h3>Your Submitted User Information</h3>
      </u>
      <div className="user-info">
        {/* {user &&
          profileInfos.map((info) => (
            <InfoRow
              key={info.key}
              label={info.label}
              //value={user[`${info.key}`]}
              //value={formatUserData(user)[info.key].trim()}
              //value={formatUserData[info.key].trim()}
              //value={capitalize(user.firstName).trim()}
            />
          ))} */}
        {user && (
          <>
            <InfoRow
              key="email"
              label="Email:"
              value={capitalize(user.email).trim()}
            />
            <InfoRow
              key="firstName"
              label="First Name:"
              value={capitalize(user.firstName).trim()}
            />
            <InfoRow
              key="lastName"
              label="Last Name:"
              value={capitalize(user.lastName).trim()}
            />
            <InfoRow
              key="city"
              label="City:"
              value={capitalize(user.city).trim()}
            />
            <InfoRow
              key="phone"
              label="Phone:"
              value={formatPhoneNumber(user.phone)}
            />
          </>
        )}
        {/* !user && <div>No information provided</div> */}
        {!user && <div>No information provided</div>}
      </div>
    </>
  );
};
