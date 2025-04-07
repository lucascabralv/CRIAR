/**--------------------------------------------
 *               Framework Estrategico
 *---------------------------------------------**/
class Framework_Estrategico {
  lista_de_solucoes = [];
  lista_de_complementos = [];
  solucoes_selecionadas = [];
  complementos_selecionados = [];

  async load() {
    const SOLUCOES = new Solucoes();
    await SOLUCOES.buildListaDeSolucoes();
    this.lista_de_solucoes = SOLUCOES.lista_de_solucoes;
    renderSolucoesEstrategico();

    const COMPLEMENTOS = new Complementos();
    await COMPLEMENTOS.buildListaDeComplementos();
    this.lista_de_complementos = COMPLEMENTOS.lista_de_complementos;
    renderComplementosEstrategico();
  }

  loadOldData() {
    const oldData = SUPABASE.f_estrategico;
    if (oldData && oldData.solucoes) {
      this.createHTMLOldSolucoesData(oldData.solucoes);
      this.updateWithOldSolucoesData(oldData.solucoes);
    }
    if (oldData && oldData.complementos) {
      this.createHTMLOldComplementosData(oldData.complementos);
      this.updateWithOldComplementosData(oldData.complementos);
    }
  }

  calcAllPrecos() {
    const solucao_total = this.calcAllPilaresSolucaoPreco();
    const complemento_total = this.calcAllPilaresComplementoPreco();

    const preco_total_pilar = solucao_total + complemento_total;

    $("[price_el='geral_total']").text(numberToReal(preco_total_pilar));
  }

  /**=============
   **   SOLUCOES
   *===========**/

  getListaSolucoes() {
    return this.lista_de_solucoes;
  }
  getListaOrdenadaSolucoesSelecionadas() {
    return this.solucoes_selecionadas.sort((a, b) => a.id - b.id);
  }
  getListaMediaSolucoes() {
    const lista_ordenada_solucoes_selecionadas =
      this.getListaOrdenadaSolucoesSelecionadas();
    const lista_media_solucoes = [];
    this.lista_de_solucoes.forEach((solucao) => {
      const solucoes_selecionadas_filtradas =
        lista_ordenada_solucoes_selecionadas.filter((solucao_selecionada) => {
          return solucao_selecionada.id == solucao.id;
        });
      let media_solucoes_filtradas = 0;
      if (solucoes_selecionadas_filtradas.length) {
        solucoes_selecionadas_filtradas.forEach((solucao_filtrada) => {
          media_solucoes_filtradas += this.calcSolucaoAverage(solucao_filtrada);
        });
        media_solucoes_filtradas /= solucoes_selecionadas_filtradas.length;
      } else {
        media_solucoes_filtradas = 0;
      }
      lista_media_solucoes.push({
        id: solucao.id,
        pilar: solucao.pilar,
        media: media_solucoes_filtradas ? media_solucoes_filtradas : 0,
      });
    });
    return lista_media_solucoes;
  }
  selectSolucao(
    id,
    oldSolucao = {
      uid: createUID(),
      servicos_selecionados: [(0, 0, 0)],
      preco: 0,
      saveData: true,
    }
  ) {
    const uid = oldSolucao.uid;
    const solucao = this.findSolucaoByID(id);
    const selecao = {
      pilar: solucao.pilar,
      nome: solucao.nome,
      descricao: solucao.descricao,
      descontos: solucao.descontos,
      id: solucao.id,
      servicos_selecionados: oldSolucao.servicos_selecionados,
      servicos: solucao.servicos,
      uid: uid,
      preco: oldSolucao.preco,
      status: true,
    };
    this.solucoes_selecionadas.push(selecao);

    this.onInfoSolucaoUpdate(selecao.pilar, selecao.id, oldSolucao.saveData);
    return selecao;
  }
  unselectSolucao(uid) {
    const solucao_removida = this.findSolucaoSelecionadaByUID(uid);
    solucao_removida.status = false;
    this.solucoes_selecionadas = this.solucoes_selecionadas.filter(
      (solucao) => solucao.uid !== uid
    );
    const { pilar: pilar, id: solucao_id } = solucao_removida;
    this.onInfoSolucaoUpdate(pilar, solucao_id, true);
    return solucao_removida;
  }

  findSolucaoByID(id) {
    return this.lista_de_solucoes.find(
      (solucao) => parseInt(solucao.id) === parseInt(id)
    );
  }

  findSolucaoSelecionadaByUID(uid) {
    return this.solucoes_selecionadas.find((solucao) => solucao.uid === uid);
  }

  changeSolucaoPreco(uid, preco) {
    const solucao_selecionada_index = this.solucoes_selecionadas.findIndex(
      (solucao) => solucao.uid === uid
    );
    this.solucoes_selecionadas[solucao_selecionada_index].preco = preco;
  }

