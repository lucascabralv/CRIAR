/**--------------------------------------------
 *               Framework Analitico
 *---------------------------------------------**/

class Framework_Analitico {
  pilares = {
    contexto: new Pilar_Analitico("contexto"),
    recursos: new Pilar_Analitico("recursos"),
    ideias: new Pilar_Analitico("ideias"),
    acoes: new Pilar_Analitico("acoes"),
    resultados: new Pilar_Analitico("resultados"),
  };

  loadOldData(){
    const oldData = SUPABASE.f_analitico;
    if(oldData) this.updateWithOldData(oldData.pilares);
  }

  getListaSolucoes() {
    return this.pilares;
  }

  updateSolucaoValue(pilar_name, solucao_index, value) {
    this.pilares[pilar_name].solucoes[solucao_index].value = value * 10;
    this.updateCharts(pilar_name, solucao_index);
    this.onInfoUpdate(pilar_name, solucao_index, true);
  }
  updateSolucaoWeight(pilar_name, solucao_index, weight) {
    this.pilares[pilar_name].solucoes[solucao_index].weight = weight;
    this.updateCharts(pilar_name, solucao_index);
    this.onInfoUpdate(pilar_name, solucao_index, true);
  }
  updateSolucaoValueAndWeight(pilar_name, solucao_index, value, weight, saveData) {
    this.pilares[pilar_name].solucoes[solucao_index].value = value;
    this.pilares[pilar_name].solucoes[solucao_index].weight = weight;
    this.updateCharts(pilar_name, solucao_index);
    this.onInfoUpdate(pilar_name, solucao_index, saveData);
  }

  getPilarAverage(pilar_name) {
    return this.pilares[pilar_name].getAverage();
  }
  getSolucoesInfosList() {
    const solucoes_infos_list = [];
    PILARES.forEach((pilar) => {
      solucoes_infos_list.push(this.pilares[pilar].solucoes);
    });
    return solucoes_infos_list.flat();
  }

  updateCharts(pilar_name, solucao_index) {
    this.updateSolucaoCircleProgress(pilar_name, solucao_index);
  }

  updateSolucaoCircleProgress(pilar_name, solucao_index) {
    $("[nc_pilar='" + pilar_name + "']")
      .find("[analise_index='" + solucao_index + "'] .small-circle-analise")
      .val(this.pilares[pilar_name].getSolucaoValue(solucao_index) / 10);
  }

  onInfoUpdate(pilar, index, saveData) {
    const solucao_id = this.pilares[pilar].solucoes[index].id;
    ESTATISTICAS.updateAnalitico(pilar, solucao_id);
    if (saveData === true) {
      this.saveUserData();
    }
  }

  // DB FUNCTIONS
  async saveUserData() {
    const f_analitico_user_data = JSON.stringify(this);
    await SUPABASE.setUserFrameworkAnaliticoData(
      f_analitico_user_data
    );
  }

  updateWithOldData(pilares) {
    for (const [pilar, content] of Object.entries(pilares)) {
      content.solucoes.forEach((solucao, index) => {
        const value = solucao.value;
        const weight = solucao.weight;
        this.updateSolucaoSlideRange(pilar, index, value);
        this.updateSolucaoWeightSelector(pilar, index, weight);
        this.updateSolucaoValueAndWeight(pilar, index, value, weight, false);
      });
    }
  }
  updateSolucaoSlideRange(pilar_name, solucao_index, value) {
    $("[nc_pilar='" + pilar_name + "']")
      .find("[analise_index='" + solucao_index + "'] .input-range-analise")
      .val(Math.round(value / 10));
  }
  updateSolucaoWeightSelector(pilar_name, solucao_index, weight){
    $("[nc_pilar='" + pilar_name + "']")
      .find("[analise_index='" + solucao_index + "'] [weight='"+ weight +"']")
      .click();
  }
}
