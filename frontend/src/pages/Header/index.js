import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import './styles.css';
import '../../global.css';
import logo from '../../assets/Logo Horizontal 2 IFRS Canoas PNG 1.svg';
import usericon from '../../assets/user.svg';
export default function Header(){
    
    const history = useHistory();
    const crypto = require('crypto');
    const base64url = require('base64url');

    var code_verifier = 'mLIxnsYmEa3DM6~wa5pYAFQdCn3IhYlhz3SAEon.Bt5YMfr13Da_6DUR_YeIe6MgmKfOaNGpwmIW.D65yxn_5gmCYBbQEZbEEGY_LPMhUWltE34-70BGbSskoC8xEXDF';

    var hash = crypto.createHash('sha256').update(code_verifier).digest();
    var code_challenge = base64url.encode(hash);

    var url = "https://demo-openidc.canoas.ifrs.edu.br/auth?client_id=aYixWK878H_tE1UucaeT&response_type=code&scope=openid profile email&state=au2001&code_challenge_method=S256&code_challenge="+code_challenge+"&redirect_uri=https://localhost:3000/cb"
    function login(){
        if(localStorage.getItem('access_token')){
            return (
            <button className="button" id='entra' onClick={logout}>Logout</button>
            )
        }
        else{
            return (<a className="button" id='entra' href={url}>Entrar</a>)
        }
    }

    function logout(){
        const logout_redirect = `https://localhost:3000/logout`;
        window.location = `https://demo-openidc.canoas.ifrs.edu.br/session/end?id_token_hint=${localStorage.getItem('id_token')}&post_logout_redirect_uri=${logout_redirect}`;
        localStorage.clear();
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