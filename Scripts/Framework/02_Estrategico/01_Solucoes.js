/**------------------------------------------------------------------------
 *                       FRAMEWORK ESTRATEGICO
 *------------------------------------------------------------------------**/
/**--------------------------------------------
 *               SOLUCOES
 *---------------------------------------------**/
class Solucoes {
  lista_de_solucoes = [];

  async buildListaDeSolucoes() {
    const db_solucoes = await SUPABASE.fetchSolucoesData();
    const db_servicos = await SUPABASE.fetchServicosData();

    db_solucoes.forEach((db_solucao_item) => {
      let solucao_item = this.createSolucaoItem(db_solucao_item);
      const servicos_da_solucao = this.buildListaDeServicos(
        db_servicos,
        solucao_item.nome
      );
      solucao_item.servicos = servicos_da_solucao;
      this.lista_de_solucoes.push(solucao_item);
    });
    this.lista_de_solucoes.sort((a, b) => a.id - b.id);
  }

  buildListaDeServicos(db_servicos, solucao_nome) {
    const servicos_filtrados = db_servicos.filter(
      (servico) => servico.solucao == solucao_nome
    );
    let servicos_da_solucao = [];
    servicos_filtrados.forEach((servico) => {
      let servico_item = this.createServicoItem(servico);
      servicos_da_solucao.push(servico_item);
    });
    return servicos_da_solucao.sort((a, b) => a.id - b.id);
  }

  createSolucaoItem(db_solucao_item) {
    return {
      servicos: [],
      id: db_solucao_item.id,
      nome: db_solucao_item.nome,
      pilar: db_solucao_item.pilar,
      descricao: db_solucao_item.descricao,
      descontos: db_solucao_item.descontos,
    };
  }

  createServicoItem(db_servico_item) {
    return {
      id: db_servico_item.id,
      nome: db_servico_item.nome,
      preco: db_servico_item.preco,
      descricao: db_servico_item.descricao,
      eficiencia: db_servico_item.eficiencia,
    };
  }
}

/**--------------------------------------------
 *               COMPLEMENTOS
 *---------------------------------------------**/
class Complementos {
  lista_de_complementos = [];

  async buildListaDeComplementos() {
    const db_complementos = await SUPABASE.fetchComplementosData();

    db_complementos.forEach((db_complemento_item) => {
      let complemento_item = this.createComplementoItem(db_complemento_item);
      this.lista_de_complementos.push(complemento_item);
    });
    this.lista_de_complementos.sort((a, b) => a.id - b.id);
  }

  createComplementoItem(db_complemento_item) {
    return {
      id: db_complemento_item.id,
      nome: db_complemento_item.nome,
      pilar: db_complemento_item.pilar,
      descricao: db_complemento_item.descricao,
      preco: db_complemento_item.preco,
      imagem_link: db_complemento_item.imagem_link,
    };
  }
}
