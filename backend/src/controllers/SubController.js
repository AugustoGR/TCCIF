const { json, response } = require('express');
const connection = require('../database/connection');
const nodemailer = require('nodemailer');
//const { update } = require('../database/connection');

    function mail(prof,turma, horario, profSub, mat, matSub, data, id, type){
        if(type === 'create'){
            var title = 'Substituição agendada';
            var button = "<br><br><a href='http://localhost:3000/confirmacao?id="+id+"'>Estou ciente</a>"
        }
        else{
            var title = 'Substituição cancelada'
            var button = "";
        }
        let style = "<style>.bold{font-weight: bold;display:inline-block}#box{margin-left:3%}h4{text-align: center;line-height: 40px;font-weight: bold;font-size: 20px;border-radius: 0 30px 0 30px;filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));color:white;background:#33A048; width: 280px; height: 40px;}a{border: 0;display: inline-block;text-align: center;width: 120px;height: 20px;font-size: 12px;line-height: 20px;border-radius: 27px;background: #33B04C;text-decoration: none;cursor: pointer;}</style>"
        let htmlquery = "<head>"+style+"<head><h4>"+title+"</h4><div id='box'><label>Turma: <div class='bold'>"+turma+"</div></label><br><label>Nome do Professor substituído: <div class='bold'>"+prof+"</div></label><br><label>Nome do professor substituto: <div class='bold'>"+profSub+"</div></label><br><label>Matéria substituída: <div class='bold'>"+mat+"</div></label><br><label>Matéria substituta: <div class='bold'>"+matSub+"</div></label><br><label>Data:<div class='bold'>"+data+"</div>    Horário:<div class='bold'>"+horario+"</div></label>"+button+"</div>";
        let transporter = nodemailer.createTransport({
            host: "smtp.office365.com",
            port: 587,
            secure: false,
            auth: {
                user: "ssap.tcc@outlook.com",
                pass: "######"
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
    
    function tratadata(date){
        var data = new Date(date);
        var d =data.getDate().toString();
        var m =(data.getMonth()+1).toString();
        var dia = (d.length === 1) ? '0'+d:d;
        var mes = (m.length === 1) ? '0'+m:m;
        return(dia+'/'+mes+'/'+data.getFullYear());
    }

    String.prototype.stripHTML = function() {return this.replace(/<.*?>/g, '');}

module.exports = {

    async create(request, response){
        const {prof,turma, horario, profSub, mat, matSub, data, id_prof} = request.body;
        //const id_prof = request.headers.authorization;
        var status = 'Requerido';
        const [id] = await connection('substituicoes').insert({
            turma: turma.stripHTML(),
            horario: horario.stripHTML(),
            prof: prof.stripHTML(),
            profSub: profSub.stripHTML(),
            mat: mat.stripHTML(),
            matSub: matSub.stripHTML(),
            status: status,
            data: data.stripHTML(),
            id_prof: id_prof.stripHTML(),
        });
        await mail(prof.stripHTML(),turma.stripHTML(), horario.stripHTML(), profSub.stripHTML(), mat.stripHTML(), matSub.stripHTML(), data.stripHTML(), id, 'create');
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
    },
    async  updateStatus(request, response){
        const {id} = request.params;
        const [{prof,turma, horario, profsub, mat, matsub, data}] = await connection('substituicoes').where('id', id).select('*');
        const result = await connection('substituicoes').where('id',id).update({
            status: 'Cancelada',
        });
        
        await mail(prof,turma, horario, profsub, mat, matsub, tratadata(data), id, 'cancel')
        return response.json(result);
    }
}
