/**--------------------------------------------
 *               RENDER SOLUCOES
 *---------------------------------------------**/
function renderSolucoesEstrategico() {
  const lista_de_solucoes = F_ESTRATEGICO.getListaSolucoes();

  lista_de_solucoes.forEach((solucao) => {
    const html_list = $("[nc_pilar='" + solucao.pilar + "'] .solucoes-list");
    const html_solucao = createHTMLSolucaoEstrategico(solucao);
    html_list.append(html_solucao);
  });
}

function createHTMLSolucaoEstrategico(solucao) {
  const { id, pilar, nome, descricao } = solucao;
  const uid_attribute = solucao.uid ? `uid="${solucao.uid}"` : "";
  return `
		<div nc_id="${id}" nc_pilar="${pilar}" ${uid_attribute} class="card-solucao">
    <div class="card-solucao-overlay">
      <div nc_criar_el="popup_servico_trigger" class="sevicos-options-trigger">
        <div class="card-solucao-overlay-text">Editar</div>
      </div>
      <div nc_criar_el="solucao_remove_trigger" class="sevicos-options-trigger">
        <div class="card-solucao-overlay-text">Remover</div>
      </div>
    </div>
    <div class="card-solucao-price-wrapper">
      <div class="card-solucao-price">R$0,00</div>
    </div>
    <div class="w-layout-vflex card-solucao-inner-wrapper">
      <div class="card-solucao-name">${nome}</div>
      <div class="card-solucao-categoria">${descricao}</div>
    </div>
    <div class="card-solucao-pilar-icon"></div>
  </div>
	`;
}

/**--------------------------------------------
 *               RENDER SERVICOS
 *---------------------------------------------**/

function renderServicosDaSolucao(solucao) {
  solucao.servicos.forEach((servico, index) => {
    const $servico_card = $(
      "#popup_servicos .servico-card[nc_servico_index='" + index + "']"
    );
    // Nome
    $servico_card.find(".servico-card-nome").text(servico.nome);
    // Descrição
    $servico_card.find(".servico-card-descricao").text(servico.descricao);
    // Preço
    $servico_card.find(".servico-card-preco").text(numberToReal(servico.preco));
    // UID
    $servico_card.attr("solucao_uid", solucao.uid);
    // PILAR
    $servico_card.attr("solucao_pilar", solucao.pilar);
    // STATUS
    if (parseInt(solucao.servicos_selecionados[index]) === 1) {
      $servico_card.addClass("selected").attr("nc_selected", "1");
    } else {
      $servico_card.removeClass("selected").attr("nc_selected", "0");
    }
  });
}


/**--------------------------------------------
 *               RENDER COMPLEMENTOS
 *---------------------------------------------**/
function renderComplementosEstrategico() {
  const lista_de_complementos = F_ESTRATEGICO.getListaComplementos();

  lista_de_complementos.forEach((complemento) => {
    const html_list = $("[nc_pilar='" + complemento.pilar + "'] .complementos-list");
    const html_complemento = createHTMLComplementoEstrategico(complemento);
    html_list.append(html_complemento);
  });
}

function createHTMLComplementoEstrategico(complemento) {
  const { id, pilar, nome, descricao, preco, imagem_link } = complemento;
  const uid_attribute = complemento.uid ? `uid="${complemento.uid}"` : "";

  let preco_final;
  if (preco == 0) {
    preco_final = "Incluso";
  } else {
    preco_final = numberToReal(preco);
  }
  return `
    <div nc_pilar="${pilar}" nc_id="${id}" nc_preco="${preco}" ${uid_attribute} class="card-complemento">
      <div class="card-complemento-logo-wrapper">
        <img src="${imagem_link}" loading="lazy" srcset="${imagem_link}" alt="${nome}" class="card-complemento-logo">
      </div>
      <div class="card-complemento-line"></div>
      <div class="w-layout-vflex card-complemento-inner-wrapper">
        <div class="card-complemento-descricao">${descricao}</div>
        <div class="card-complemento-preco">${preco_final}</div>
      </div>
    </div>`;
}