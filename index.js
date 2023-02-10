const axios = require('axios');
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
    "tipoBusca" : "CODIGO", // TITULO,TAG,CODIGO,NATUREZA,IDENTIFICADOR
    "tagId" : 122435,
    // "tagId" : 121332, // reinf
    "natureza" : "ENCERRAMENTO_EXERCICIO",
    "conteudoIdentificador" : /siops/, 
    "conteudoCodigo" : /sl\.cloud\.betha/,
    "conteudoTitulo" : /VDC|vdc/ 
}
let headers = config.headers() // pode passar como parametro uma autorização e uma useraccess de sua preferencia, caso contrario ele retornara o default (diretoria de produtos)
// let headers = config.headers("Bearer 32eb6822-0825-4c36-a320-546582cd7662","iGjntGGLlOxyhhjYRFfn5m72IXisK3iameo7PCeQ9KA=") // pode passar como parametro uma autorização e uma useraccess de sua preferencia, caso contrario ele retornara o default (diretoria de produtos)

async function consultaArtefatos(url){
    let parametros = config.pagination() // pode ser passado um limit e offset de sua preferencia, caso contrário sempre será uma paginação de 100
    let SCRIPT_VALIDACAO = []
    let tipoArtefato = url.split('/')[url.split('/').length -2]
    let condition = true
    console.log(`>>>>> ${tipoArtefato}`)
    //* buscando scripts
    while (condition) {
        try{
            let tag = /tag/
            let natureza = /natureza/ 
            if(tag.exec(url) || natureza.exec(url)){
                console.log(url);
                url = url.split('/')
                url.splice(6,2)
                url = url.join('/')
                console.log(url);
            }

            let result_api = await axios({
                url : url,
                method: 'post',
                headers : headers,
                data : parametros
            })
            for(script of result_api.data.content){
                if(config.validacaoScript(params_config)){
                    // console.log(`VALIDADO : ${script.titulo}`);
                    SCRIPT_VALIDACAO.push({
                        "id" : script.id,
                        "titulo" : script.titulo,
                        "arquivo" : `[${tipoArtefato}] - ${(script.titulo.replace('/',' - ')).replace('/',' - ').replace(':','-').substring(0,170)}.groovy`
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
            try {
                let result_codigo = await axios({
                    url : url.replace('pesquisa',`${script.id}`).replace('componentes','scripts').replace('fontes-dinamicas','scripts').replace('criticas','scripts'),
                    method: 'get',
                    headers : headers
                })
                let codigoFonte = (result_codigo.data.revisao.codigoFonte || "").toString()
                if(params_config.tipoBusca === "CODIGO"){
                    if(params_config.conteudoCodigo.exec(codigoFonte)){
                        console.log(script.titulo)
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
    for(it of config.artefatos(params_config.busca)){
        let result_rota = config.ajustarRotas(it,params_config)
        console.log(result_rota)
        let result = await consultaArtefatos(result_rota)
        // break
    }
})();
