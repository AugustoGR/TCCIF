const { json } = require('express');
const connection = require('../database/connection');

module.exports = {
    async create(request, response){
        const {prof,turma, horario, profSub, mat, matSub, data, id_prof} = request.body;
        //const id_prof = request.headers.authorization;
        var status = 'Requerido';
        const [id] = await connection('substituicoes').insert({
            turma,
            horario,
            prof,
            profSub,
            mat,
            matSub,
            status,
            data,
            id_prof,
        });
        return response.json({id});
    },
    async index(request, response){
        const result = await connection('substituicoes').select('*');
        return response.json(result);
    },
    async getOne(request, response){
        const {id} = request.params;
        const result = await connection('substituicoes').where('id',id).select('*');
        return response.json(result);
    }

}