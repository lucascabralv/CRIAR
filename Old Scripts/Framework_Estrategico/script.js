/**--------------------------------------------
 *h/          GLOBAL VARIABLES
 *---------------------------------------------**/
const $container = $("#container-fwe");
 const max_fatores_per_pilar = 3;
const max_index_per_fator = 3;
let current_question_number = 1;
const pilaresNames = ["contexto", "recursos", "ideias", "acoes", "resultados"];

function findSolucao(slugToSearch) {
  return SOLUCOES.find((solucao) => solucao.slug === slugToSearch);
}

// Mostra as informações da solução no PopUp
function loadSolucao(solucao) {
  const {
    nome,
    nome_curto,
    descricao,
    problema,
    solucao_padrao,
    efetividade_padrao,
    deslocamento_lateral,
    nova_hipotese,
    pilar,
    fator,
    flywheel,
    investimento,
    automacao,
    publicos_potenciais,
    potencial,
    efetividade,
  } = solucao;

  $("#text_nome").text(nome);
  $("#text_problema").text(problema);
  $("#text_solucao_padrao").text(solucao_padrao);
  $("#text_nova_hipotese").text(nova_hipotese);
  $("#text_solucao_CRIAR").text(nome);
  $("#text_efetividade").text(efetividade);
}

/**------------------------------------------------------------------------
 *h/                    CARD CLICK HANDLERS
 *------------------------------------------------------------------------**/
// 'INFO' BUTTON
$(".button-info-fwe-card").click(function () {
  const slug = $(this).attr("solucao_slug");
  const solucao = findSolucao(slug);
  // FILL POPUP WITH SOLUCAO INFO
  loadSolucao(solucao);
  // OPEN POPUP
  openPopup();
});

// 'SELECT' BUTTON
$(".button-select-fwe-card").click(function () {
  const $button = $(this); // Botão selecionar
  const $card = $button.parents(".answer-fwe-card");
  const $question_wrapper = $card.parents(".question-fwe-wrapper"); // Question FWE Wrapper
  const card_index = parseInt($card.parent().index()); // C Item Solucoes FWE
  const fator = parseInt($question_wrapper.attr("question-index"));
  const pilar = $card.parents(".section-pilar-fwe").attr("pilar");
  // IF IT IS NOT SELECTED YET
  if (!$button.hasClass("selected")) {
    const slug = $card.attr("solucao_slug");
    const solucao = findSolucao(slug);
    const efetividade = solucao.efetividade;
    Estrategia.updateValue({
      value: efetividade,
      pilar: pilar,
      fator: fator,
      index: card_index,
    });
  } else {
    Estrategia.resetValue({
      pilar: pilar,
      fator: fator,
      index: card_index,
    });
  }
  $button.toggleClass("selected");
});


function moveToNextQuestion(number) {
  const questionNumber = number ? number : current_question_number;
  const $next_question = $container.find(
    "[question-number='" + questionNumber + "']"
  );
  const elementRect = $next_question[0].getBoundingClientRect();
  const absoluteElementTop = elementRect.top + window.pageYOffset;
  const positionToScroll =
    absoluteElementTop - window.innerHeight / 2 + elementRect.height / 2;
  window.scrollTo({
    top: positionToScroll,
    behavior: "smooth",
  });
}
$(".arrow-fw").click(() => {
  moveToNextQuestion(1);
});
/**------------------------------------------------------------------------
 *h/                           POP UP
 *------------------------------------------------------------------------**/
// POPUP OVERLAY || CLOSE BUTTON
$(".popup-fwe-close, .popup-fwe-overlay").click(closePopup);

//POP UP OPEN
function openPopup() {
  $(".popup-fwe-wrapper").removeClass("closed");
}
//POP UP CLOSE
function closePopup() {
  $(".popup-fwe-wrapper").addClass("closed");
}

/**--------------------------------------------
 *h/          PILAR CLASS
 *---------------------------------------------**/
