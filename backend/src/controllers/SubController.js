const { json } = require('express');
const connection = require('../database/connection');
const nodemailer = require('nodemailer');
const { update } = require('../database/connection');

    function mail(prof,turma, horario, profSub, mat, matSub, data, id){
        let style = "<style>.bold{font-weight: bold;display:inline-block}#box{margin-left:3%}h4{text-align: center;line-height: 40px;font-weight: bold;font-size: 20px;border-radius: 0 30px 0 30px;filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));color:white;background:#33A048; width: 280px; height: 40px;}a{border: 0;display: inline-block;text-align: center;width: 120px;height: 20px;font-size: 12px;line-height: 20px;border-radius: 27px;background: #33B04C;text-decoration: none;cursor: pointer;}</style>"
        let htmlquery = "<head>"+style+"<head><h4>Substituição agendada</h4><div id='box'><label>Turma: <div class='bold'>"+turma+"</div></label><br><label>Nome do Professor substituído: <div class='bold'>"+prof+"</div></label><br><label>Nome do professor substituto: <div class='bold'>"+profSub+"</div></label><br><label>Matéria substituída: <div class='bold'>"+mat+"</div></label><br><label>Matéria substituta: <div class='bold'>"+matSub+"</div></label><br><label>Data:<div class='bold'>"+data+"</div>    Horário:<div class='bold'>"+horario+"</div></label><br><br><a href='http://localhost:3000/confirmacao?id="+id+"'>Estou ciente</a></div>";
        let transporter = nodemailer.createTransport({
            host: "smtp.office365.com",
            port: 587,
            secure: false,
            auth: {
                user: "ssap.tcc@outlook.com",
                pass: "jajaja12"
            }
        })
        transporter.sendMail({
            from: "SSAP <ssap.tcc@outlook.com>",
            to: "augusto.garciadarosa@gmail.com",
            subject: "teste",
            text:"teste",
            html: htmlquery
        }).then(message => {
            console.log(message)
        }).catch(err => {

        console.log(err)})
    }

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
        await mail(prof,turma, horario, profSub, mat, matSub, data, id);
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
    },
    async update(request, response){
        const {id} = request.params;
        const [resultconf] = await connection('substituicoes').where('id',id).select('confirmacao','status');
        let conf = resultconf.confirmacao + 1;
        var newsta = "Requerido";
        if(conf >= 3){
            newsta = "Agendado";
        }
        const result = await connection('substituicoes').where('id',id).update({
            confirmacao: conf,
            status: newsta
        });
        console.log(conf);
        return response.json(result);
    }
}