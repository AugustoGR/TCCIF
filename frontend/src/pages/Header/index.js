import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import './styles.css';
import '../../global.css';
import logo from '../../assets/Logo Horizontal 2 IFRS Canoas PNG 1.svg';
import usericon from '../../assets/user.svg';
export default function Header(){
    const history = useHistory();
    
    function login(){
        if(localStorage.getItem('id')){
            return (
            <button className="button" id='entra' onClick={logout}>Logout</button>
            )
        }
        else{
            return (<Link className="button" id='entra' to="../Login">Entrar</Link>)
        }
    }

    function logout(){
        localStorage.clear();
        alert("Você efetuou o logout");
        history.push('/');
    }

    return(
       <header>
           <Link to="../"><img id="logoif" alt="" src={logo}/></Link>
           <div id="login">
                <img id="user" alt="" src={usericon}/>
                <div>{login()}</div>
           </div>
       </header>
    )
}