/**------------------------------------------------------------------------
 *                       DADOS E ESTATISTICAS
 *------------------------------------------------------------------------**/
/**--------------------------------------------
 *               Class Graficos
 *---------------------------------------------**/

class Graficos {
  lista_pilares = [];
  lista_cores = {
    contexto: ["#46CAD4", "#446ECF"],
    recursos: ["#5E4694", "#8F4592"],
    ideias: ["#D64B97", "#CF6349"],
    acoes: ["#ED8740", "#EAB83F"],
    resultados: ["#9AB858", "#55B260"],
  };
  lista_frameworks = [];

  load() {
    // Each Pilar
    PILARES.forEach((pilar_name) => {
      const lista_pilar_solucoes = F_ESTRATEGICO.getListaSolucoes().filter(
        (solucao) => solucao.pilar === pilar_name
      );
      this.lista_pilares[pilar_name] = {
        RadarChart: this.setPilarRadar(pilar_name, lista_pilar_solucoes),
      };
    });
    // Each Framework
    FRAMEWORKS.forEach((framework)=> {
      this.lista_frameworks[framework] = {
        RadarChart: this.setFrameworkRadar(framework),
      } 
    });

  }

  //h/ Por pilar
  updatePilarMedias(
    pilar,
    media_analitica,
    media_estrategica,
    media_estatistica
  ) {
    // BIG CIRCLE
    $("[nc_pilar='" + pilar + "'] .big-circle-analise").val(media_estatistica);
    // PERCENTUAL -> MEDIA PILAR -> ANALITICA
    $("[nc_pilar='" + pilar + "'] [nc_el='pilar_media_analitica']").text(
      media_analitica
    );
    // PERCENTUAL -> MEDIA PILAR -> ESTRATEGICA
    $("[nc_pilar='" + pilar + "'] [nc_el='pilar_media_estrategica']").text(
      media_estrategica
    );
    // PERCENTUAL -> MEDIA PILAR -> ESTATISTICA
    $("[nc_pilar='" + pilar + "'] [nc_el='pilar_media_estatistica']").text(
      media_estatistica
    );
  }
  setPilarRadar(pilar_name, solucoes) {
    const radarCanvas = document.querySelector(
      "[nc_pilar='" + pilar_name + "'] [nc_el='pilar_radar_chart']"
    );
    const radarChartDefaultData = [0, 0, 0];
    const RadarChart = new Chart(radarCanvas, {
      type: "radar",
      data: {
        labels: [solucoes[0].nome, solucoes[1].nome, solucoes[2].nome],
        datasets: [
          {
            label: "Analítico",
            data: radarChartDefaultData,
            borderWidth: 1,
            backgroundColor: "transparent",
            borderColor: this.lista_cores[pilar_name][0],
          },
          {
            label: "Estratégico",
            data: radarChartDefaultData,
            borderWidth: 1,
            backgroundColor: "transparent",
            borderColor: this.lista_cores[pilar_name][1],
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          r: {
            beginAtZero: true,
            min: 0,
            max: 100,
            grid: {
              color: "#33323E",
            },
            ticks: {
              display: false,
            },
            pointLabels: {
              font: {
                size: 14,
              },
            },
          },
        },
      },
    });

    return RadarChart;
  }
  updatePilarRadar(pilar, solucoes_analiticas, solucoes_estrategicas) {
    const data_analitico = solucoes_analiticas.map((solucao) => solucao.value);
    const data_estrategico = solucoes_estrategicas.map(
      (solucao) => solucao.media
    );

    // Update valores radar
    this.lista_pilares[pilar].RadarChart.data.datasets[0].data = data_analitico;
    this.lista_pilares[pilar].RadarChart.data.datasets[1].data =
      data_estrategico;
    this.lista_pilares[pilar].RadarChart.update();
  }

  //h/ Por solucao
  updateSolucoesMediasBars(id, pilar, value) {
    const solucao_bar_index = (id - 1) % 3;

    $("[nc_pilar='" + pilar + "'] .average-solucao-bar-wrapper")
      .eq(solucao_bar_index)
      .find(".average-solucao-bar")
      .css({ width: value + "%" });

    $("[nc_pilar='" + pilar + "'] .average-solucao-bar-wrapper")
      .eq(solucao_bar_index)
      .find("[nc_el='bar_solucao_average']")
      .text(value);
  }

  //h/ Por Framework
  // EFETIVIDADE
  updateFrameworkEfetividade(framework, data) {
    this.updateFrameworkChart(
      framework,
      data.eficiencia,
      data.eficacia,
      data.efetividade
    );
    this.updateFrameworkGauge(framework, data.eficiencia, data.eficacia);
    this.updateFrameworkFatorK(framework, data.fator_k);
    if (framework === "geral") {
      this.updateFrameworkRadar(framework, data.pilares);
    }
  }
  // EFETIVIDADE -> Eixo X,Y
  updateFrameworkChart(framework, eficiencia, eficacia, efetividade) {
    // Dot Position
    const { x, y } = createVector(eficiencia, eficacia);
    $("[nc_data_framework='" + framework + "'][nc_data_type='vector']")
      .css("left", x + "%")
      .css("bottom", y + "%");
    // Quadrante
    $(
      "[nc_data_framework='" +
        framework +
        "'][nc_data_type='efetividade_chart']"
    ).attr("quadrante", efetividade.quadrante);
    // Area
    $(
      "[nc_data_framework='" +
        framework +
        "'][nc_data_type='efetividade_chart']"
    ).attr("area", efetividade.area);
    // Padroes de Efetividade
    $(
      "[nc_data_framework='" +
        framework +
        "'][nc_data_type='efetividade_chart']"
    )
      .attr("efetividade_1", efetividade.padrao_1)
      .attr("efetividade_2", efetividade.padrao_2);
  }
  // EFETIVIDADE -> GAUGE
  updateFrameworkGauge(framework, eficiencia, eficacia) {
    this.updateGaugeChart(framework, "eficiencia", eficiencia);
    this.updateGaugeChart(framework, "eficacia", eficacia);
  }
  updateGaugeChart(framework, tipo, value) {
    // SemiCircle / Gauge
    const startAngle = -180;
    let finalAngle = startAngle + normalizeValue(value) * 1.8;
    $(
      "[nc_data_framework='" +
        framework +
        "'][nc_data_tipo='" +
        tipo +
        "'][nc_data_type='gauge']"
    ).css("transform", "rotate(" + finalAngle + "deg)");
    // Percent Number
    $(
      "[nc_data_framework='" +
        framework +
        "'][nc_data_tipo='" +
        tipo +
        "'][nc_data_type='number']"
    ).text(normalizeValue(value));
  }
  // FATOR K -> Lampada/Percentual/Escala
  updateFrameworkFatorK(framework, fator_k) {
    $("[nc_data_framework='" + framework + "'][nc_data_tipo='fator_k']").attr(
      "fatork",
      fator_k.categoria
    );
    $(
      "[nc_data_framework='" +
        framework +
        "'][nc_data_tipo='fator_k'] [nc_data_type='percentage']"
    ).text(fator_k.value);
  }

  // RADAR
  setFrameworkRadar(framework) {
    const radarCanvas = document.querySelector(
      "[nc_data_framework='" + framework + "'][nc_data_tipo='radar']"
    );

    if(!radarCanvas) return;

    const radarChartDefaultData = [0, 0, 0, 0, 0];
    const RadarChart = new Chart(radarCanvas, {
      type: "radar",
      data: {
        labels: ["C.ontexto", "R.ecursos", "I.deias", "A.ções", "R.esultados"],
        datasets: [
          {
            label: "",
            data: radarChartDefaultData,
            borderWidth: 1,
            backgroundColor: "transparent",
            borderColor: "#038C8C",
          }
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          r: {
            beginAtZero: true,
            min: 0,
            max: 100,
            grid: {
              color: "#33323E",
            },
            ticks: {
              display: false,
            },
            pointLabels: {
              font: {
                size: 14,
              },
            },
          },
        },
      },
    });

    return RadarChart;
  }
  updateFrameworkRadar(framework, pilares){
    // Update valores radar
    this.lista_frameworks[framework].RadarChart.data.datasets[0].data = [
      pilares.contexto,
      pilares.recursos,
      pilares.ideias,
      pilares.acoes,
      pilares.resultados,
    ];
    this.lista_frameworks[framework].RadarChart.update();
  }

}

/**--------------------------------------------
 *               Class Estatisticas
 *---------------------------------------------**/
class Estatisticas {
  lista_pilares = [];
  lista_solucoes_analiticas = [];
  lista_solucoes_estrategicas = [];
  lista_estatisticas_all_solucoes = [];

