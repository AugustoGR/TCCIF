import React from 'react';
import './styles.css';
import '../../global.css';
import logo from '../../assets/Logo Horizontal 2 IFRS Canoas PNG 1.svg';
import usericon from '../../assets/user.svg';
export default function Header(){
    return(
       <header>
           <img id="logoif" src={logo}/>
           <div id="login">
           <img id="user" src={usericon}/>
           <button id="entra">Entrar</button>
           </div>
       </header>
    )
}