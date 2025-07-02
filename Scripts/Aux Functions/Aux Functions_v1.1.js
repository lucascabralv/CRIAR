/**------------------------------------------------------------------------
 *                           AUX FUNCTIONS
 *------------------------------------------------------------------------**/
/**--------------------------------------------
 *                    AVG
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
 *                  W_AVG
 *---------------------------------------------**/
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
/**--------------------------------------------
 *               createUID
 *---------------------------------------------**/
function createUID() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

/**--------------------------------------------
 *               numberToReal
 *---------------------------------------------**/
function numberToReal(number) {
  if (!number || typeof number !== "number") {
    return "R$ 0,00";
  }
  let resp = "";
  const spltNum = number.toString().split(".");
  let inteiros = "";
  let j = 0;
  for (let i = spltNum[0].length - 1; i >= 0; i--) {
    if (j == 3) {
      inteiros = spltNum[0][i] + "." + inteiros;
      j = 1;
    } else {
      inteiros = spltNum[0][i] + inteiros;
      j++;
    }
  }
  if (spltNum.length == 2) {
    resp = "R$ " + inteiros + "," + spltNum[1];
  } else {
    resp = "R$ " + inteiros + "," + "00";
  }
  return resp;
}

/**--------------------------------------------
 *              GRAPH FUNCTIONS
 *---------------------------------------------**/
function normalizeValue(value, decimais = 1) {
  value = value >= 0 ? value : 0;

  return roundNumber(value, decimais);
}
function roundNumber(number, decimais) {
  const constante_decimal = Math.pow(10, decimais);
  return Math.round(parseFloat(number) * constante_decimal) / constante_decimal;
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
