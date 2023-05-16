const login = require("./login.js")
const fs = require('fs')
const path = require('path')
const { abort } = require("process")

exports.headers = (aut = null,user = null) => {
    if(aut && user){
        return {
            'authorization' : aut ,
            'user-access': user
        } 
    }else{
        return {
            'authorization' : login.autorizacao ,
            'user-access': login.usuario.entidade_3890.sistemas.scripts // diretoria de produtos - contábil
        }
    }
}


exports.pagination = (offset,limit) => {
    if(offset !== undefined && limit !== undefined){
        return {
            "limit" : limit,
            "offset" : offset
        }
    }else{
        return {
            "limit" : 100,
            "offset" : 0
        }
    }
}

exports.artefatos = (pp) => {
    let getObj = {
        "url" : "https://plataforma-extensoes.betha.cloud/api/extensao",
    }
    if(pp.busca.script){
        getObj["script"] = "tipo = 'SCRIPT' and propriedades in(new Propriedade('tipoScript', 'JOB'))"
        if(pp.tagNome){
            getObj["script"] = `${getObj.script} and tags in('${pp.tagNome}')`
        }
    }
    if(pp.busca.componente){
        getObj["componente"] = "tipo = 'SCRIPT' and propriedades in(new Propriedade('tipoScript', 'COMPONENTE'))"
        if(pp.tagNome){
            getObj["componente"] = `${getObj.componente} and tags in('${pp.tagNome}')`
        }
    }
    if(pp.busca.fonteDinamica){
        getObj["fonteDinamica"] = "tipo = 'SCRIPT' and propriedades in(new Propriedade('tipoScript', 'FONTE_DINAMICA'))"
        if(pp.tagNome){
            getObj["fonteDinamica"] = `${getObj.fonteDinamica} and tags in('${pp.tagNome}')`
        }
    }
    if(pp.busca.critica){
        getObj["critica"] = "tipo = 'SCRIPT' and propriedades in(new Propriedade('tipoScript', 'CRITICA'))"
        if(pp.tagNome){
            getObj["critica"] = `${getObj.critica} and tags in('${pp.tagNome}')`
        }
    }
    return getObj
}

exports.diretorio = () => {
    let path_result = path.join(__dirname,'..','resulta-busca') 
    try{
        fs.mkdirSync(path_result)
    }catch(e){
        const content_folder = fs.readdirSync(path_result)
        if(content_folder.length > 0){
            for(it of content_folder){
                fs.unlinkSync(path.join(path_result,it))
            }
        }
    }
    return path_result
}

exports.ajustarRotas = (rota,configuracao) => {
    let newIt = rota
    let array = rota.split('/')
    if(configuracao.tipoBusca === "TAG"){
        console.log(configuracao.tagNome)
        newIt = []
        for(i of array){
            if(array[array.length -2] === "scripts"){
                newIt.push(i)
                if(i === "api"){
                    newIt.push('tags')
                    newIt.push(configuracao.tagNome)
                }
            }else{
                newIt.push(i)
                if(i === "componentes" || i === "fontes-dinamicas"){
                    newIt.push('tags')
                    newIt.push(configuracao.tagNome)
                    newIt.push('scripts')
                }                
            }
        }
        newIt = newIt.join('/')
        return newIt
    }else{
        if(configuracao.tipoBusca === "NATUREZA"){
            newIt = [] 
            if(array[array.length -2] === "scripts"){
                for(i = 0 ; i < array.length ; i++){
                    if(i === 5){
                        newIt.push(array[i])
                        newIt.push('naturezas')
                        newIt.push(`${configuracao.natureza}`)
                    }else{
                        newIt.push(array[i])
                    }
                }
            }
            newIt = newIt.join('/')
            return newIt
        }
    }
    return newIt
}

exports.validacaoScript = (pp) => {
    let desconsiderarTitulos = /Descontinuado|desk|DEMO/ // desconsiderar os scripts e fontes descontinuadas.
    if(desconsiderarTitulos.exec(script.titulo)){
        return false
    }else{
        if(pp.tipoBusca === "TITULO"){
            if(pp.conteudoTitulo.exec(script.titulo)){
                return true
            }else{
                return false
            }
        }else if(pp.tipoBusca === "IDENTIFICADOR"){
            if(pp.conteudoIdentificador.exec(script.identificador||"")){
                // console.log(`[SUCESSO] - ${pp.titulo} >> ${script.identificador||"N/A"}`);
                return true
            }else{
                // console.log(`[ERRO] - ${script.titulo} >> ${script.identificador||"N/A"}`);
                return false
            }
        }else if(pp.tipoBusca === "TAG"){
            if(script.tags.filter(p => p.id === pp.tagId).length > 0){
                return true
            }else{
                return false
            }
        }else if(pp.tipoBusca ===  "NATUREZA"){
            if(script.chaveNatureza === pp.natureza){
                return true
            }else{
                return false
            }            
        }else{
            return true
        }
    }
}
