/**------------------------------------------------------------------------
 *                     FRAMEWORK ANALITICO
 *------------------------------------------------------------------------**/
/**--------------------------------------------
 *               PILAR ANALITICO
 *---------------------------------------------**/
class Pilar_Analitico {
  solucoes = [];

  constructor(pilar) {
    const pilar_index = PILARES.indexOf(pilar);
    this.solucoes.push(
      { id: 1 + 3 * pilar_index, pilar: pilar, value: 0, weight: 3 },
      { id: 2 + 3 * pilar_index, pilar: pilar, value: 0, weight: 3 },
      { id: 3 + 3 * pilar_index, pilar: pilar, value: 0, weight: 3 }
    );
  }
  getSolucaoValue(index) {
    return this.solucoes[index].value;
  }
  getSolucaoWeight(index) {
    return this.solucoes[index].weight;
  }
  getSolucoesValues() {
    return this.solucoes.map((solucao) => {
      return solucao.value;
    });
  }
  getSolucoesWeights() {
    return this.solucoes.map((solucao) => {
      return solucao.weight;
    });
  }

  getAverage() {
    return W_AVG(this.getSolucoesValues(), this.getSolucoesWeights());
  }
}