  ARRAY_SIZE;

  load() {
    this.setListaPilares();
    this.setListaAnalitica();
    this.setListaEstrategica();
    this.ARRAY_SIZE = this.lista_solucoes_analiticas.length; // Número total de solucoes
    this.setListaEstatisticasAllSolucoes();
  }

  setListaPilares() {
    PILARES.forEach((pilar_name) => {
      this.lista_pilares[pilar_name] = {
        media_analitica: 0,
        media_estrategica: 0,
        media_analitica_estrategica: 0,
      };
    });
  }
  setListaAnalitica() {
    this.lista_solucoes_analiticas = F_ANALITICO.getSolucoesInfosList();
  }
  setListaEstrategica() {
    this.lista_solucoes_estrategicas = F_ESTRATEGICO.getListaMediaSolucoes();
  }
  setListaEstatisticasAllSolucoes() {
    //const current_solucao = F_ESTRATEGICO.findSolucaoByID(i + 1);
    for (let i = 0; i < this.ARRAY_SIZE; i++) {
      this.lista_estatisticas_all_solucoes.push({
        id: i + 1,
        pilar: PILARES[Math.floor(i / 3)],
        media_analitica_estrategica: 0,
      });
    }
  }
  updateAnalitico(pilar, solucao_id) {
    this.setListaAnalitica();
    this.updateSolucaoEstatistica(pilar, solucao_id);
    this.updateFrameworks();
  }
  updateEstrategicoSolucoes(pilar, solucao_id) {
    this.setListaEstrategica();
    this.updateSolucaoEstatistica(pilar, solucao_id);
    this.updateFrameworks();
  }

