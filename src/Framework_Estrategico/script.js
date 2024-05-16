// Returns solução OBJECT
function findSolucao(slugToSearch) {
  return SOLUCOES.find((solucao) => solucao.slug === slugToSearch);
}

// HANDLE CLICK

// 'INFO' BUTTON
$(".button-info-fwe-card").click(function () {
  const slug = $(this).attr("solucao_slug");
  const solucao = findSolucao(slug);
  // OPEN POPUP
  openPopup();
  // FILL POPUP WITH SOLUCAO INFO
});

// 'SELECT' BUTTON
$(".button-select-fwe-card").click(function () {
  const $card = $(this);
  // IF IT IS NOT SELECTED YET
  if (!$card.hasClass("selected")) {
    // THEN - SELECT
    const slug = $card.attr("solucao_slug");
    const solucao = findSolucao(slug);
    // GET VALUES AND SET IN CRIAR
    // SET LOCAL STORAGE
  } else {
    // THEN - UNSELECT
    // REMOVE VALUES IN CRIAR
    // SET LOCAL STORAGE
  }

  $card.toggleClass("selected");
});

// POPUP OVERLAY
$(".popup-fwe-overlay").click(closePopup);

// POPUP CLOSE BUTTON

//POP UP OPEN
function openPopup() {
  $(".popup-fwe-wrapper").removeClass("closed");
}
//POP UP CLOSE
function closePopup() {
  $(".popup-fwe-wrapper").addClass("closed");
}
