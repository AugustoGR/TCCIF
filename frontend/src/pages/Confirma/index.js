import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import './styles.css';
import '../../global.css';
import api from '../../services/api';

export default function Confirma(){
    
    let query = useQuery();
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    useEffect(()=>{
        api.post('confirmacao/'+query.get("id"));
        alert("Confirmação feita com sucesso");
        window.close();
    },[]);

    return(
        <div id="confbody">
            <div id="divtxt">
                <h4>Confirmação feita com sucesso</h4>
            </div>
        </div>
    )
}