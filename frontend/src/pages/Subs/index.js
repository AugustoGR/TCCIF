import React from 'react';
import './styles.css';
import '../../global.css';
import Header from '../Header';
import { Link } from 'react-router-dom';
export default function Subs(){
    return(
       <div className="maincontainer">
           <Header />
           <div className="titlepage">
               <div className="title">Lista de Substituições</div>
               <Link className="button" id="filter">Filtrar</Link>
           </div>
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