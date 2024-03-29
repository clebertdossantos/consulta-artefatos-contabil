const axios = require('axios');
const querystring = require('querystring');
const config = require("./src/config.js")
const fs= require('fs');
const path = require('path');
let pathFile = config.diretorio()

const params_config = {
    "busca" : {
        "script"        : true,
        "componente"    : false,
        "fonteDinamica" : false,
        "critica"       : false
    },
    "tipoBusca" : "TAG", // TITULO,TAG,CODIGO,NATUREZA,IDENTIFICADOR
    "tagNome" : "EFD-Reinf",
    // "tagId" : 122544, // reinf
    "natureza" : "ENCERRAMENTO_EXERCICIO",
    "conteudoIdentificador" : /aa/, 
    "conteudoCodigo" : /empenho\.busca/,
    "conteudoTitulo" : /VDC|vdc/,
}
let headers = config.headers() // pode passar como parametro uma autorização e uma useraccess de sua preferencia, caso contrario ele retornara o default (diretoria de produtos)
// let headers = config.headers("Bearer 376cea74-f7ed-4880-97ba-a8bdb76f3522","3bPMlHZPYF-vigKCLkvOPok0ba3ZrbgRW1sJiexSdu4=") // pode passar como parametro uma autorização e uma useraccess de sua preferencia, caso contrario ele retornara o default (diretoria de produtos)

async function consultaArtefatos(content){
    // log(content)
    let parametros = config.pagination() // pode ser passado um limit e offset de sua preferencia, caso contrário sempre será uma paginação de 100
    let SCRIPT_VALIDACAO = []
    let tipoArtefato = Object.keys(content)[1]
    let condition = true
    console.log(`>>>>> ${Object.keys(content)[1]}`)
    //* buscando scripts
    while (condition) {
        try{
            let result_api = await axios({
                url : `${content.url}?${querystring.stringify({"filter" : content[Object.keys(content)[1]] , "offset": parametros.offset, "limit" : parametros.limit})}`,
                method: 'get',
                headers : headers,
                // data : parametros
            })
            for(script of result_api.data.content){
                if(config.validacaoScript(params_config)){
                    // console.log(`VALIDADO : ${JSON.stringify(script,null,2)}`);
                    // log(script)
                    SCRIPT_VALIDACAO.push({
                        "id" : script.referencia.id,
                        "titulo" : script.titulo,
                        "arquivo" : `[${tipoArtefato}] - ${(script.titulo.replace('/',' - ')).replace('/',' - ').replace(':','-').substring(0,170)}.groovy`,
                        "revisao" : script.referencia.revisao
                    })
                }else{
                    // console.log(`NAO VALIDADO : ${script.titulo}`);
                    continue
                }
                // break;
            }
            parametros.offset += parametros.limit
            condition = result_api.data.hasNext
        }catch(e){
            console.log('>>>>>>>>>> ERRO AO EFETUAR ALGUMA BUSCA');
            console.log(e);
        }
    }
    console.log(`Quandidade de scripts : ${SCRIPT_VALIDACAO.length} **** buscando código fonte`)
    //? buscando código fonte dos scritps para exportação dos arquivos
    try {
        for(script of SCRIPT_VALIDACAO){
            // console.log(script)
            // return 
            try {
                let result_codigo = await axios({
                    url : `https://plataforma-scripts.betha.cloud/scripts/v1/api/scripts/${script.id}/revisoes/${script.revisao}`,
                    method: 'get',
                    headers : headers,
                })
                let codigoFonte = (result_codigo.data.codigoFonte || "").toString()
                if(params_config.tipoBusca === "CODIGO"){
                    if(params_config.conteudoCodigo.exec(codigoFonte)){
                        console.log(script.titulo)
                        // log(script)
                        fs.writeFileSync(path.join(pathFile,script.arquivo),codigoFonte)
                    }else{
                        continue;
                    }
                }else{
                    console.log(script.titulo)
                    fs.writeFileSync(path.join(pathFile,script.arquivo),codigoFonte)
                } 
            } catch (error) {
                console.log(`Erro ao consultar o script : ${JSON.stringify(script)}`)
            }
            
        }
    } catch (error) {
        console.log('>>>>>>>>>> ERRO AO CONSULTAR O CÓDIGO FONTE');
        console.log(error);
    }
}


(async () => {
    let objRotas = config.artefatos(params_config)
    for(it of Object.keys(objRotas).filter((pp) => pp !== "url")){
        let result = await consultaArtefatos(JSON.parse(`{ "url" : "${objRotas.url}", "${it}" : "${objRotas[it]}" }`))
        // break
    }
})();

// nome+like+"%25siops%25"
// https://plataforma-scripts.betha.cloud/scripts/v1/api/tags



// https://plataforma-extensoes.betha.cloud/api/extensao?filter=tipo%20%3D%20'SCRIPT'%20and%20propriedades%20in(new%20Propriedade('tipoScript',%20'JOB'))%20and%20tags%20in('SIOPS%202023')&offset=0&limit=1000
// https://plataforma-extensoes.betha.cloud/api/extensao?filter=tipo%20%3D%20'SCRIPT'%20and%20propriedades%20in(new%20Propriedade('tipoScript'%2C%20'JOB'))%20and%20tags%20in('SIOPS%202023')&offset=0&limit=100
// https://plataforma-extensoes.betha.cloud/api/extensao?filter=tipo%20%3D%20'SCRIPT'%20and%20propriedades%20in(new%20Propriedade('tipoScript',%20'JOB'))%20and%20tags%20in('SIOPS%202023'))&offset=0&limit=100
