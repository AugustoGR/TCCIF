import React, {useState}from 'react';
import './styles.css';
import '../../global.css';
import api from '../../services/api';
import logo from '../../assets/Logo Horizontal 2 IFRS Canoas PNG 1.svg';
export default function Login(){
    const [id, setId] = useState('');
    const [senhainfo, setSenha] = useState('');
    async function handlelogin(e){
        const dados ={id, senhainfo};
        e.preventDefault();
        try{
            const response = await api.post('sessions',dados)
        }
        catch(err){
            alert('Senha ou ID incorreto');
        }
    }
    return(
        <div id="login-container">
        <div id="log">
            <img id="logo" alt="" src={logo}/>
            <form onSubmit={handlelogin}>
                <input className="inplog"  placeholder="Seu ID"
                value={id}
                onChange={e =>setId(e.target.value)}                
                />
                <input className="inplog" type="password" placeholder="Sua senha"
                value={senhainfo}
                onChange={e =>setSenha(e.target.value)}
                />
                <button className="button" id="entrar" type="submit">Entrar</button>
            </form>
        </div>
        </div>
    )
}