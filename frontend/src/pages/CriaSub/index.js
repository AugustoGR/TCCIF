
import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import './styles.css';
import '../../global.css';
import Header from '../Header';
import Title from '../Title';
import api from '../../services/api';

export default function CriaSub(){

    const [turma, setTurma] = useState(null);
    const [data, setData] = useState(null);
    const [prof, setsubstituido] = useState(null);
    const [profSub, setSubstituto] = useState(null);
    const [mat, setMatSubstituida] = useState(null);
    const [matSub, setMatSubstituta] = useState(null);
    const [horario, setHorario] = useState(null);
    const [horariofim, setHorariofim] = useState(null);
    const history = useHistory();

    function hidden(){
        var inp = document.getElementById('novamat');
        var ask = document.getElementById('ask');
        if(inp.style.display == ''){
            inp.style.display = 'none';
            ask.style.display = 'none';
        }
        console.log(document.getElementById('novamat').style.display)
        if(inp.style.display == 'none'){
            inp.style.display = 'inline-block';
            ask.style.display = 'inline-block';
        }
        else{
            inp.style.display = 'none';
            ask.style.display = 'none';
        }
       
    }

    async function register(e){
        e.preventDefault();
        const email = localStorage.getItem('email');
        const jwt = localStorage.getItem('id_token');
        const dados = {prof,turma, horario, horariofim, profSub, mat, matSub, data, email,jwt};
        var valid;
        try{ 
            const response = await api.post('substituicoes',dados);
            alert(response.data.id);
            valid = true;
        }
        catch(err){
            alert('erro ao cadastrar');
            valid = false
        }
        if(valid){
            history.push('/')
        }
    }
    return(
        <div className="novasub-container">
            <Header />
            <Title titulo="Criar Substituição"></Title>
            <div className="form-container">
                <form className="form-sub" onSubmit={register}>
                    <label className="inp">Turma:
                        <input className="inpsub" id="input-turma" autoComplete="off"
                            value={turma}
                            onChange={e=>setTurma(e.target.value)}
                        ></input>
                    </label>
                    <label className="inp">Data da substituição:
                        <input type="date" className="inpsub" id="input-data"
                            value={data}
                            onChange={e=>setData(e.target.value)}
                        ></input>
                    </label>
                    <label className="inp">Nome do(a) professor(a) a ser substituído:<br/>
                        <input className="inpsub" autoComplete="off"
                            value={prof}
                            onChange={e=>setsubstituido(e.target.value)}
                        ></input>
                    </label>
                    <label className="inp">Nome do(a) professor(a) substituto:<br/>
                        <input className="inpsub" autoComplete="off"
                            value={profSub}
                            onChange={e=>setSubstituto(e.target.value)}
                        ></input>
                    </label>
                    
                    <label className="inp">Matéria substituída:<br/>
                        <input className="inpsub" autoComplete="off"
                            value={mat}
                            onChange={e=>setMatSubstituida(e.target.value)}
                        ></input>
                    </label>
                    <label className="inp">Definir nova matéria a ser aplicada: <input onChange={hidden} type="checkbox"></input><br/><label id="ask">Qual?</label><br/>
                        <input id="novamat" className="inpsub" autoComplete="off"
                            value={matSub}
                            onChange={e=>setMatSubstituta(e.target.value)}
                        ></input>
                    </label>
                    <label className="inp">Horário de início da substituição: 
                        <input type="time" id="input-hora" className="inpsub"
                            value={horario}
                            onChange={e=>setHorario(e.target.value)}
                        ></input>
                    </label>
                    <label className="inp">Horário de fim da substituição: 
                        <input type="time" id="input-hora" className="inpsub"
                            value={horariofim}
                            onChange={e=>setHorariofim(e.target.value)}
                        ></input>
                    </label>
                    <button className="button" type="submit" >Enviar</button>
                </form>
            </div>
        </div>
    )
}