import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
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
    let query = useQuery();

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    useEffect(() =>{
        api.get('substituicoes/'+query.get("id")).then(response =>{save(response.data)})
    },[]);

    function save([{prof,turma, horario, profsub, mat, matsub, data}]){
        setTurma(turma);
        setData(tratadata(data));
        setMatSubstituida(mat);
        setMatSubstituta(matsub);
        setHorario(horario);
        setSubstituido(prof);
        setSubstituto(profsub);
    }

    function tratadata(date){
        var data = new Date(date);
        var d =data.getDate().toString();
        var m =(data.getMonth()+1).toString();
        var dia = (d.length === 1) ? '0'+d:d;
        var mes = (m.length === 1) ? '0'+m:m;
        return(dia+'/'+mes+'/'+data.getFullYear());
    }

    return(
        <div className="novasub-container">
            <Header />
            <Title titulo="Detalhes da substituição"></Title>
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
            </div>
        </div>
    )
}