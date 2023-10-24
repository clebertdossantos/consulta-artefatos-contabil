const axios = require('axios')
const fontes_consultadas = ['anulacoes.emliquidacoesEmpenhos','empenhos','emails','recursos.receitas.arrecadacoes','recursos.origensCreditosOrcamentarios','tiposDocumentoConciliacaoBancaria','ppa.deducoesReceitas','ldo.deducoesReceitas','loa.recursosDeducoesReceitas','contasBancariasEntidades','transferencias','enderecos.bairros','agenciasBancaria','entidades','origensCreditosOrcamentarios','recursos.retencoesVinculos','retencoes.liquidacoes','retencoes.anulacoes','recursos.deducoes.receitas.alteracoesOrcamentariasReceitas','operacoesBancarias.resgates','ppa.historicos','ppa.historicosDeducoesReceitas','loa.despesas','cancelamentosDividas','parcelasPrecatorios','receitas.arrecadacoesExtraorcamentarias','credoresSocios','recursos.anulacoes','retencoes.pagamentos','retencoes.despesasExtras','ldo.historicos','anulacoes.lancamentosReceitas','receitas.arrecadacoesOrcamentarias','anulacoes.arrecadacoesExtraorcamentarias','anulacoes.empenhos','empenhosIdentificadoresAdiantamentos','pagamentosEmpenhos','bloqueios','enderecos','telefones','responsaveis.tiposResponsavel','enderecos.municipios','classificacoesContasBancarias','contasBancarias','enderecos.tiposLogradouro','recursos.creditosOrcamentarios','recursos.despesasExtras','recursos.receitas.alteracoesOrcamentarias','conciliacoesBancarias','loa.limitesAlteracoesOrcamentarias','ppa.historicosReceitas','cancelamentosPrecatorios','enderecos.estados','origensCreditosOrcamentariosVinculos','tiposAdministracao','recursos.deducoes.anulacoes.arrecadacoes','recursos.detalhamentosEmpenhos','recursos.receitas.arrecadacoesExtrasOrcamentarias','movimentos','detalhamentosDocumentosPagaveis','loa.receitas','acrescimosPrecatorios','anulacoes.pagamentosEmpenhos','pagamentosVinculosLiquidacoes','desbloqueios','ordenadoresDespesas','receitasExtras','conciliacoesBancariasPendencias','ldo.limitesAlteracoesOrcamentarias','loa.transferencias','emliquidacoesEmpenhos','comprovantes','vencimentos','receitasDevolucoes','deducoes.anulacoes.arrecadacoes','ppa.historicosDespesas','loa.historicosReceitas','loa.deducoesReceitas','niveisRecursos','arrecadacoesOrcamentarias','operacoesBancarias.saldosIniciaisBancarios','operacoesBancarias.depositos','documentosPagamentos.empenhos','ldo.historicosReceitas','ldo.historicosDeducoesReceitas','loa.historicosTransferencias','acrescimosDividas','receitas.anulacoes.ArrecadacoesOrcamentarias','empenhosIdentificadoresPrecatorios','creditosOrcamentarios','cnae','tiposAlteracoesOrcamentariasReceitas','operacoesBancarias.saques','documentosPagaveis','loa','precatorios','lancamentosReceitas','liquidacoesEmpenhos','anulacoes.prestacoesContasAdiantamentos','retencoesExercicios','tiposDivida','enderecos.loteamentos','naturezasJuridicas','anulacoes.vinculosPagamentosLiquidacoes','recursos.receitas.anulacoes.arrecadacoes','tiposAlteracoesOrcamentariasReceitasExercicio','alteracoesOrcamentariasReceitas','ldo.receitas','classificacoesDespesasExtras','comprovantes.despesasExtras','empenhosIdentificadoresProcessosAdministrativos','prestacoesContasAdiantamentos','ordenadoresDespesas.organogramas','origensCreditosOrcamentariosExercicios','receitasExtrasExercicio','retencoes','operacoesBancarias.aplicacoes','operacoesBancarias.ajustesBancarios','vencimentosDetalhamentosDocumentosPagaveis','ldo','loa.recursosReceitas','empenhosIdentificadoresConvenios','administracoesRecursos','enderecos.logradouros','parametrosOrcamentarios','deducoes.receitas.alteracoesOrcamentariasReceitas','pacotesPagamentos','anulacoes.documentosPagamentos.despesasExtras','tiposMovimentacaoConciliacaoBancaria','ppa','dividas','receitas.anulacoes.arrecadacoesExtraorcamentarias','despesasExtras','anulacoes.despesasExtras','contasBancariasCredores','enderecos.condominios','contasBancarias.vigencias','receitasOrcamentarias','recursos.bloqueios','retencoes.empenhos','retencoes.emliquidacoes','ppa.despesas','ldo.despesas','ldo.historicosDespesas','parcelasDividas','arrecadacoesExtraorcamentarias','anulacoes.liquidacoesEmpenhos','retencoes.comprovantes','receitasNaoPrevistas','devolucoesReceitas','recursos.receitasDevolucoes','responsaveis','responsaveis.periodosResponsabilidades','recursos.deducoes.receitasOrcamentarias','recursos.desbloqueios','documentosPagamentos.despesasExtras','anulacoes.documentosPagamentos.empenhos','incorporacoesJurosDividas','anulacoes.arrecadacoesOrcamentarias','empenhosIdentificadoresCredores','comprovantes.anulacoes','despesasNaoPrevistas','ordenadoresDespesas.organogramas.periodos','tiposPrecatorio','enderecos.distritos','recursos.receitasExtrasExercicio','configuracoesRecursos','deducoes.receitasOrcamentarias','recursos.operacoesBancarias','loa.historicosDespesas','incorporacoesEncargosDividas','empenhosIdentificadoresDividas','credores','comprovantes.prestacoesContas','recursos.pagamentos','recursos.classificacoesDespesasExtras','recursos.receitas.anulacoes.arrecadacaosExtrasOrcamentarias','receitas.alteracoesOrcamentarias','retencoesExerciciosRef','ppa.receitas','loa.historicos','resultadosNominais','expansoesDespesas','configuracoes.organogramas','tiposBloqueios','compensacoesExpansoesDespesas','funcao','operacaoBancaria','transacoes.financeiras','deducoesReceitas','atosAlterados','localizadores','compensacoesRenunciasFiscais','programacaoFinanceiraReceitaLoa','orientacaoEstrategica','renunciasFiscais','tiposRiscoFiscal','atosRevogados','configuracoesNaturezasDespesas','subfuncao','subempenhos.retencoes','metaFiscalDespesaLdo','loa.recursosDespesas','niveisOrganogramas','tipoComprovante','programas','acoes','atosFontesDivulgacoes','enderecosAudiencia','tiposResultadoNominal','unidadesMedidas','deducoesReceitasExercicio','subempenhos.anulacoes','documentosPagamentos.subempenhos','enderecosBeneficiadosAudiencia','tiposRenunciaFiscal','atos','configuracoesNaturezasReceitas','ldo.recursos.receitas','conciliacoesBancarias.criterios','tiposAplicacaoExercicios','anulacoes.documentosPagamentos.subempenhos','naturezasDespesas','despesaOrcamentaria','ppa.recursos.despesas','ppa.recursos.receitas','ppaRecursosDeducoesReceitas','audiencia','organogramas','tiposAplicacao','ldo.recursos.despesas','subempenhos','configuracaoFuncional','programacaoFinanceiraDespesaLoa','naturezasReceitas','tiposCompensacaoExpansaoRenunciaFiscal','metaFiscalReceitaLdo','riscosFiscais','historicoAcao','contaBancariaAdministracaoRecurso','responsavelTelefone','cheques.emissoes','tipoAto','contaContabil','parametroTransparencia','atuarioEnderecos','naturezaTextoJuridicoAtos','assinatura','nivelNaturezaDespesa','origensClassificacoesDespesasExtras','movimentacaoBalanceteMensalReceita','dadoTransparencia','dadoTransparencia','contaCorrenteRegistroContabil','responsavelEmail','sugestao','sugestaoEnderecos','recurso.deducao.arrecadacaoOrcamentaria','registroContabil','recursos','cenarioMacroeconomicoLdo','loaDespesasConsolidadas','contasContabeisExercicios','balanceteMensalRecurso','conciliacoesBancariasMovimentacoes','retencoes.anulacoes.liquidacoes','movimentacoes.tesouraria','documentoEscrituracaoNumeroSequencial','metaFisicaGrupoDespesaPpa','ldoCenariosMacroeconomicosReceita','encerramentoPeriodo','descarteOrigemExtra','configuracaoContaCorrente','saldoBancario.recurso','saldoBancario.tipoAplicacao.recurso','documentoEscrituracao','receitasTributacao','receitasTributacaoExercicio','ldo.receitas.consolidadas','ldoCenariosMacroeconomicosDespesa','metaFisicaExecucaoDespesaPpa','projecaoAtuarialPlanoFinanceiroSaldos','transparencia.dadosExtratosBancarios','atosDocumentos','contaBancariaMovimentadoraAdministracaoRecurso','indicadores','configuracaoComponenteContaCorrente','saldoBancario.tipoAplicacao','responsavelEndereco','comprovantesLiquidacoes','ldo.recursosDeducoesReceitas','projecaoAtuarialSaldos','cheques','contasBancariasEntidadeExercicio','ppaReceitasConsolidadas','destinosDiarias','ppaDespesasConsolidadas','ajustesRecursos','conciliacoesBancariasRelacionamentos','equivalencias','projecaoAtuarialPlanoFinanceiro','saldosIniciaisExtras','recursosSaldosIniciaisExtras','configuracaoContaCorrenteComponentes','retencaoAdministracaoRecurso','metaFisicaGrupoDespesaLoa','balanceteMensalContaCorrenteDocumento','balanceteMensalDisponibilidade','configuracaoContaCorrenteMascarasContas','propostaOrcamentaria','projecaoAtuarial','cheques.anulacoes','movimentacaoContabilDespesa','gruposConfiguracaoAssinaturas','movimentacaoContabilDespesaNatureza','metaFisicaGrupoDespesaLdo','contribuintesReceitasAnulacoesArrecadacoes','contribuintes','movimentacaoContabilReceita','diarias','movimentacaoContabilReceitaNatureza','loaReceitasConsolidadas','retencoes.anulacoes.pagamentos','ldo.despesas.consolidadas','marcadores','configuracaoComponenteContaCorrenteVinculosDocumentos','credorRetencao','recursoSaldoInicialEmDinheiro','contribuintesReceitasArrecadacoes','atuario','movimentacaoContabilEmpenho','deducao.arrecadacaoOrcamentaria','nivelNaturezaReceita','parametroEscrituracao','itensEquivalenciasInformados','indicadoresProgramas','creditoPropostaOrcamentaria','movimentacoes.gestoesBancarias','parametroTransparencia','movimentacaoBalanceteMensalDespesa','transferenciaLdo','conciliacoesBancariasExtratos','configuracoes.remessasBancarias','contasBancariasResponsaveis','balanceteDinamico','balanceteMensalContaCorrente','saldoInicialEmDinheiro','saldoBancario','vencimentosComprovantes','movimentacoes.bancarias','naturezasDiarias','historicoPrograma','movimentacaoDivida','projecaoDeducaoReceitaLdo','estornoLancamentosContabeisItens','lancamentosContabeis','lancamentosContabeisItens','balanceteDinamicoContaCorrente']

