import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// components
import BottomNavbar from 'components/Navbars/BottomNavbar';

// views
import Read from 'views/Read';

export default function Single() {
  return (
    <>
      <Switch>
        <Route path="/read/:ceritaId" exact component={Read} />
        <Redirect from="/read" to="/read" />
      </Switch>
      <BottomNavbar />
    </>
  );
}
