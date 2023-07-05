import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'assets/styles/tailwind.css';

// layouts
import Auth from 'layouts/Auth.js';
import Mobile from 'layouts/Mobile';
import Single from 'layouts/Single';
import Setting from 'layouts/Setting';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/home" component={Mobile} />
      <Route path="/read" component={Single} />
      <Route path="/settings" component={Setting} />
      <Route path="/" component={Auth} />
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
