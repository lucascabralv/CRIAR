class CRIAR_OBJ {
  #items = {
    contexto: {
      solucoes: [
        {
          slug: "cse0",
          name: "Treinamento",
          categoria: "Estratégia",
          value: 100,
        },
        {
          slug: "cse1",
          name: "Plano de Marketing",
          categoria: "Estratégia",
          value: 200,
        },
        {
          slug: "cse2",
          name: "Análise de Marketing",
          categoria: "Estratégia",
          value: 350,
        },
        {
          slug: "csp0",
          name: "Monitor de Personas",
          categoria: "Persona",
          value: 1000,
        },
        {
          slug: "csp1",
          name: "LeadScore",
          categoria: "Persona",
          value: 3000,
        },
        {
          slug: "csp2",
          name: "Personas com I.A.",
          categoria: "Persona",
          value: 125,
        },
        {
          slug: "csc0",
          name: "Compra de mídia legalizada",
          categoria: "Concorrência",
          value: 525,
        },
        {
          slug: "csc1",
          name: "Comparativos Concorrentes",
          categoria: "Concorrência",
          value: 870,
        },
        {
          slug: "csc2",
          name: "Performances Concorrentes",
          categoria: "Concorrência",
          value: 3275,
        },
      ],
      ferramentas: [],
    },
  };

  #selections = {
    contexto: {
      solucoes: [],
      ferramentas: [],
    },
    recursos: {
      solucoes: [],
      ferramentas: [],
    },
    ideias: {
      solucoes: [],
      ferramentas: [],
    },
    acoes: {
      solucoes: [],
      ferramentas: [],
    },
    resultados: {
      solucoes: [],
      ferramentas: [],
    },
  };

  getItemBySlug(pilar, tipo, slug) {
    return this.#items[pilar][tipo].find((item) => item.slug === slug);
  }
  getItemByName(pilar, tipo, name) {
    return this.#items[pilar][tipo].find((item) => item.name === name);
  }
  renderPilarSolucoesHTML(pilar) {
    const listWrapper = $("[nc_pilar='" + pilar + "'] .solucoes-list");
    this.#items[pilar].solucoes.forEach((item) => {
      let itemCard = `
		<div slug_criar="${item.slug}" nc_pilar="${pilar}" class="card-solucao">
			<div class="card-solucao-price-wrapper">
				<div class="card-solucao-price">${numberToReal(item.value)}</div>
			</div>
			<div class="w-layout-vflex card-solucao-inner-wrapper">
				<div class="card-solucao-name">${item.name}</div>
				<div class="card-solucao-categoria">${item.categoria}</div>
			</div>
			<div class="card-solucao-pilar-icon"></div>
		</div>`;
      listWrapper.append(itemCard);
    });
  }

  addSelectionBySlug(pilar, tipo, slug, uid) {
    const itemSelected = {
      slug: slug,
      uid: uid,
    };
    this.#selections[pilar][tipo].push(itemSelected);
  }
  removeSelectionByUID(pilar, tipo, uid) {
    this.#selections[pilar][tipo] = this.#selections[pilar][tipo].filter(
      (selection) => selection.uid !== uid
    );
  }

  getTipoSum(pilar, tipo) {
    let sum = 0;
    this.#selections[pilar][tipo].forEach((selection) => {
      const item = this.getItemBySlug(pilar, tipo, selection.slug);
      sum += item.value;
    });
    return sum;
  }
  getPilarSum(pilar) {
    return (
      this.getTipoSum(pilar, "solucoes") + this.getTipoSum(pilar, "ferramentas")
    );
  }
  getTotalSum() {
    return (
      this.getPilarSum("contexto") +
      this.getPilarSum("recursos") +
      this.getPilarSum("ideias") +
      this.getPilarSum("acoes") +
      this.getPilarSum("resultados")
    );
  }

  getAllSelections() {
    return this.#selections;
  }
}

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
