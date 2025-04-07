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

function loadData() {
  const Analise = JSON.parse(window.localStorage.getItem("analise_CRIAR"));
  const Estrategia = JSON.parse(
    window.localStorage.getItem("estrategia_CRIAR")
  );

  if (Analise && Estrategia) {
    // Ambos preenchidos
    updateFramework(Analise, "analitico");
    updateFramework(Estrategia, "estrategico");
  } else if (Analise) {
    // Somente Analise
    updateFramework(Analise, "analitico");
  } else if (Estrategia) {
    // Somente Estrategia
    updateFramework(Estrategia, "estrategico");
  }
}

loadData();

function updateFramework(Framework, framework_name) {
  updateFrameworkVisibility(framework_name);
  // C.R.I.A.R.
  updatePilarPercent(
    Framework.pilar.contexto.avg,
    Framework.pilar.contexto.id,
    framework_name
  );
  updatePilarPercent(
    Framework.pilar.recursos.avg,
    Framework.pilar.recursos.id,
    framework_name
  );
  updatePilarPercent(
    Framework.pilar.ideias.avg,
    Framework.pilar.ideias.id,
    framework_name
  );
  updatePilarPercent(
    Framework.pilar.acoes.avg,
    Framework.pilar.acoes.id,
    framework_name
  );
  updatePilarPercent(
    Framework.pilar.resultados.avg,
    Framework.pilar.resultados.id,
    framework_name
  );
  // EFETIVIDADE
  updateEfetividadeChart(Framework, framework_name);
  updateEfetividade(Framework.eficiencia, "eficiencia", framework_name);
  updateEfetividade(Framework.eficacia, "eficacia", framework_name);
  // FATOR K
  updateFatorK(Framework.fatorK, framework_name);
}

function updateFrameworkVisibility(framework_name) {
  $("[nc_data_framework='" + framework_name + "'][nc_data_type='status']").attr(
    "fw-status",
    "concluido"
  );
}

function updateEfetividadeChart(Framework, framework_name) {
  const vector = createVector(
    normalizeValue(Framework.eficacia),
    normalizeValue(Framework.eficiencia)
  );
  // update position
  setChartEfetividadeVector(vector, framework_name);
  // update quadrante
  setEfetividadeQuadrante(vector, framework_name);
  // update area
  setEfetividadeArea(vector, framework_name);
}

function setChartEfetividadeVector(vector, framework_name) {
  const { x, y } = vector;
  $("[nc_data_framework='" + framework_name + "'][nc_data_type='vector']")
    .css("left", x + "%")
    .css("bottom", y + "%");
}

function setEfetividadeArea(vector, framework_name) {
  const area = getEfetividadeArea(vector);
  $(
    "[nc_data_framework='" +
      framework_name +
      "'][nc_data_type='efetividade_chart']"
  ).attr("area", area);
}
function getEfetividadeArea(vector) {
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
function setEfetividadeQuadrante(vector, framework_name) {
  const quadrante = getEfetividadeQuadrante(vector);
  $(
    "[nc_data_framework='" +
      framework_name +
      "'][nc_data_type='efetividade_chart']"
  ).attr("quadrante", quadrante);
}
function getEfetividadeQuadrante(vector) {
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

function updateEfetividade(value, pilar, framework_name) {
  // Gauge
  updateGaugeChart(value, pilar, framework_name);
  // Percent
  updatePilarPercent(value, pilar, framework_name);
}

function updateGaugeChart(value, pilar, framework) {
  const startAngle = -180;
  let finalAngle = startAngle + normalizeValue(value) * 1.8;
  $(
    "[nc_data_framework='" +
      framework +
      "'][nc_data_pilar='" +
      pilar +
      "'][nc_data_type='gauge']"
  ).css("transform", "rotate(" + finalAngle + "deg)");
}

function updateFatorK(value, framework_name) {
  const fatorK = value * 10;
  let result = "";
  switch (true) {
    case fatorK < 10:
      result = "rudimentar";
      break;
    case fatorK < 40:
      result = "leiga";
      break;
    case fatorK < 70:
      result = "intuitiva";
      break;
    case fatorK < 80:
      result = "experiente";
      break;
    case fatorK < 90:
      result = "inteligente";
      break;
    case fatorK <= 100:
      result = "proficiente";
      break;
  }
  updatePilarPercent(value, "fator_k", framework_name);
  updateAttribute(result, "fator_k", framework_name, "fatorK");
}

function updatePilarPercent(value, pilar, framework) {
  // PERCENTAGE
  updatePercentages(
    value,
    $(
      "[nc_data_framework='" +
        framework +
        "'][nc_data_pilar='" +
        pilar +
        "'][nc_data_type='percentage']"
    )
  );
}

function updateAttribute(value, pilar, framework, attribute_name) {
  $(
    "[nc_data_framework='" +
      framework +
      "'][nc_data_pilar='" +
      pilar +
      "'][nc_data_type='wrapper_attribute']"
  ).attr(attribute_name, value);
}

function updatePercentages(value, $element) {
  $element.text("" + normalizeValue(value) + "%");
}

function normalizeValue(value) {
  value = value >= 0 ? value : 0;

  return roundNumber(value);
}
function roundNumber(number) {
  return Math.round(parseFloat(number) * 10);
}
function isInsideTriangle(P, A, B, C) {
  const triangle_area = calcTriangleArea(A, B, C);
  let sum_area = 0;
  sum_area += calcTriangleArea(A, B, P);
  sum_area += calcTriangleArea(A, C, P);
  sum_area += calcTriangleArea(B, C, P);

  if (triangle_area.toFixed(2) == sum_area.toFixed(2)) {
    return true;
  }
  return false;
}
function calcTriangleArea(a, b, c) {
  //(ΔABC) = |x1(y2 − y3) + x2(y3 − y1) + x3(y1 − y2)| / 2
  let area = 0;
  area += a.x * (b.y - c.y); // x1(y2 − y3)
  area += b.x * (c.y - a.y); // x2(y3 − y1)
  area += c.x * (a.y - b.y); // x3(y1 − y2)
  area = Math.abs(area / 2);
  return area;
}
function createVector(x, y) {
  return { x: x, y: y };
}
