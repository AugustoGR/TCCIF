import React, {useEffect, useState} from 'react';
import './styles.css';
import '../../global.css';
import Header from '../Header';
import Title from '../Title';
import { Link } from 'react-router-dom';
import api from '../../services/api';
export default function Subs(){
    const [subList, setSubList] = useState([]);
    useEffect(()=>{
        api.get('substituicoes').then(response => {
        setSubList(response.data)})
    },[]);
    return(
       <div className="maincontainer">
            <Header />
            <Title titulo="Lista de Substituições"><Link className="button" id="filter">Filtrar</Link></Title>
            <div className="list-container">
            <div className="shadow">
            <div className="list">
                {subList.map(sub => (
                    <div className="subsmodel">
                    <div className="photo"></div>
                    <div className="dados">
                    <div><p>Professor(a): </p><p>{sub.id_prof}</p></div>
                    <div><p>Data: </p><p>{sub.data}</p></div>
                    <div id="id"><p>ID: </p><p>{sub.id}</p></div>
                    <div><p>Turma: </p><p>{sub.id_turma}</p></div>
                    <div><p>Status: </p><p>{sub.status}</p></div>
                    </div>
                </div>
                ))}
            </div>
            </div>
           </div>
       </div>
    )
}