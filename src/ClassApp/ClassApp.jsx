import React from "react";
import { ClassForm } from "./ClassForm";
import { ProfileInformation } from "../ProfileInformation";

export class ClassApp extends React.Component {
  state = {
    user: null,
  };

  // Pass to ClassForm:
  setUser = (newUser) => {
    this.setState({ user: newUser });
  };

  render() {
    return (
      <>
        <h2>Class</h2>
        <ProfileInformation user={this.state.user} />
        <ClassForm setUser={this.setUser} />
      </>
    );
  }
}
