import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './pages/Login';
import Subs from './pages/Subs';
import CriaSub from './pages/CriaSub';
import DetSub from './pages/DetalhesSub';
import Confirma from './pages/Confirma'
export default function Routes(){
    return(
       <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Subs}/>
            <Route path="/login" component={Login}/>
            <Route path='/novasub' component={CriaSub}/>
            <Route path='/detalhessub' component={DetSub}/>
            <Route path='/confirmacao' component={Confirma}/>
        </Switch>
       </BrowserRouter> 
    )
}