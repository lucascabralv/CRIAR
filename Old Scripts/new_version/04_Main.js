/**------------------------------------------------------------------------
 *                           TAB SELECTION
 *------------------------------------------------------------------------**/
$("[nc_criar_el='tab_pilar']").on("click", function () {
  const pilar_nome = $(this).attr("nc_pilar");
  $("[nc_criar_el='tab_pilar_content'][nc_pilar='" + pilar_nome + "']").click();
});

$(".card-pilar-expand").on("click", function () {
  const pilar_nome = $(this).parents("[nc_pilar]").attr("nc_pilar");
  $("[nc_criar_el='tab_pilar'][nc_pilar='" + pilar_nome + "']").click();
  $("[nc_criar_el='tab_pilar_content'][nc_pilar='" + pilar_nome + "']").click();
});

/**------------------------------------------------------------------------
 *                           SERVICOS TRIGGERS
 *------------------------------------------------------------------------**/

/*------------------------------------
 *           CARD CLICK
 *------------------------------------**/
$(".servico-card").on("click", function () {
  const $servico_card = $(this);
  if ($servico_card.attr("nc_selected") === "0") {
    $servico_card.addClass("selected").attr("nc_selected", "1");
  } else {
    $servico_card.removeClass("selected").attr("nc_selected", "0");
  }

  const uid = $servico_card.attr("solucao_uid");
  const pilar_nome = $servico_card.attr("solucao_pilar");
  const servicos_selecionados = getServicosStatus();
  // EDITA SOLUCAO
  CRIAR.editarServicosDaSolucaoSelecionada(uid, servicos_selecionados);
  
  // ATUALIZA PREÇOS
  // - Preço Card Solucao e PopUp Servico
  const preco_com_desconto = CRIAR.getSolucaoPreco(uid);
  const valor_do_desconto = CRIAR.getSolucaoDescontoAtual(uid);
  const preco_sem_desconto = Math.round(preco_com_desconto / (1 - valor_do_desconto));

  $("[nc_criar_el='valor_sem_desconto']").text(numberToReal(preco_sem_desconto));
  $("[nc_criar_el='desconto_text']").text(valor_do_desconto * 100 + "%");

  $("[nc_criar_el='valor_com_desconto']").text(numberToReal(preco_com_desconto));
  $(".card-solucao[uid='" + uid + "'] .card-solucao-price").text(
    numberToReal(preco_com_desconto)
  );
  // - Todos os Preços
  updateInfos(pilar_nome, "solucao");

});

/*------------------------------------
 *           CLOSE CLICK
 *------------------------------------**/
$("[nc_criar_el='popup_servico_close']").on("click", function () {
  $("[nc_criar_el='overlay']").addClass("hidden");
});
/**------------------------------------------------------------------------
 *                           SERVICOS FUNCTIONS
 *------------------------------------------------------------------------**/
function getServicosStatus() {
  let servicos_selecionados = [];
  $("#popup_servicos .servico-card").each(function () {
    let status = parseInt($(this).attr("nc_selected"));
    servicos_selecionados.push(status);
  });
  return servicos_selecionados;
}

function openServicosPopUp(id, uid) {
  // RENDERIZA SERVICOS E SEUS STATUS
  const solucao = LISTA_SOLUCOES.getSolucaoById(id);
  const servicos_selecionados = CRIAR.getSolucaoServicosSelecionados(uid);
  CRIAR.renderServicos(solucao, uid, servicos_selecionados);

  // OPEN POP-UP
  $("[nc_criar_el='overlay']").removeClass("hidden");
}

/**------------------------------------------------------------------------
 **                          SOLUCAO TRIGGERS
 *------------------------------------------------------------------------**/
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
    if (!el.getAttribute("uid")) {
      const pilar_nome = el.getAttribute("nc_pilar"),
      solucao_id = el.getAttribute("nc_id");
      
      const solucao = {
        id: solucao_id,
        pilar: pilar_nome,
      };
      const uid = CRIAR.adicionarSolucao(solucao);
      el.setAttribute("uid", uid);

      openServicosPopUp(solucao_id, uid);

      updateInfos(pilar_nome, "solucao");
    }
  });
  dragAPI.on("remove", function (el) {
    const pilar_nome = el.getAttribute("nc_pilar"),
          uid = el.getAttribute("uid");
    CRIAR.removerSolucao(uid);

    updateInfos(pilar_nome, "solucao");
  });
}
/*------------------------------------
 *           CLICK EDITAR
 *------------------------------------**/
