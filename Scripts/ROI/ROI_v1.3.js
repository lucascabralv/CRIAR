class ROI {
  investimento_estrategico = 0;

  investimento_mkt = 0;
  venda_recorrente_ltv = 0;
  projecao_aquisicao_clientes = 0;
  ticket_medio_vendas = 0;

  faturamento_total_vendas = 0;
  investimento_total_mkt = 0;
  receita_liquida_total = 0;
  CPA = 0;
  ROI = 0;

  constructor() {
    this.initEvents();
  }

  initEvents() {
    Webflow.push(function () {
      // Disable submitting form fields
      $(".form-roi").submit(function () {
        return false;
      });
    });

    $("#calculate_ROI").on("click", () => {
      this.calculate();
    });
  }

  calculate() {
    this.investimento_estrategico = F_ESTRATEGICO.preco_geral_total || 0;
    this.getUserValues();
    this.calculateAllValues();
    this.setAllTexts();
  }

  getUserValues() {
    this.investimento_mkt = parseFloat($("[roi_el='investimento_mkt']").val());
    this.venda_recorrente_ltv = parseFloat(
      $("[roi_el='venda_recorrente_ltv']").val()
    );
    this.projecao_aquisicao_clientes = parseFloat(
      $("[roi_el='projecao_aquisicao_clientes']").val()
    );
    this.ticket_medio_vendas = parseFloat(
      $("[roi_el='ticket_medio_vendas']").val()
    );
  }

  calculateAllValues() {
    this.faturamento_total_vendas = normalizeValue(
      this.venda_recorrente_ltv *
        this.projecao_aquisicao_clientes *
        this.ticket_medio_vendas,
      2 // 2 casas decimais
    );
    this.investimento_total_mkt = normalizeValue(
      this.investimento_estrategico * this.investimento_mkt,
      2
    );
    this.receita_liquida_total = normalizeValue(
      this.faturamento_total_vendas - this.investimento_total_mkt,
      2
    );
    this.CPA = normalizeValue(
      this.investimento_total_mkt / this.projecao_aquisicao_clientes,
      2
    );
    this.ROI = normalizeValue(
      this.receita_liquida_total / this.investimento_total_mkt,
      4
    );
  }

  setAllTexts() {
    $("[roi_el='faturamento_total_vendas']").text(
      numberToReal(this.faturamento_total_vendas)
    );
    $("[roi_el='investimento_total_mkt']").text(
      numberToReal(this.investimento_total_mkt)
    );
    $("[roi_el='receita_liquida_total']").text(
      numberToReal(this.receita_liquida_total)
    );
    $("[roi_el='CPA']").text(numberToReal(this.CPA));
    $("[roi_el='ROI']").text(normalizeValue(this.ROI * 100, 2) + "%");
  }
}