async function run() {
    let query = await axios({
        "url": "https://plataforma-dados.betha.cloud/dados/api/sistemas/@current/fontes/com-ativos",
        "method": "get",
        "headers": {
            "Authorization": "Bearer b65dacd0-cc31-4ced-99a6-4352c1bbac8c",
            "User-Access": "M-5XNYKspDohPHCvNQ_IMdkYHo3xljI4IVuIUWyVOO8="
        }
    })
    query = query.data.filter((pp) => pp.identificador === 'contabilidade')
    if (query) {
        for (ativo of query[0].ativos) {
            // if (fontes_consultadas.includes(ativo.tema)) {
            //     continue;
            // }
            if(ativo.tema !== 'indicadoresProgramas'){
                continue
            }
            if ((/fontes\-adicionais/).exec(ativo.endereco)) {
                continue
            }
            // console.log(ativo)
            // console.log(ativo);
            let queryFields = await axios({
                "url": `https://plataforma-dados.betha.cloud/dados/api/sistemas/@current/ativos/${ativo.id}/metadados`,
                "method": "get",
                "headers": {
                    "Authorization": "Bearer b65dacd0-cc31-4ced-99a6-4352c1bbac8c",
                    "User-Access": "M-5XNYKspDohPHCvNQ_IMdkYHo3xljI4IVuIUWyVOO8="
                }
            })
            if (queryFields.data) {
                try {
                    if(queryFields.data.expressions){
                        let list_fields = []
                        let listType = []
                        for (key of Object.keys(queryFields.data.expressions)) {
                            // console.log(queryFields.data.expressions[key])
                            if (queryFields.data.expressions[key].type) {
                                if(queryFields.data.expressions[key].type === "Double"){
                                    console.log(`Campos >> ${key}`);
                                    list_fields.push(key)
                                }
                                listType.push(key)
                            }
                        }
                        // listType = Object.keys(listType.reduce((el, next) => {
                        //     if (!el[next]) {
                        //         el[next] = true
                        //         return el
                        //     } else {
                        //         return el
                        //     }
                        // }, {}))
                        // console.log(`>> ${ativo.tema} ### ${listType.join(',')}`);
                        if(list_fields.length >0){
                            console.log(`Dados.contabilidade.v1.${ativo.tema}.busca(campos:"${list_fields.join(',')}");`)
                        }else{
                            continue;
                        }
                    }
                } catch (ee) {
                    console.log(`[ERRO] >> ${ativo.tema}`);
                }
            }
            // break
        }
    }

}



run()