$(document).on("click", "[nc_criar_el='popup_servico_trigger']", function () {
  $solucao_card = $(this).parents(".card-solucao");
  const id = $solucao_card.attr("nc_id"),
        uid = $solucao_card.attr("uid");
  openServicosPopUp(id, uid);
});
/*------------------------------------
 *           CLICK REMOVER
 *------------------------------------**/
$(document).on("click", "[nc_criar_el='solucao_remove_trigger']", function () {
  $solucao_card = $(this).parents(".card-solucao");
  const uid = $solucao_card.attr("uid"),
        pilar_nome = $solucao_card.attr("nc_pilar");
  // Remover da lista de solucoes selecionadas
  CRIAR.removerSolucao(uid);
  // Remover Card da Solucao
  $solucao_card.remove();
  // Atualiza preços
  updateInfos(pilar_nome, "solucao");
});

/**------------------------------------------------------------------------
 **                          COMPLEMENTOS TRIGGERS
 *------------------------------------------------------------------------**/
/*------------------------------------
 *              DRAG
 *------------------------------------**/

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
    if (!el.getAttribute("uid")) {
      const pilar_nome = el.getAttribute("nc_pilar"),
      complemento_id = el.getAttribute("nc_id"),
      complemento_preco = el.getAttribute("nc_preco");

      const complemento = {
        id: complemento_id,
        pilar: pilar_nome,
        preco: complemento_preco
      };
      const uid = CRIAR.adicionarComplemento(complemento);
      el.setAttribute("uid", uid);

      updateInfos(pilar_nome, "complemento");
    }
  });
  dragAPI.on("remove", function (el) {
    const pilar_nome = el.getAttribute("nc_pilar"),
          uid = el.getAttribute("uid");
    CRIAR.removerComplemento(uid);

    updateInfos(pilar_nome, "complemento");
  });
}

/*------------------------------------
 *           CLICK REMOVER
 *------------------------------------**/
$(document).on("click", "[nc_criar_el='complemento_remove_trigger']", function () {
  $complemento_card = $(this).parents(".card-complemento");
  const uid = $complemento_card.attr("uid"),
    pilar_nome = $complemento_card.attr("nc_pilar");
  // Remover da lista de complementos seleciondaos
  CRIAR.removerComplemento(uid);
  // Remover Card do Complemento
  $complemento_card.remove();
  // Atualiza preços
  updateInfos(pilar_nome, "complemento");
});


/**------------------------------------------------------------------------
 *                       UPDATE INFOS
 *------------------------------------------------------------------------**/
  // Update after changes
  function updateInfos(pilar_nome, tipo){
    // UPDATE ALL
    updateAllPrecos(pilar_nome);

    // BY TIPO
    if(tipo === "solucao"){
      CRIAR.updateSolucaoResumo(pilar_nome);
    } else if(tipo === "complemento"){
      //
    }
  }

/**------------------------------------------------------------------------
 *                       UPDATE PRECOS TEXTS
 *------------------------------------------------------------------------**/
  function updateAllPrecos(pilar_nome) {
    // PRECO SOLUCAO PILAR
    const preco_solucao_pilar = CRIAR.getPilarSolucaoSum(pilar_nome);
    $("[nc_pilar='" + pilar_nome + "'] [price_el='solucoes_subtotal']").text(
      numberToReal(preco_solucao_pilar)
    );
    // PRECO COMPLEMENTO PILAR
    const preco_complemento_pilar = CRIAR.getPilarComplementoSum(pilar_nome);
    $(
      "[nc_pilar='" + pilar_nome + "'] [price_el='complementos_subtotal']"
    ).text(numberToReal(preco_complemento_pilar));

    // PRECO SUBTOTAL PILAR
    $("[nc_pilar='" + pilar_nome + "'] [price_el='pilar_subtotal']").text(
      numberToReal(preco_solucao_pilar + preco_complemento_pilar)
    );

    // PRECO TOTAL SOMA(PILARES SUBTOTAIS)
  }



/**------------------------------------------------------------------------
 *                              INIT
 *------------------------------------------------------------------------**/
const CRIAR = new CRIAR_OBJ();
CRIAR.renderElements();

const pilaresNames = ["contexto", "recursos", "ideias", "acoes", "resultados"];
pilaresNames.forEach((name) => {
  solucoesDragAndDrop(name);
  complementosDragAndDrop(name);
});

/**------------------------------------------------------------------------
 *                           AUX FUNCTIONS
 *------------------------------------------------------------------------**/

function createUID() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

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
