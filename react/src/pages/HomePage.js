import React from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import Chat from "../components/Chat";
import Groups from "../components/groups";

const HomePage = () => {
  const { currentUserDialog } = useSelector(({ user }) => ({
    currentUserDialog: user.currentUserDialog,
  }));

  return (
    <div className="wrapper">
      <Switch>
        <Route
          path="/"
          render={() => (currentUserDialog ? <Chat /> : <Groups />)}
        />
      </Switch>
    </div>
  );
};

export default HomePage;
