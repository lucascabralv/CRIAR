/**------------------------------------------------------------------------
 *                           TAB SELECTION
 *------------------------------------------------------------------------**/
$("[nc_criar_el='tab_pilar']").on("click", function () {
  const pilarName = $(this).attr("nc_pilar");
  $("[nc_criar_el='tab_pilar_content'][nc_pilar='" + pilarName + "']").click();
});

$(".card-pilar-expand").on("click", function () {
  const pilarName = $(this).parents("[nc_pilar]").attr("nc_pilar");
  $("[nc_criar_el='tab_pilar'][nc_pilar='" + pilarName + "']").click();
  $("[nc_criar_el='tab_pilar_content'][nc_pilar='" + pilarName + "']").click();
});
/**------------------------------------------------------------------------
 *                           SOLUCOES DRAG
 *------------------------------------------------------------------------**/

function solucoesDragAndDrop(pilarName) {
  const $list_origem = $("[nc_pilar='" + pilarName + "'] .solucoes-list")[0];
  const $list_destino = $(
    "[nc_pilar='" + pilarName + "'] .selected-solucoes-list"
  )[0];
  let api_containers = [$list_origem, $list_destino];

  let dragAPI = dragula({
    containers: api_containers,
    copy: function (el, source) {
      const isListOrigem = source === $list_origem;
      return isListOrigem;
    },
    accepts: function (el, target) {
      const isListDestino = target === $list_destino;
      return isListDestino;
    },
    removeOnSpill: true,
  });

  dragAPI.on("drop", function (el) {
    if (!el.getAttribute("uid")) {
      const slug = el.getAttribute("slug_criar");
      const pilar = el.getAttribute("nc_pilar");
      const uid = createUID();
      el.setAttribute("uid", uid);

      CRIAR.addSelectionBySlug(pilar, "solucoes", slug, uid);

      updateValuesTexts(pilar);
    }
    
  });
  dragAPI.on("remove", function (el) {
    const pilar = el.getAttribute("nc_pilar");
    const uid = el.getAttribute("uid");
    CRIAR.removeSelectionByUID(pilar, "solucoes", uid);

    updateValuesTexts(pilar);
  });
}

/**------------------------------------------------------------------------
 *                           UPDATE VALUES TEXTS
 *------------------------------------------------------------------------**/

function updateValuesTexts(pilarName) {
  // PILAR SUBTOTAL
  updatePilarTotalText(pilarName);
  // PILAR -> SOLUCAO SUBTOTAL
  updateTipoTotalText(pilarName, "solucoes");
  // PILAR -> FERRAMENTA SUBTOTAL
  updateTipoTotalText(pilarName, "ferramentas");
}

function updatePilarTotalText(pilarName) {
  const value = CRIAR.getPilarSum(pilarName);
  $("[nc_pilar='" + pilarName + "'] [price_el='pilar_subtotal']").text(
    numberToReal(value)
  );
}
function updateTipoTotalText(pilarName, tipo) {
  const value = CRIAR.getTipoSum(pilarName, tipo);
  $("[nc_pilar='" + pilarName + "'] [price_el='" + tipo + "_subtotal']").text(
    numberToReal(value)
  );
}

/**------------------------------------------------------------------------
 *                           INIT
 *------------------------------------------------------------------------**/

const pilaresNames = ["contexto", "recursos", "ideias", "acoes", "resultados"];
pilaresNames.forEach((name) => {
  solucoesDragAndDrop(name);
});
