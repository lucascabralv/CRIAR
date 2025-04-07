class CRIAR_OBJ {
  SELECOES = new SELECOES();

  renderElements() {
    // Renderiza SOLUCOES
    LISTA_SOLUCOES.renderAllSolucoesHTML();
    // Renderiza COMPLEMENTOS
    LISTA_COMPLEMENTOS.renderAllComplementosHTML();
  }

  /**==========================
   **        SOLUCOES
   *===========================**/

  adicionarSolucao(solucao) {
    return this.SELECOES.adicionarSolucao(solucao);
  }

  removerSolucao(uid) {
    this.SELECOES.removerSolucao(uid);
  }

  editarServicosDaSolucaoSelecionada(uid, servicos_selecionados) {
    this.SELECOES.editarServicosDaSolucaoSelecionada(
      uid,
      servicos_selecionados
    );
  }

  getSolucaoPreco(uid) {
    return this.SELECOES.getSolucaoPreco(uid);
  }

  getSolucaoDescontoAtual(uid) {
    return this.SELECOES.getSolucaoDescontoAtual(uid);
  }

  getSolucaoServicosSelecionados(uid) {
    return this.SELECOES.getSolucaoServicosSelecionados(uid);
  }

  getPilarSolucaoSum(pilar_nome) {
    let sum = 0;
    let solucoes = this.SELECOES.getSolucoesSelecionadasByPilarNome(pilar_nome);

    solucoes.forEach((solucao) => {
      sum += solucao.preco;
    });
    return sum;
  }

  updateSolucaoResumo(pilar_nome) {
    const solucoes =
      this.SELECOES.getSolucoesSelecionadasByPilarNome(pilar_nome);

    let solucoes_list_html = "";
    solucoes.forEach((solucao) => {
      solucoes_list_html += this.createSolucaoResumoItem(solucao);
    });

    $(`[nc_pilar="${pilar_nome}"] [nc-el="resumo_group_list"]`).html(
      solucoes_list_html
    );
  }

  createSolucaoResumoItem(solucao) {
    let servicos_list = LISTA_SOLUCOES.getSolucaoServicos(solucao.id);
    const solucao_nome = (LISTA_SOLUCOES.getSolucaoById(solucao.id)).nome;
    const servicos_selecionados_html = this.createServicoResumoList(servicos_list, solucao.servicos);
    return `
      <div class="resumo-item-solucao">
        <div class="resumo-item-top-wrapper">
          <div class="resumo-solucao-nome">${solucao_nome}</div>
          <div class="resumo-solucao-preco">${numberToReal(solucao.preco)}</div>
        </div>
        <div class="resumo-servicos-list">
          ${servicos_selecionados_html}
        </div>
      </div>
    `;
  }

  createServicoResumoList(servicos_list, servicos_selecionados){
    let html_list = "";
    servicos_selecionados.forEach((servico_selecionado, index) => {
      if(servico_selecionado == 1){
        html_list += `<div class="resumo-servicos-item">${servicos_list[index].nome}</div>`;
      }
    })
    return html_list;
  };

  printAllSolucoesSelecionadas() {
    return this.SELECOES.getAllSolucoesSelecionadas();
  }

  renderServicos(solucao, uid, servicos_selecionados) {
    LISTA_SOLUCOES.renderServicos(solucao, uid);
    this.SELECOES.updateSelectedServicos(servicos_selecionados);
  }

  /**==========================
   **       COMPLEMENTOS
   *===========================**/
  adicionarComplemento(complemento) {
    return this.SELECOES.adicionarComplemento(complemento);
  }

  removerComplemento(uid) {
    this.SELECOES.removerComplemento(uid);
  }

  getPilarComplementoSum(pilar_nome) {
    let sum = 0;
    let complementos =
      this.SELECOES.getComplementosSelecionadosByPilarNome(pilar_nome);

    complementos.forEach((complemento) => {
      sum += complemento.preco;
    });
    return sum;
  }

  printAllComplementosSelecionados() {
    return this.SELECOES.getAllComplementosSelecionados();
  }
}