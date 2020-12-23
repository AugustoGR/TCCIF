import React from 'react';
import './styles.css';
import '../../global.css';
import logo from '../../assets/Logo Horizontal 2 IFRS Canoas PNG 1.svg';
export default function Login(){
    return(
        <div id="login-container">
        <div id="log">
            <img id="logo" src={logo}/>
            <form>
                <input className="inplog"  placeholder="Seu ID"/>
                <input className="inplog"  placeholder="Sua senha"/>
                <button id="entrar">Entrar</button>
            </form>
        </div>
        </div>
    )
}