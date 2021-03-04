import React, {useEffect, useState} from 'react';
import './styles.css';
import '../../global.css';
import Header from '../Header';
import Title from '../Title';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import iconmore from  '../../assets/more.png'
import usericon from '../../assets/user.svg';

export default function Subs(){

    const [subList, setSubList] = useState([]);
    const [filtro, setFiltro] = useState("");

    function tratadata(date){
        var data = new Date(date);
        var d =data.getDate().toString();
        var m =(data.getMonth()+1).toString();
        var dia = (d.length === 1) ? '0'+d:d;
        var mes = (m.length === 1) ? '0'+m:m;
        return(dia+'/'+mes+'/'+data.getFullYear());
    }

    useEffect(()=>{
        api.get('substituicoes').then(response => {
        setSubList(response.data)})
    },[subList]);

    function novasub(){
        if(localStorage.getItem('id')){
            return (
                <Link to="../novasub"><img id="more" alt="" src={iconmore} height="24px"/></Link>
            )
        }
    }

    return(
       <div className="maincontainer">
            <Header />
            <Title titulo="Lista de Substituições"><div id="options"><div id="filtra"><input placeholder="Filtrar..." id="filtertext" value={filtro} onChange={e =>setFiltro(e.target.value)}></input><img id="lupa"src="https://img.icons8.com/pastel-glyph/64/26e07f/search--v1.png"/></div>{novasub()}</div></Title>
            <div className="list-container">
                <div className="shadow">
                    <div className="list">
                        {subList.map(sub =>{
                            if(sub.status != 'Requerido'){
                            if(filtro == sub.id || filtro == "" || filtro .toLowerCase() == sub.turma.toLowerCase() || filtro.toLowerCase() == sub.prof.toLowerCase()){
                            var string = "/detalhessub?id="+sub.id; 
                            return(
                            <Link id="fichabutton" to={string} key={sub.id}>
                                <div className="subsmodel">
                                    <div className="photo"><img alt=""src={usericon}/></div>
                                    <div className="dados">
                                        <div><p>Professor(a): </p><p className="valor">{sub.prof}</p></div>
                                        <div><p>Data: </p><p className="valor">{tratadata(sub.data)}</p></div>
                                        <div id="id"><p>ID: </p><p className="valor">{sub.id}</p></div>
                                        <div><p>Turma: </p><p className="valor">{sub.turma}</p></div>
                                        <div><p>Status: </p><p className="valor">{sub.status}</p></div>
                                    </div>
                                </div>
                            </Link>
                            )
                            }}
                        })
                        }
                    </div>
                </div>
           </div>
       </div>
    )
}