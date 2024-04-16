class Pilar {
  constructor(id) {
    this.id = id;
    this[0] = 0;
    this[1] = 0;
    this[2] = 0;
  }
  get average() {
    return AVG([this[0], this[1], this[2]]);
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
function selectAnswer($clicked_option) {
  $clicked_option.siblings(".selected").removeClass("selected");
  $clicked_option.addClass("selected");
}

function nextQuestion($option) {
  const $question = $option.parents(".question-fwa-wrapper");

  if (
    $question.hasClass("current") &&
    current_question_number < max_question_number
  ) {
    current_question_number++;
    focusNextQuestion($question);
    moveToNextQuestion();
  }
}

function focusNextQuestion($question) {
  $question.removeClass("current");
  $container
    .find("[question-number='" + current_question_number + "']")
    .addClass("current");
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
  selectAnswer($option);
  nextQuestion($option);
});

/**--------------------------------------------
 *h/          AUX FUNCTIONS/VARIABLES
 *---------------------------------------------**/
function AVG(arr) {
  let sum = 0;
  let i = 0;
  for (i; i < arr.length; i++) {
    sum += arr[i];
  }
  // Similar to .toFixed(3)
  return Math.round((sum / i) * 1000) / 1000;
}
