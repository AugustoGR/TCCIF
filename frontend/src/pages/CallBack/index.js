import React, {useEffect} from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import axios from 'axios';
import * as qs from 'querystring'
export default function CallBack(){

    const history = useHistory();
    var id_token = localStorage.getItem("id_token");
    var access_token = localStorage.getItem("access_token");

    let query = useQuery();
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    useEffect(() =>{
        if(!(localStorage.getItem("access_token"))){getToken()}
        history.push('/');
    },[]);

    
    async function getUserInfo(){
        const token = access_token;

        const result = await axios.get(
            `https://demo-openidc.canoas.ifrs.edu.br/me?access_token=${token}`
        );
        localStorage.setItem("name", result.data.name);
        localStorage.setItem("email", result.data.email);
    }

    async function getToken(){

        const config = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        };

        const data = {
            client_id: "aYixWK878H_tE1UucaeT",
            grant_type: "authorization_code",
            redirect_uri: "https://localhost:3000/cb",
            code: query.get('code'),
            code_verifier: 'mLIxnsYmEa3DM6~wa5pYAFQdCn3IhYlhz3SAEon.Bt5YMfr13Da_6DUR_YeIe6MgmKfOaNGpwmIW.D65yxn_5gmCYBbQEZbEEGY_LPMhUWltE34-70BGbSskoC8xEXDF'
        };

        try {
            const result = await axios.post('https://demo-openidc.canoas.ifrs.edu.br/token',qs.stringify(data),config);
            
            localStorage.setItem("access_token", result.data.access_token);
            localStorage.setItem("id_token", result.data.id_token);
            localStorage.setItem("refresh_token", result.data.refresh_token);

            id_token = result.data.id_token;
            access_token = result.data.access_token;

            getUserInfo()

          }catch (error){
            console.log(error);
          }
    }
    return(<div>login</div>)
}