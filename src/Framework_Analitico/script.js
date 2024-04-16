// ADICIONAR A PORCENTAGEM E O CIRCULO DE PROGRESSO

class Pilar {
  constructor(id) {
    this.id = id;
    this[0] = 0;
    this[1] = 0;
    this[2] = 0;
    this.weights = [3, 3, 3];
  }
  get average() {
    // Média Simples
    //return AVG([this[0], this[1], this[2]]);
    // Média Ponderada
    return W_AVG([this[0], this[1], this[2]], this.weights);
  }
}

const $container = $("#container-fwa");
const max_question_number = $(".question-fwa-wrapper").length;
let current_question_number = 1;

const Analise = {
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
  // Define o valor do criterio do pilar e o valor das analises
  updateValues: function (obj) {
    const { value, index, pilar } = obj;
    this.pilar[pilar][index] = value;
  },

  updateWeights: function (obj) {
    const { value, index, pilar } = obj;
    this.pilar[pilar].weights[index] = value;
  },
  setLocalStorage: function () {
    window.localStorage.setItem("analise_CRIAR", JSON.stringify(this));
  },
};

function getAnswer($clicked_option) {
  const answer = $clicked_option.index();
  const question_index = $clicked_option
    .parents(".question-fwa-wrapper")
    .attr("question-index");
  const pilar = $clicked_option.parents(".section-pilar-fwa").attr("pilar");

  Analise.updateValues({
    pilar: pilar,
    value: parseInt(answer),
    index: parseInt(question_index),
  });
}

function getWeight($weight_option) {
  const value = $weight_option.attr("question_weight");
  const question_index = $weight_option
    .parents(".question-fwa-wrapper")
    .attr("question-index");
  const pilar = $weight_option.parents(".section-pilar-fwa").attr("pilar");
  Analise.updateWeights({
    pilar: pilar,
    value: parseInt(value),
    index: parseInt(question_index),
  });
}

function highlightSelection($clicked_option, className) {
  $clicked_option.siblings("." + className).removeClass(className);
  $clicked_option.addClass(className);
}

function nextQuestion($option) {
  const $question = $option.parents(".question-fwa-wrapper");

  if (
    $question.attr("question-status") == "current" &&
    current_question_number < max_question_number
  ) {
    current_question_number++;
    focusNextQuestion($question);
    moveToNextQuestion();
  }
}

function focusNextQuestion($question) {
  $question.attr("question-status", ""); // set status no none
  $container
    .find("[question-number='" + current_question_number + "']")
    .attr("question-status", "current");
}

function moveToNextQuestion() {
  const $next_question = $container.find(
    "[question-number='" + current_question_number + "']"
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

/**--------------------------------------------
 *h/          EVENT HANDLERS
 *---------------------------------------------**/
$(".option-fwa").on("click", function () {
  const $option = $(this);
  getAnswer($option);
  highlightSelection($option, "selected");
  nextQuestion($option);
});

$(".weight-fwa-option").on("click", function () {
  const $weight_option = $(this);
  getWeight($weight_option);
  highlightSelection($weight_option, "selected");
});

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
// MÉDIA PONDERADA
function W_AVG(values, weights) {
  if (values.length !== weights.length) {
    throw "Values and Weights have different length";
  }
  let numerador = 0;
  let denominador = 0;
  for (let i = 0; i < values.length; i++) {
    numerador += values[i] * weights[i];
    denominador += weights[i];
  }
  return Math.round((numerador / denominador) * 1000) / 1000;
}