  calculateSolucao(media_analitica, media_estrategica) {
    const max_value = Math.max(media_analitica, media_estrategica);
    const min_value = Math.min(media_analitica, media_estrategica);
    const delta = (100 - max_value) / 100; // %

    return Math.round((max_value + min_value * delta) * 10) / 10;
  }

  calculateFatorK(contexto, resultados) {
    let fatorK = AVG([contexto, resultados]);
    let categoria = "";
    switch (true) {
      case fatorK < 10:
        categoria = "rudimentar";
        break;
      case fatorK < 40:
        categoria = "leiga";
        break;
      case fatorK < 70:
        categoria = "intuitiva";
        break;
      case fatorK < 80:
        categoria = "experiente";
        break;
      case fatorK < 90:
        categoria = "inteligente";
        break;
      case fatorK <= 100:
        categoria = "proficiente";
        break;
    }
    return { value: fatorK, categoria: categoria };
  }
  calculateEfetividade(eficiencia, eficacia) {
    return {
      quadrante: this.getEfetividadeQuadrante(
        createVector(eficiencia, eficacia)
      ),
      area: this.getEfetividadeArea(createVector(eficiencia, eficacia)),
    };
  }
  calculateEfetividadePadrao(fator_k, recursos, ideias, acoes) {
    let padroes = {
      padrao_1: "saudavel",
      padrao_2: "saudavel"
    }
    if (fator_k <= recursos) {
      padroes.padrao_1 = "insalubre";
    }
    if (ideias <= acoes) {
      padroes.padrao_2 = "insalubre";
    }
    return padroes;
  }

