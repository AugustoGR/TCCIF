const connection = require('../database/connection');
const { json } = require('express');


module.exports ={
    async create(request, response){
        const { id, senhainfo } = request.body;
        const prof = await connection('professores').where('id',id).select('senha', 'nome').first();
        if(!prof){
            return response.status(400).json({error: 'Professor não encontrado'});
        }
        else if(senhainfo !== prof.senha){
            return response.status(400).json({error: 'Senha incorreta'});
        }
        else{
            return response.json({"ath":"true"});
        }
        
    }
}