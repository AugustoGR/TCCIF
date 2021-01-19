import React from 'react';
import './styles.css';
import '../../global.css';
import Header from '../Header';
import Title from '../Title';
export default function CriaSub(){
    return(
        <div className="novasub-container">
        <Header />
        <Title titulo="Criar Substituição"></Title>
        </div>
    )
}