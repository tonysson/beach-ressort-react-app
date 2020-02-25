
import React, { Component } from 'react'
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import SingleRoom from './pages/SingleRoom';
import { Home } from './pages/Home';
import { Rooms } from './pages/Rooms';
import { Error } from './pages/Error';





 class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar/>
        <Switch>
          <Route  exact path="/" component={Home} />
          <Route  exact path="/rooms/" component={Rooms} />
          <Route  exact path="/rooms/:slug" component={SingleRoom} />
          <Route  component = {Error} />
        </Switch>
        
      </React.Fragment>
      
    )
  }
}

export default App;
