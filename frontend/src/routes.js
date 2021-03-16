import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './pages/Login';
import Subs from './pages/Subs';
import CriaSub from './pages/CriaSub';
import DetSub from './pages/DetalhesSub';
import Confirma from './pages/Confirma';
import CallBack from './pages/CallBack';
import Logout from './pages/Logout'
export default function Routes(){
    return(
       <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Subs}/>
            <Route path="/login" component={Login}/>
            <Route path='/novasub' component={CriaSub}/>
            <Route path='/detalhessub' component={DetSub}/>
            <Route path='/confirmacao' component={Confirma}/>
            <Route path='/cb' component={CallBack}/>
            <Route path='/logout' component={Logout}/>
        </Switch>
       </BrowserRouter> 
    )
}