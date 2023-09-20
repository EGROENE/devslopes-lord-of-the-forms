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

export const ProfileInformation = ({ user }) => {
  return (
    <>
      <u>
        <h3>Your Submitted User Information</h3>
      </u>
      <div className="user-info">
        {user && (
          <>
            <InfoRow
              id="email"
              label="Email:"
              value={capitalize(user.email).trim()}
            />
            <InfoRow
              id="firstName"
              label="First Name:"
              value={capitalize(user.firstName).trim()}
            />
            <InfoRow
              id="lastName"
              label="Last Name:"
              value={capitalize(user.lastName).trim()}
            />
            <InfoRow
              id="city"
              label="City:"
              value={capitalize(user.city).trim()}
            />
            <InfoRow
              id="phone"
              label="Phone:"
              value={formatPhoneNumber(user.phone)}
            />
          </>
        )}
        {!user && <div>No information provided</div>}
      </div>
    </>
  );
};
