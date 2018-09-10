import React, { Component } from 'react';
import Loadable from 'react-loadable';

import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Loader from 'react-loader';

import NotFound from './components/NotFound';
import LoadingPage from './components/LoadingPage';

class App extends Component {
  render() {
    const { location, history, loaded } = this.props;

    const LoadableMainPage = Loadable({
      loader: () => import('./routes/Main'),
      loading: LoadingPage
    });
    const LoadableDriverPage = Loadable({
      loader: () => import('./routes/Driver'),
      loading: LoadingPage
    });
    const LoadableEntryPage = Loadable({
      loader: () => import('./routes/Entry'),
      loading: LoadingPage
    });
    const LoadableExtraPage = Loadable({
      loader: () => import('./routes/Extra'),
      loading: LoadingPage
    });

    return (
      <Switch>
        <Route exact location={location} path="/" exact component={LoadableEntryPage} />
        <Route exact location={location} path="/main" exact component={LoadableMainPage} />
        <Route exact location={location} path="/extra" exact component={LoadableExtraPage} />
        <Route
          exact
          location={location}
          path="/driver/:driverId"
          exact
          component={LoadableDriverPage}
        />
        <Route location={location} path="/**" component={NotFound} />
      </Switch>
    );
  }
}

export default App;