  changeServicoStatus(uid, servico_index, status) {
    const solucao_selecionada_index = this.solucoes_selecionadas.findIndex(
      (solucao) => solucao.uid === uid
    );
    this.solucoes_selecionadas[solucao_selecionada_index].servicos_selecionados[
      servico_index
    ] = status;

    const { pilar: pilar, id: solucao_id } =
      this.solucoes_selecionadas[solucao_selecionada_index];
    this.onInfoSolucaoUpdate(pilar, solucao_id, true);
  }

  calcAllSolucoesPrecos(solucao) {
    if (solucao.status) this.calcSolucaoPreco(solucao);
    this.calcPilarSolucaoPreco(solucao.pilar);
    this.calcAllPrecos();
    // Update Resumo List
    this.updateSolucaoResumo(solucao.pilar);
  }

  calcSolucaoPreco(solucao) {
    let servicos_length = 0,
      preco_sem_desconto = 0;
    solucao.servicos_selecionados.forEach((status, index) => {
      if (status == 1) {
        servicos_length++;
        preco_sem_desconto += solucao.servicos[index].preco;
      }
    });
    const desconto = solucao.descontos[servicos_length];
    const preco_com_desconto =
      preco_sem_desconto - preco_sem_desconto * desconto;

    // ALTERA OBJ DA SOLUCAO
    this.changeSolucaoPreco(solucao.uid, preco_com_desconto);
    // ALTERA PRECOS HTML
    $("[nc_criar_el='valor_sem_desconto']").text(
      numberToReal(preco_sem_desconto)
    );
    $("[nc_criar_el='desconto_text']").text(desconto * 100 + "%");
    $("[nc_criar_el='valor_com_desconto']").text(
      numberToReal(preco_com_desconto)
    );
    $(".card-solucao[uid='" + solucao.uid + "'] .card-solucao-price").text(
      numberToReal(preco_com_desconto)
    );
  }
  calcPilarSolucaoPreco(pilar) {
    const preco_total_pilar = this.solucoes_selecionadas.reduce(
      (total, solucao) => {
        let preco = 0;
        if (solucao.pilar === pilar) preco = solucao.preco;
        return total + preco;
      },
      0
    );
    $("[nc_pilar='" + pilar + "'] [price_el='solucoes_subtotal']").text(
      numberToReal(preco_total_pilar)
    );
  }
  calcAllPilaresSolucaoPreco() {
    const preco_total = this.solucoes_selecionadas.reduce((total, solucao) => {
      return total + solucao.preco;
    }, 0);
    $("[price_el='solucoes_total']").text(numberToReal(preco_total));
    return preco_total;
  }

  calcSolucaoAverage(solucao) {
    let servicos_length = 0,
      soma_eficiencias = 0;
    solucao.servicos_selecionados.forEach((status, index) => {
      if (status == 1) {
        servicos_length++;
        soma_eficiencias += solucao.servicos[index].eficiencia;
      }
    });
    return soma_eficiencias / servicos_length;
  }

  /**=============
   *   RESUMO SOLUCAO LIST
   *===========**/
  updateSolucaoResumo(pilar) {
    let solucoes_list_html = "";
    this.solucoes_selecionadas.forEach((solucao) => {
      if (solucao.pilar === pilar) {
        solucoes_list_html += this.createSolucaoResumoItem(solucao);
      }
    });

    $(
      `[nc_tipo='solucoes'] [nc_pilar="${pilar}"] [nc_el="resumo_group_list"]`
    ).html(solucoes_list_html);
  }

  createSolucaoResumoItem(solucao) {
    const servicos_selecionados_html = this.createServicoResumoList(
      solucao.servicos,
      solucao.servicos_selecionados
    );
    return `
      <div class="resumo-item">
        <div class="resumo-item-top-wrapper">
          <div class="resumo-nome">${solucao.nome}</div>
          <div class="resumo-preco">${numberToReal(solucao.preco)}</div>
        </div>
        <div class="resumo-servicos-list">
          ${servicos_selecionados_html}
        </div>
      </div>
    `;
  }

  createServicoResumoList(servicos_list, servicos_selecionados) {
    let html_list = "";
    servicos_selecionados.forEach((servico_selecionado, index) => {
      if (servico_selecionado == 1) {
        html_list += `<div class="resumo-servicos-item">${servicos_list[index].nome}</div>`;
      }
    });
    return html_list;
  }

