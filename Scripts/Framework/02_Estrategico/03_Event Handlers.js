/**--------------------------------------------
 *               EVENT HANDLERS
 *---------------------------------------------**/

function addSolucaoHandler(el) {
  if (!el.getAttribute("uid")) {
    const solucao_id = el.getAttribute("nc_id");
    const solucao_selecionada = F_ESTRATEGICO.selectSolucao(solucao_id);
    el.setAttribute("uid", solucao_selecionada.uid);

    openServicosPopUp(solucao_selecionada);
    F_ESTRATEGICO.calcAllSolucoesPrecos(solucao_selecionada);
  }
}

function removeSolucaoHandler(el) {
  const uid = el.getAttribute("uid");
  const solucao_removida = F_ESTRATEGICO.unselectSolucao(uid);
  el.remove();
  F_ESTRATEGICO.calcAllSolucoesPrecos(solucao_removida);
}

function addComplementoHandler(el) {
  if (!el.getAttribute("uid")) {
    const complemento_id = el.getAttribute("nc_id");
    const complemento_selecionado =
      F_ESTRATEGICO.selectComplemento(complemento_id);
      
    el.setAttribute("uid", complemento_selecionado.uid);

    F_ESTRATEGICO.calcAllComplementosPrecos(complemento_selecionado);
  }
}

function removeComplementoHandler(el) {
  const uid = el.getAttribute("uid");
  const complemento_removido = F_ESTRATEGICO.unselectComplemento(uid);
  el.remove();
  F_ESTRATEGICO.calcAllComplementosPrecos(complemento_removido);
}

/*------------------------------------
 *              DRAG
 *------------------------------------**/

function solucoesDragAndDrop(pilar_nome) {
  const $list_origem = $("[nc_pilar='" + pilar_nome + "'] .solucoes-list")[0];
  const $list_destino = $(
    "[nc_pilar='" + pilar_nome + "'] .selected-solucoes-list"
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
    addSolucaoHandler(el);
  });
  dragAPI.on("remove", function (el) {
    removeSolucaoHandler(el);
  });
}

function complementosDragAndDrop(pilar_nome) {
  const $list_origem = $("[nc_pilar='" + pilar_nome + "'] .complementos-list")[0];
  const $list_destino = $(
    "[nc_pilar='" + pilar_nome + "'] .selected-complementos-list"
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
    addComplementoHandler(el);
  });
  dragAPI.on("remove", function (el) {
    removeComplementoHandler(el);
  });
}

/*------------------------------------
 *           CLICK EDITAR
 *------------------------------------**/
$(document).on("click", "[nc_criar_el='popup_servico_trigger']", function () {
  $solucao_card = $(this).parents(".card-solucao");
  const uid = $solucao_card.attr("uid");
  const solucao = F_ESTRATEGICO.findSolucaoSelecionadaByUID(uid);
  openServicosPopUp(solucao);
});
/*------------------------------------
 *           CLICK REMOVER
 *------------------------------------**/
$(document).on("click", "[nc_criar_el='solucao_remove_trigger']", function () {
  $solucao_card = $(this).parents(".card-solucao");
  removeSolucaoHandler($solucao_card.get(0));
});

/**--------------------------------------------
 *               SERVICOS HANDLERS
 *---------------------------------------------**/
/*------------------------------------
 *           OPEN POPUP
 *------------------------------------**/
function openServicosPopUp(solucao) {
  renderServicosDaSolucao(solucao);
  // OPEN POP-UP
  $("[nc_criar_el='overlay']").removeClass("hidden");
}
/*------------------------------------
 *           CLOSE CLICK
 *------------------------------------**/
$("[nc_criar_el='popup_servico_close']").on("click", function () {
  $("[nc_criar_el='overlay']").addClass("hidden");
});

/*------------------------------------
 *       CLICK SERVICO CARD
 *------------------------------------**/
function toggleStatus($servico_card) {
  const old_status = $servico_card.attr("nc_selected");
  const new_status = old_status == "0" ? "1" : "0";
  $servico_card.toggleClass("selected").attr("nc_selected", new_status);
  return new_status;
}

$(".servico-card").on("click", function () {
  const $servico_card = $(this);
  let status = toggleStatus($servico_card);
  const servico_index = $servico_card.attr("nc_servico_index");
  const uid = $servico_card.attr("solucao_uid");
  const solucao_selecionada = F_ESTRATEGICO.findSolucaoSelecionadaByUID(uid);
  // EDITA SOLUCAO
  F_ESTRATEGICO.changeServicoStatus(
    uid,
    servico_index,
    status
  );
  F_ESTRATEGICO.calcAllSolucoesPrecos(solucao_selecionada);
});
