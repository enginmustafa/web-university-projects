import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import MainLayout from './layouts/MainLayout';
import Home from './pages/home';
import Contact from './pages/contact';
import Cars from './pages/cars';
import PrivateRoute from './private-route';

class App extends React.Component {
  render() {
    return (<Router>
        <MainLayout>
          <Route path={"/"} exact component={Home} />
          <PrivateRoute authed={false} path={"/cars"} component={Cars} />
          <Route path={"/contact"} component={Contact} />
          <Route path={"/contact"} component={Contact} />
        </MainLayout>
      </Router>)
  }
}

export default App;
