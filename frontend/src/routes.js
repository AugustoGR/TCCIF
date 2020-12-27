import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './pages/Login';
import Subs from './pages/Subs';
import CriaSub from './pages/CriaSub';
export default function Routes(){
    return(
       <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Subs}/>
            <Route path="/login" component={Login}/>
            <Route path='/novasub' component={CriaSub}/>
        </Switch>
       </BrowserRouter> 
    )
}