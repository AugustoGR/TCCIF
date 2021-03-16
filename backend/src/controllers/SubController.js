const { json, response } = require('express');
const connection = require('../database/connection');
const nodemailer = require('nodemailer');
//const { update } = require('../database/connection');
const { default: createRemoteJWKSet } = require('jose/jwks/remote');
const { default: jwtVerify } = require('jose/jwt/verify');
const { default: parseJwk } = require('jose/jwk/parse')

    async function valida(jwt){
        /*const JWKS = createRemoteJWKSet(
            new URL('https://demo-openidc.canoas.ifrs.edu.br/jwks')
          )*/
        
        const publicKey = await parseJwk({
            alg: 'RS256',
            e: 'AQAB',
            n:
              'sGGt-wXW5EFcjknvfVDii--_5e3IXQUp10SpxJp0O8LXrLpE3Ppxvkqsysem-GSaGKp6T0-yLM5QKf7YlsLtb_HLT8Lbf82TblTfP0S2HMbAm0djgpK0sK_E2vBGmGELmEsEte3LqAWU0NVAd982T6--0vMXTgiG0Y5--dGXmAKpbaZv17aOewh4L9R-j8JNfv66CxwHSVw5PMITw2hh0PNMmU831k7X3rBlpjXAoVskQTVycIWmzuNk3325TmcsArA0o_qb4Op-8On1VsXTk6HPvkfXn2BuZxpCUdqiZaS9caqHuTSMLTMLYwEpsF0cZXCYCkqQnCvl_wA8cBV3dQ',
            kty: 'RSA',
            kid: 'j5ltTN6vIhtbtwL4u9ludq2BwEpH3etwAcIUA_dE7Dc',
            use: 'sig',
          })
        
          try {
        
            const payload = await jwtVerify(jwt, publicKey, {
                issuer: 'https://demo-openidc.canoas.ifrs.edu.br/',
                audience: 'aYixWK878H_tE1UucaeT'
            })

          } catch (error) {
            console.log(error)
          }
    }

    function mail(prof,turma, horario, profSub, mat, matSub, data, id, type){
        if(type === 'create'){
            var title = 'Substituição agendada';
            var button = "<br><br><a href='https://localhost:3000/confirmacao?id="+id+"'>Estou ciente</a>"
        }
        else{
            var title = 'Substituição cancelada'
            var button = "";
        }
        if(matSub==null){
            var materiaSub = "<label>Aplicação de conteúdo definido pelo professor da disciplina</label>";
            var materia = "";
        }
        else{
            var materiaSub = "<label>Matéria substituta: <div class='bold'>"+matSub+"</div></label>";
            var materia = "substituída";
        }
        let style = "<style>.bold{font-weight: bold;display:inline-block}#box{margin-left:3%}h4{text-align: center;line-height: 40px;font-weight: bold;font-size: 20px;border-radius: 0 30px 0 30px;filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));color:white;background:#33A048; width: 280px; height: 40px;}a{border: 0;display: inline-block;text-align: center;width: 120px;height: 20px;font-size: 12px;line-height: 20px;border-radius: 27px;background: #33B04C;text-decoration: none;cursor: pointer;}</style>"
        let htmlquery = "<head>"+style+"<head><h4>"+title+"</h4><div id='box'><label>Turma: <div class='bold'>"+turma+"</div></label><br><label>Nome do Professor substituído: <div class='bold'>"+prof+"</div></label><br><label>Nome do professor substituto: <div class='bold'>"+profSub+"</div></label><br><label>Matéria "+materia+": <div class='bold'>"+mat+"</div></label><br>"+materiaSub+"<br><label>Data:<div class='bold'>"+tratadata(data)+"</div>    Horário:<div class='bold'>"+horario+"</div></label>"+button+"</div>";
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
        const {prof,turma, horario, horariofim, profSub, mat, matSub, data, email,jwt} = request.body;
        valida(jwt);
        var status = 'Requerido';
        const domain = email.split('@');
        if(domain[1]==="campus.ifrs.edu.br"||domain[1]==="canoas.ifrs.edu.br"){
            if(matSub!=null){
                var stripmat = matSub.stripHTML();
            }
            else{
                var stripmat = matSub;
            }
            const [id] = await connection('substituicoes').insert({
                turma: turma.stripHTML(),
                horario: horario.stripHTML(),
                horariofim: horariofim.stripHTML(),
                nome: prof.stripHTML(),
                profSub: profSub.stripHTML(),
                mat: mat.stripHTML(),
                matSub: stripmat,
                status: status,
                data: data.stripHTML(),
                email: email.stripHTML(),
            });
            await mail(prof.stripHTML(),turma.stripHTML(), horario.stripHTML(), profSub.stripHTML(), mat.stripHTML(), stripmat, data.stripHTML(), id, 'create');
            return response.json({id});
        }else{return response.json({id:'error'})}
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
