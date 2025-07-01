/**------------------------------------------------------------------------
 *                           GLOBAL
 *------------------------------------------------------------------------**/
const PILARES = ["contexto", "recursos", "ideias", "acoes", "resultados"];
const FRAMEWORKS = ["geral", "analitico", "estrategico"];
const V = {
  a: createVector(0, 0),
  b: createVector(50, 0),
  c: createVector(100, 0),
  d: createVector(0, 50),
  e: createVector(50, 50),
  f: createVector(100, 50),
  g: createVector(0, 100),
  h: createVector(50, 100),
  i: createVector(100, 100),
};


const F_ANALITICO = new Framework_Analitico();
const F_ESTRATEGICO = new Framework_Estrategico();

const GRAFICOS = new Graficos();
const ESTATISTICAS = new Estatisticas();

const ROI_ESTRATEGICO = new ROI();

(async () => {
  await F_ESTRATEGICO.load();
  GRAFICOS.load();
  ESTATISTICAS.load();

  // OLD DATA RECOVER
  F_ANALITICO.loadOldData();
  F_ESTRATEGICO.loadOldData();

  setTimeout(() => {
    $(".page-loader").addClass("hidden");
  }, 2000);
})();


PILARES.forEach((name) => {
  solucoesDragAndDrop(name);
  complementosDragAndDrop(name);
});