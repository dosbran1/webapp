import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from '../views/LandingPage';
import Universities from '../views/Universities';
  
  export const Routes = () => {
      return (
         <Router>
             <div>
                 <Switch>
                    <Route path="/universidades" component={Universities} />
                    <Route path='/' component={LandingPage}/>
                 </Switch>
             </div>
         </Router>
      )
  }
  
  export default Routes
  