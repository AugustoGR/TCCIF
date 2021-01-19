/**Classe Substituição{
id;
turma;
horárioDaSub;
profSubstituído:
profSubstituto:
matSubstituída;
matSubstituta;
status;
dataSub;
obs.
}
 */

const { json } = require('express');
const connection = require('../database/connection');

module.exports = {
    async create(request, response){
        const {id_turma, horario, id_profsub, id_dis, id_disub, status, data} = request.body;
        const id_prof = request.headers.authorization;
        const [id] = await connection('substituicoes').insert({
            id_turma,
            horario,
            id_prof,
            id_profsub,
            id_dis,
            id_disub,
            status,
            data,
        });
        return response.json({id});
    },
    async index(request, response){
        const result = await connection('substituicoes').select('*');
        return response.json(result);
    }

}