  getPilarMediaAnalitica(pilar_name) {
    return Math.round(F_ANALITICO.getPilarAverage(pilar_name) * 10) / 10;
  }
  getPilarMediaEstrategica(pilar_name) {
    const lista_filtrada = this.lista_solucoes_estrategicas.filter(
      (solucao) => {
        return solucao.pilar === pilar_name;
      }
    );
    const soma_total = lista_filtrada.reduce((total, solucao) => {
      return total + solucao.media;
    }, 0);
    return Math.round((soma_total / lista_filtrada.length) * 10) / 10; // MEDIA
  }
  getPilarMediaEstrategicaAnalitica(pilar_name) {
    const lista_filtrada = this.lista_estatisticas_all_solucoes.filter(
      (solucao) => {
        return solucao.pilar === pilar_name;
      }
    );
    const soma_total = lista_filtrada.reduce((total, solucao) => {
      return total + solucao.media_analitica_estrategica;
    }, 0);
    return Math.round((soma_total / lista_filtrada.length) * 10) / 10;
  }

  getEfetividadeQuadrante(vector) {
    const { x, y } = vector;
    let result = "";
    switch (true) {
      case x <= 50 && y <= 50:
        result = "incipiente";
        break;
      case x <= 50 && y > 50:
        result = "potencial";
        break;
      case x > 50 && y <= 50:
        result = "inerte";
        break;
      case x > 50 && y > 50:
        result = "efetivo";
        break;
    }
    return result;
  }
  getEfetividadeArea(vector) {
    let result = "";
    let P = vector;
    switch (true) {
      case isInsideTriangle(P, V.a, V.b, V.d):
        result = "startup";
        break;
      case isInsideTriangle(P, V.b, V.d, V.e):
        result = "risco";
        break;
      case isInsideTriangle(P, V.d, V.e, V.g):
        result = "oportunidade";
        break;
      case isInsideTriangle(P, V.e, V.g, V.h):
        result = "desafio";
        break;
      case isInsideTriangle(P, V.e, V.f, V.h):
        result = "commodity";
        break;
      case isInsideTriangle(P, V.f, V.h, V.i):
        result = "lideranca";
        break;
      case isInsideTriangle(P, V.b, V.c, V.e):
        result = "obsolescencia";
        break;
      case isInsideTriangle(P, V.c, V.e, V.f):
        result = "nicho";
        break;
      default:
        console.log("Erro na Area");
        break;
    }
    return result;
  }

  getFrameworkData(contexto, recursos, ideias, acoes, resultados) {
    const fatorK = this.calculateFatorK(contexto, resultados);
    const eficiencia = AVG([fatorK.value, recursos]);
    const eficacia = AVG([ideias, acoes]);
    const padroes = this.calculateEfetividadePadrao(
      fatorK.value,
      recursos,
      ideias,
      acoes
    );
    const efetividade = this.calculateEfetividade(eficiencia, eficacia);

    return {
      eficiencia: eficiencia,
      eficacia: eficacia,
      efetividade: {
        quadrante: efetividade.quadrante,
        area: efetividade.area,
        padrao_1: padroes.padrao_1,
        padrao_2: padroes.padrao_2,
      },
      fator_k: {
        value: fatorK.value,
        categoria: fatorK.categoria,
      },
      pilares: {
        contexto: contexto,
        recursos: recursos,
        ideias: ideias,
        acoes: acoes,
        resultados: resultados,
      },
    };
  }

