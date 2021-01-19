import React from 'react';
import './styles.css';
import '../../global.css';
export default function Title(props){
return(
    <div className="titlepage">
               <div className="title">{props.titulo}</div>
               {props.children}
           </div>
)
}