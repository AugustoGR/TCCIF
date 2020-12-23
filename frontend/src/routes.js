import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './pages/Login';
import Subs from './pages/Subs';
export default function Routes(){
    return(
       <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Subs}/>
            <Route path="/login" component={Login}/>
        </Switch>
       </BrowserRouter> 
    )
}