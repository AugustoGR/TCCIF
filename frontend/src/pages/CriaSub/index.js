/*const [turma, setTurma] = useState('');
    const [data, setData] = useState('');
    const [substituido, setsubstituido] = useState('');
    const [substituto, setSubstituto] = useState('');
    const [matSubstituida, setMatSubstituida] = useState('');
    const [matSubstituta, setMatSubstituta] = useState('');
    const [horario, setHorario] = useState('');*/
import React, {useState} from 'react';
import './styles.css';
import '../../global.css';
import Header from '../Header';
import Title from '../Title';
import api from '../../services/api';
export default function CriaSub(){
    const [id_turma, setTurma] = useState(null);
    const [data, setData] = useState(null);
    const [id_prof, setsubstituido] = useState(null);
    const [id_profsub, setSubstituto] = useState(null);
    const [id_dis, setMatSubstituida] = useState(null);
    const [id_disub, setMatSubstituta] = useState(null);
    const [horario, setHorario] = useState(null);
    async function register(e){
        e.preventDefault();
        const dados = {id_prof,id_turma, horario, id_profsub, id_dis, id_disub, data};
        try{ 
            const response = await api.post('substituicoes',dados);
            alert(response.data.id);
        }
        catch(err){
            alert('erro');
        }
        
    }
    return(
        <div className="novasub-container">
        <Header />
        <Title titulo="Criar Substituição"></Title>
        <div className="form-container">
            <form className="form-sub" onSubmit={register}>
                <label className="inp">Turma:
                    <input className="inpsub" id="input-turma"
                        value={id_turma}
                        onChange={e=>setTurma(e.target.value)}
                    ></input>
                </label>
                <label className="inp">Data da substituição:
                    <input className="inpsub" id="input-data"
                        value={data}
                        onChange={e=>setData(e.target.value)}
                    ></input>
                </label>
                <label className="inp">Nome do(a) professor(a) a ser substituído:<br/>
                    <input className="inpsub"
                        value={id_prof}
                        onChange={e=>setsubstituido(e.target.value)}
                    ></input>
                </label>
                <label className="inp">Nome do(a) professor(a) substituto:<br/>
                    <input className="inpsub"
                        value={id_profsub}
                        onChange={e=>setSubstituto(e.target.value)}
                    ></input>
                </label>
                
                <label className="inp">Matéria substituída:<br/>
                    <input className="inpsub"
                        value={id_dis}
                        onChange={e=>setMatSubstituida(e.target.value)}
                    ></input>
                </label>
                <label className="inp">Matéria substituta:<br/>
                    <input className="inpsub"
                        value={id_disub}
                        onChange={e=>setMatSubstituta(e.target.value)}
                    ></input>
                </label>
                <label className="inp">Horário da substituição:
                    <input id="input-hora" className="inpsub"
                        value={horario}
                        onChange={e=>setHorario(e.target.value)}
                    ></input>
                </label>
                <button className="button" type="submit" >Enviar</button>
            </form>
        </div>
        </div>
    )
}