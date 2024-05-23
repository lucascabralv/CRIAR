function findSolucao(slugToSearch) {
  return SOLUCOES.find((solucao) => solucao.slug === slugToSearch);
}

// Mostra as informações da solução no PopUp
function loadSolucao(solucao){
  const {nome, nome_curto, descricao, problema, solucao_padrao, efetividade_padrao, deslocamento_lateral, nova_hipotese, pilar, fator, flywheel, investimento, automacao, publicos_potenciais, potencial, efetividade}  = solucao;
  
  $("#text_nome").text(nome);
  $("#text_problema").text(problema);
  $("#text_solucao_padrao").text(solucao_padrao);
  $("#text_nova_hipotese").text(nova_hipotese);
  $("#text_solucao_CRIAR").text(nome);
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
  const $card = $(this);
  // IF IT IS NOT SELECTED YET
  if (!$card.hasClass("selected")) {
    const slug = $card.attr("solucao_slug");
    const solucao = findSolucao(slug);
    // GET VALUES AND SET IN CRIAR
    // SET LOCAL STORAGE
  } else {
    // REMOVE VALUES IN CRIAR
    // SET LOCAL STORAGE
  }

  $card.toggleClass("selected");
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
