import React from 'react';
import './styles.css';
import '../../global.css';
import Header from '../Header';
export default function Subs(){
    return(
       <body className="maincontainer">
           <Header />
           <div className="titlepage">
               <div className="title">Lista de Substituições</div>
               <button className="filter">Filtrar</button>
           </div>
           <div className="teste">
           <div className="list">
               <div className="subsmodel"></div>
           </div>
           </div>
       </body>
    )
}