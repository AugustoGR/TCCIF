import React, {useState, useEffect} from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import './styles.css';
import '../../global.css';
import Header from '../Header';
import Title from '../Title';
import api from '../../services/api';

export default function DetSub(){

    const [turma, setTurma] = useState(null);
    const [data, setData] = useState(null);
    const [prof, setSubstituido] = useState(null);
    const [profSub, setSubstituto] = useState(null);
    const [mat, setMatSubstituida] = useState(null);
    const [matSub, setMatSubstituta] = useState(null);
    const [horario, setHorario] = useState(null);
    const [status, setStatus] = useState(null);
    const [idprofff, setId] = useState(null);
    const profidlog = localStorage.getItem('id');
    const history = useHistory();
    let query = useQuery();

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    useEffect(() =>{
        api.get('substituicoes/'+query.get("id")).then(response =>{save(response.data)})
    },[]);

    function save([{nome,turma, horario, profsub, mat, matsub, data, id_prof, status}]){
        setTurma(turma);
        setData(tratadata(data));
        setMatSubstituida(mat);
        setMatSubstituta(matsub);
        setHorario(horario);
        setSubstituido(nome);
        setSubstituto(profsub);
        setStatus(status);
        setId(id_prof);
        
        if(profidlog == id_prof && status != 'Cancelada'){
            console.log(status);
            var botao = document.getElementById('cancela')
            botao.style.display = 'inline-block';
        }
    }

    function cancela(){
        let test = window.confirm("Tem certeza de que deseja cancelar essa substituição ?");
        if(test && localStorage.getItem('id') == idprofff){
            const result = api.post('cancela/'+query.get('id'))
            history.push('/')
        }
    }

    function tratadata(date){
        var data = new Date(date);
        var d =data.getDate().toString();
        var m =(data.getMonth()+1).toString();
        var dia = (d.length === 1) ? '0'+d:d;
        var mes = (m.length === 1) ? '0'+m:m;
        console.log(idprofff);
        return(dia+'/'+mes+'/'+data.getFullYear());
    }
    return(
        <div className="novasub-container">
            <Header />
            <div id="titulo"><Title titulo="Detalhes da substituição"></Title></div>
            <div className="dados-container">
                    <label className="inp">Turma:
                        <p className="short_valor">{turma}</p>
                    </label>
                    <label className="inp">Data da substituição:
                        <p className="short_valor">{data}</p>
                    </label>
                    <label className="inp">Nome do(a) professor(a) a ser substituído:<br/>
                        <p className="_valor">{prof}</p>
                    </label>
                    <label className="inp">Nome do(a) professor(a) substituto:<br/>
                        <p className="_valor">{profSub}</p>
                    </label>
                    <label className="inp">Matéria substituída:<br/>
                        <p className="_valor">{mat}</p>
                    </label>
                    <label className="inp">Matéria substituta:<br/>
                        <p className="_valor">{matSub}</p>
                    </label>
                    <label className="inp">Horário da substituição:
                        <p className="short_valor">{horario}</p>
                    </label>
                    <label className="inp">Status:
                        <p className="short_valor">{status}</p>
                    </label>
                    <button className="button" id="cancela" onClick={cancela} >Cancelar</button>
            </div>
        </div>
    )
}