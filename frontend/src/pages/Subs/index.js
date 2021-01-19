import React from 'react';
import './styles.css';
import '../../global.css';
import Header from '../Header';
import Title from '../Title';
import { Link } from 'react-router-dom';
export default function Subs(){
    return(
       <div className="maincontainer">
            <Header />
            <Title titulo="Lista de Substituições"><Link className="button" id="filter">Filtrar</Link></Title>
            <div className="list-container">
            <div className="shadow">
            <div className="list">
                <div className="subsmodel"></div>
                <div className="subsmodel"></div>
                <div className="subsmodel"></div>
                <div className="subsmodel"></div>
                <div className="subsmodel"></div>
                <div className="subsmodel"></div>
                <div className="subsmodel"></div>
                <div className="subsmodel"></div>
                <div className="subsmodel"></div>
                <div className="subsmodel"></div>
            </div>
            </div>
           </div>
       </div>
    )
}