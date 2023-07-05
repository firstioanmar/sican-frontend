import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// components
import BottomNavbar from 'components/Navbars/BottomNavbar';

// views
import Settings from 'views/Settings';

export default function Setting() {
  return (
    <>
      <Switch>
        <Route path="/settings" exact component={Settings} />
        <Redirect from="/settings" to="/settings" />
      </Switch>
      <BottomNavbar />
    </>
  );
}
