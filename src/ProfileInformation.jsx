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
        {!user && <div>No information provided</div>}
      </div>
    </>
  );
};
