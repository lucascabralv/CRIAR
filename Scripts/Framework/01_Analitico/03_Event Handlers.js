/**--------------------------------------------
 *               EVENT HANDLERS
 *---------------------------------------------**/

/**==========================
 *       RANGE SLIDER
 *===========================**/

$(".input-range-analise").on("change", function () {
  inputRangeSliderHandler($(this));
});

function inputRangeSliderHandler(el) {
  const pilar = el.parents("[nc_pilar]").attr("nc_pilar"),
    value = parseInt(el.val()),
    index = el.parents(".analise-input-card").attr("analise_index");

  F_ANALITICO.updateSolucaoValue(pilar, index, value);
}

/**==========================
 *    WEIGHT SELECTOR
 *===========================**/

$(".analise-weight-selector").on("click", function () {
  inputWeightHandler($(this));
});

function inputWeightHandler(el) {
  const pilar = el.parents("[nc_pilar]").attr("nc_pilar"),
    weight = parseInt(el.attr("weight")),
    index = el.parents(".analise-input-card").attr("analise_index");

  F_ANALITICO.updateSolucaoWeight(pilar, index, weight);

  el.siblings().removeClass("selected");
  el.addClass("selected");
}
