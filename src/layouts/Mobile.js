import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// components
import BottomNavbar from 'components/Navbars/BottomNavbar';

// views
import Home from 'views/Home';

export default function Mobile() {
  return (
    <>
      <Switch>
        <Route path="/home" exact component={Home} />
        <Redirect from="/home" to="/home" />
      </Switch>
      <BottomNavbar />
    </>
  );
}