  updateEstatisticasPilar(pilar_name) {
    const media_analitica = this.getPilarMediaAnalitica(pilar_name);
    const media_estrategica = this.getPilarMediaEstrategica(pilar_name);
    let media_analitica_estrategica = 0;
    if (media_analitica > 0 && media_estrategica > 0) {
      media_analitica_estrategica =
        this.getPilarMediaEstrategicaAnalitica(pilar_name);
    } else if (media_estrategica > 0) {
      media_analitica_estrategica = media_estrategica;
    } else {
      media_analitica_estrategica = media_analitica;
    }
    this.lista_pilares[pilar_name].media_analitica_estrategica =
      media_analitica_estrategica;
    this.lista_pilares[pilar_name].media_analitica = media_analitica;
    this.lista_pilares[pilar_name].media_estrategica = media_estrategica;
  }
  updateEstatisticasPilares() {
    PILARES.forEach((pilar) => {
      this.updateEstatisticasPilar(pilar);
      // VISUAL UPDATE
      GRAFICOS.updatePilarMedias(
        pilar,
        this.lista_pilares[pilar].media_analitica,
        this.lista_pilares[pilar].media_estrategica,
        this.lista_pilares[pilar].media_analitica_estrategica
      );

      const pilar_solucoes_analiticas = this.lista_solucoes_analiticas.filter(
        (solucao) => solucao.pilar === pilar
      );
      const pilar_solucoes_estrategica =
        this.lista_solucoes_estrategicas.filter(
          (solucao) => solucao.pilar === pilar
        );

      GRAFICOS.updatePilarRadar(
        pilar,
        pilar_solucoes_analiticas,
        pilar_solucoes_estrategica
      );
    });
  }
  updateSolucaoEstatistica(pilar, solucao_id) {
    // MEDIAS SOLUCOES
    const index = solucao_id - 1;
    const media_analitica = this.lista_solucoes_analiticas[index]
      ? this.lista_solucoes_analiticas[index].value
      : 0;
    const media_estrategica = this.lista_solucoes_estrategicas[index]
      ? this.lista_solucoes_estrategicas[index].media
      : 0;
    const media_estatistica = this.calculateSolucao(
      media_analitica,
      media_estrategica
    );
    this.lista_estatisticas_all_solucoes[index].media_analitica_estrategica =
      media_estatistica;
    // VISUAL UPDATE
    GRAFICOS.updateSolucoesMediasBars(
      solucao_id,
      pilar,
      this.lista_estatisticas_all_solucoes[index].media_analitica_estrategica
    );
    // MEDIA PILARES
    this.updateEstatisticasPilares();
  }

  updateFrameworks() {
    /* const f_analitico_data = this.getFrameworkData(
      this.lista_pilares["contexto"].media_analitica,
      this.lista_pilares["recursos"].media_analitica,
      this.lista_pilares["ideias"].media_analitica,
      this.lista_pilares["acoes"].media_analitica,
      this.lista_pilares["resultados"].media_analitica
    ); */

    /* const f_estrategico_data = this.getFrameworkData(
      this.lista_pilares["contexto"].media_estrategica,
      this.lista_pilares["recursos"].media_estrategica,
      this.lista_pilares["ideias"].media_estrategica,
      this.lista_pilares["acoes"].media_estrategica,
      this.lista_pilares["resultados"].media_estrategica
    ); */

    const f_geral_data = this.getFrameworkData(
      this.lista_pilares["contexto"].media_analitica_estrategica,
      this.lista_pilares["recursos"].media_analitica_estrategica,
      this.lista_pilares["ideias"].media_analitica_estrategica,
      this.lista_pilares["acoes"].media_analitica_estrategica,
      this.lista_pilares["resultados"].media_analitica_estrategica
    );
    // GRAFICOS
    // EFETIVIDADE
    GRAFICOS.updateFrameworkEfetividade("geral", f_geral_data);

    //GRAFICOS.updateFrameworkEfetividade("analitico", f_analitico_data);
    //GRAFICOS.updateFrameworkEfetividade("estrategico", f_estrategico_data);
  }
}