  onInfoSolucaoUpdate(pilar, solucao_id, saveData) {
    ESTATISTICAS.updateEstrategicoSolucoes(pilar, solucao_id);
    if (saveData === true) {
      this.saveUserData();
    }
  }
  /**=============
   **   COMPLEMENTOS
   *===========**/
  getListaComplementos() {
    return this.lista_de_complementos;
  }
  selectComplemento(
    id,
    oldComplemento = {
      uid: createUID(),
      saveData: true,
    }
  ) {
    const uid = oldComplemento.uid;
    const complemento = this.findComplementoByID(id);
    const selecao = {
      pilar: complemento.pilar,
      nome: complemento.nome,
      descricao: complemento.descricao,
      id: complemento.id,
      uid: uid,
      imagem_link: complemento.imagem_link,
      preco: complemento.preco,
      status: true,
    };
    this.complementos_selecionados.push(selecao);

    this.onInfoComplementoUpdate(oldComplemento.saveData);
    return selecao;
  }
  unselectComplemento(uid) {
    const complemento_removido = this.findComplementoSelecionadoByUID(uid);
    complemento_removido.status = false;
    this.complementos_selecionados = this.complementos_selecionados.filter(
      (complemento) => complemento.uid !== uid
    );
    this.onInfoComplementoUpdate(true);
    return complemento_removido;
  }
  findComplementoByID(id) {
    return this.lista_de_complementos.find(
      (complemento) => parseInt(complemento.id) === parseInt(id)
    );
  }
  findComplementoSelecionadoByUID(uid) {
    return this.complementos_selecionados.find(
      (complemento) => complemento.uid === uid
    );
  }

  calcAllComplementosPrecos(complemento) {
    this.calcPilarComplementoPreco(complemento.pilar);
    this.calcAllPrecos();
    // Update Resumo List
    this.updateComplementoResumo(complemento.pilar);
  }

  calcPilarComplementoPreco(pilar) {
    const preco_total_pilar = this.complementos_selecionados.reduce(
      (total, complemento) => {
        let preco = 0;
        if (complemento.pilar === pilar) preco = complemento.preco;
        return total + preco;
      },
      0
    );
    $("[nc_pilar='" + pilar + "'] [price_el='complementos_subtotal']").text(
      numberToReal(preco_total_pilar)
    );
  }
  calcAllPilaresComplementoPreco() {
    const preco_total = this.complementos_selecionados.reduce(
      (total, complemento) => {
        return total + complemento.preco;
      },
      0
    );
    $("[price_el='complementos_total']").text(numberToReal(preco_total));
    return preco_total;
  }
  /**=============
   *   RESUMO COMPLEMENTO LIST
   *===========**/
  updateComplementoResumo(pilar) {
    let complementos_list_html = "";
    this.complementos_selecionados.forEach((complemento) => {
      if (complemento.pilar === pilar) {
        complementos_list_html += this.createComplementoResumoItem(complemento);
      }
    });

    $(
      `[nc_tipo='complementos'] [nc_pilar="${pilar}"] [nc_el="resumo_group_list"]`
    ).html(complementos_list_html);
  }

  createComplementoResumoItem(complemento) {
    let preco_final;
    if (complemento.preco == 0) {
      preco_final = "Incluso";
    } else {
      preco_final = numberToReal(complemento.preco);
    }
    return `
      <div class="resumo-item">
        <div class="resumo-item-top-wrapper">
          <div class="resumo-nome">${complemento.nome}</div>
          <div class="resumo-preco">${preco_final}</div>
        </div>
      </div>
    `;
  }
  onInfoComplementoUpdate(saveData) {
    if (saveData) {
      this.saveUserData();
    }
  }

  /**=============
   **   DB FUNCTIONS
   *===========**/
  async saveUserData() {
    const f_estrategico_solucoes_complementos = {
      solucoes: this.solucoes_selecionadas,
      complementos: this.complementos_selecionados,
    };
    const f_estrategico_user_data = JSON.stringify(
      f_estrategico_solucoes_complementos
    );
    await SUPABASE.setUserFrameworkEstrategicoData(f_estrategico_user_data);
  }

  createHTMLOldSolucoesData(old_solucoes) {
    old_solucoes.forEach((solucao) => {
      const html_list = $(
        "[nc_pilar='" + solucao.pilar + "'] .selected-solucoes-list"
      );
      const html_solucao = createHTMLSolucaoEstrategico(solucao);
      html_list.append(html_solucao);
    });
  }
  updateWithOldSolucoesData(old_solucoes) {
    old_solucoes.forEach((solucao) => {
      this.selectSolucao(solucao.id, solucao);
      this.calcAllSolucoesPrecos(solucao);
    });
  }

  createHTMLOldComplementosData(old_complementos) {
    old_complementos.forEach((complemento) => {
      const html_list = $(
        "[nc_pilar='" + complemento.pilar + "'] .selected-complementos-list"
      );
      const html_complemento = createHTMLComplementoEstrategico(complemento);
      html_list.append(html_complemento);
    });
  }
  updateWithOldComplementosData(old_complementos) {
    old_complementos.forEach((complemento) => {
      this.selectComplemento(complemento.id, complemento);
      this.calcAllComplementosPrecos(complemento);
    });
  }
}
