class SELECOES {
  /**============================================
   **          SOLUCOES SELECIONADAS
   *=============================================**/
  #solucoes_selecionadas = [];

  adicionarSolucao(solucao) {
    const uid = createUID();

    const solucao_selecionada = {
      id: solucao.id,
      pilar: solucao.pilar,
      servicos: [0, 0, 0],
      preco: 0, // Servicos ainda nao foram selecionados
      uid: uid,
      desconto: 0,
    };
    this.#solucoes_selecionadas.push(solucao_selecionada);
    return uid;
  }

  removerSolucao(uid) {
    this.#solucoes_selecionadas = this.#solucoes_selecionadas.filter(
      (item) => item.uid !== uid
    );
  }

  editarServicosDaSolucaoSelecionada(uid, servicos) {
    const index = this.#solucoes_selecionadas.findIndex(
      (item) => item.uid === uid
    );
    const SolSel = this.#solucoes_selecionadas[index];
    SolSel.servicos = servicos;
    const calculos = this.calcSolucaoValores(SolSel);
    SolSel.preco = calculos.preco;
    SolSel.desconto = calculos.desconto;
  }

  calcSolucaoValores(solucao_selecionada) {
    let preco = 0,
      servicos_length = 0;
    solucao_selecionada.servicos.forEach((item, index) => {
      if (item === 1) {
        servicos_length++;
        preco += LISTA_SOLUCOES.getSolucaoServicoPreco(
          solucao_selecionada.id,
          index
        );
      }
    });
    const solucao = LISTA_SOLUCOES.getSolucaoById(solucao_selecionada.id);
    const desconto = solucao.descontos[servicos_length];
    const valor_do_desconto = desconto * preco;
    const total = preco - valor_do_desconto;
    return {
      preco: total, // Soma dos serviços - desconto
      desconto: desconto, // valor do desconto
    };
  }

  getSolucao(uid) {
    return this.#solucoes_selecionadas.find((solucao) => solucao.uid === uid);
  }

  getSolucaoPreco(uid) {
    const solucao = this.getSolucao(uid);
    return solucao.preco;
  }

  getSolucaoDescontoAtual(uid) {
    const solucao = this.getSolucao(uid);
    return solucao.desconto;
  }

  getSolucaoServicosSelecionados(uid) {
    const solucao = this.getSolucao(uid);
    return solucao.servicos;
  }

  getAllSolucoesSelecionadas() {
    return this.#solucoes_selecionadas;
  }

  updateSelectedServicos(servicos_selecionados) {
    servicos_selecionados.forEach(function (status, index) {
      const $servico_card = $("#popup_servicos .servico-card").eq(index);
      if (status === 1) {
        $servico_card.addClass("selected").attr("nc_selected", "1");
      } else {
        $servico_card.removeClass("selected").attr("nc_selected", "0");
      }
    });
  }

  getSolucoesSelecionadasByPilarNome(pilar_nome) {
    let solucoes_filtradas = [];
    this.#solucoes_selecionadas.forEach((solucao_selecionada) => {
      if (solucao_selecionada.pilar === pilar_nome) {
        solucoes_filtradas.push(solucao_selecionada);
      }
    });
    return solucoes_filtradas;
  }

  /**============================================
   **          COMPLEMENTOS SELECIONADOS
   *=============================================**/
  #complementos_selecionados = [];

  adicionarComplemento(complemento) {
    const uid = createUID();

    const complemento_selecionado = {
      id: complemento.id,
      pilar: complemento.pilar,
      uid: uid,
      preco: Number(complemento.preco)
    };
    this.#complementos_selecionados.push(complemento_selecionado);
    return uid;
  }

  removerComplemento(uid) {
    this.#complementos_selecionados = this.#complementos_selecionados.filter(
      (item) => item.uid !== uid
    );
  }

  getComplemento(uid) {
    return this.#complementos_selecionados.find(
      (complemento) => complemento.uid === uid
    );
  }

  getAllComplementosSelecionados() {
    return this.#complementos_selecionados;
  }

  getComplementosSelecionadosByPilarNome(pilar_nome) {
    let complementos_filtrados = [];
    this.#complementos_selecionados.forEach((complemento_selecionado) => {
      if (complemento_selecionado.pilar === pilar_nome) {
        complementos_filtrados.push(complemento_selecionado);
      }
    });
    return complementos_filtrados;
  }
}
