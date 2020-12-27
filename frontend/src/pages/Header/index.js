import React from 'react';
import {Link} from 'react-router-dom';
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
           <Link className="button" id='entra' to="../Login">Entrar</Link>
           </div>
       </header>
    )
}