class Pilar {
  constructor(id) {
    this.id = id; // PILAR
    this[0] = -1; // FATOR
    this[1] = -1; // FATOR
    this[2] = -1; // FATOR
    this.avg = -1;
    this.efetividades = [
      [0, 0, 0], // FATOR [solucao, solucao, solucao]
      [0, 0, 0], // FATOR [solucao, solucao, solucao]
      [0, 0, 0], // FATOR [solucao, solucao, solucao]
    ];
  }
  get average() {
    // Média Simples
    return AVG([this[0], this[1], this[2]]);
  }
  updateFatorAVG(fator) {
    const fatorArray = this.efetividades[fator];
    this[fator] = AVG(fatorArray);
  }
  updateAVG(fator) {
    this.updateFatorAVG(fator);
    // Atualiza também o valor da média do Pilar
    this.avg = this.average;
  }
  updateEfetividade(fator, index, value) {
    this.efetividades[fator][index] = value;
    this.updateAVG(fator);
    Estrategia.setLocalStorage();
  }
  resetEfetividade(fator, index) {
    this.updateEfetividade(fator, index, 0);
    this.updateAVG(fator);
    Estrategia.setLocalStorage();
  }
}

/**--------------------------------------------
 *h/          AUX FUNCTIONS/VARIABLES
 *---------------------------------------------**/
function AVG(values) {
  let sum = 0;
  let i = 0;
  for (i; i < values.length; i++) {
    sum += values[i];
  }
  // Similar to .toFixed(3)
  return Math.round((sum / i) * 1000) / 1000;
}

/**--------------------------------------------
 *h/          ESTRATÉGIA OBJECT
 *---------------------------------------------**/
const Estrategia = {
  pilar: {
    contexto: new Pilar("contexto"),
    recursos: new Pilar("recursos"),
    ideias: new Pilar("ideias"),
    acoes: new Pilar("acoes"),
    resultados: new Pilar("resultados"),
  },
  // FATOR K = MEDIA(Contexto, Resultados)
  get fatorK() {
    return AVG([this.pilar.contexto.average, this.pilar.resultados.average]);
  },
  // EFICIENCIA = MEDIA(FatorK, Recursos)
  get eficiencia() {
    return AVG([this.fatorK, this.pilar.recursos.average]);
  },
  // EFICACIA = MEDIA(IDEIAS, ACOES)
  get eficacia() {
    return AVG([this.pilar.ideias.average, this.pilar.acoes.average]);
  },
  // Define o valor do criterio do pilar e o valor das estrategias
  updateValue(obj) {
    const { value, pilar, fator, index } = obj;
    // Atualiza o valor da efetividade da solucao
    this.pilar[pilar].updateEfetividade(fator, index, value);
  },

  resetValue(obj) {
    const { pilar, fator, index } = obj;
    // Reseta o valor da efetividade da solucao para 0
    this.pilar[pilar].resetEfetividade(fator, index);
  },

  // A partir do localStorage, recupera as respostas anteriores do usuário
  recoverAllData(pilar) {
    const { id, efetividades } = pilar;
    for (
      let fator_index = 0;
      fator_index < max_fatores_per_pilar;
      fator_index++
    ) {
      for (let index = 0; index < max_index_per_fator; index++) {
        this.updateValue({
          value: efetividades[fator_index][index],
          pilar: id,
          fator: fator_index,
          index: index,
        });
      }
    }
  },
  setLocalStorage() {
    window.localStorage.setItem("estrategia_CRIAR", JSON.stringify(this));
  },
  getLocalStorage(lsEstrategia) {
    pilaresNames.forEach((pilarName) => {
      this.recoverAllData(lsEstrategia.pilar[pilarName]);
    });
  },
};

// Seleciona visualmente
function oldDataSelection(lsEstrategia) {
  pilaresNames.forEach((pilarName) => {
    const pilar = lsEstrategia.pilar[pilarName];

    for(let fator_index = 0; fator_index < max_fatores_per_pilar; fator_index++) {
      let $question = $(".section-pilar-fwe[pilar='" + pilar.id + "']").find("[question-index='" + fator_index + "']");
      for(let index = 0; index < max_index_per_fator; index++) {
        if (pilar.efetividades[fator_index][index] !== 0) {
          // SELECT
          $question
            .find(".c-item-solucoes-fwe")
            .eq(index)
            .find(".button-select-fwe-card").addClass("selected");
        }
      }
    }
  });
}
function loadOldData() {
  const lsEstrategia = JSON.parse(
    window.localStorage.getItem("estrategia_CRIAR")
  );
  if (!lsEstrategia) {
    console.log("No answers yet");
    return;
  }
  Estrategia.getLocalStorage(lsEstrategia);
  oldDataSelection(lsEstrategia);
}

/**--------------------------------------------
 *h/          STARTER FUNCTIONS
 *---------------------------------------------**/
loadOldData();
