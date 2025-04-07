class COMPLEMENTOS {
  #complementos = [
    // ======= CONTEXTO =======
    //
    {
      pilar: "contexto",
      categoria: "Estratégia",
      id: "C-0",
      nome: "C.R.I.A.R.",
      descricao: "Framework Analítico e Estratégico",
      preco: 0,
      imagem_link:
        "https://cdn.prod.website-files.com/66b537446841de6d4112344b/6712ba969a919629c9273539_CRIAR.png",
    },
    {
      pilar: "contexto",
      categoria: "Estratégia",
      id: "C-1",
      nome: "FounderPal",
      descricao: "Planejamento de Marketing IA",
      preco: 0,
      imagem_link:
        "https://cdn.prod.website-files.com/66b537446841de6d4112344b/6712ba968dfe44c6f4847e83_Founderpal.png",
    },
    {
      pilar: "contexto",
      categoria: "Estratégia",
      id: "C-2",
      nome: "ClickUp",
      descricao: "Gerenciamento de projetos",
      preco: 0,
      imagem_link:
        "https://cdn.prod.website-files.com/66b537446841de6d4112344b/6712ba96e843ab5a6835950c_ClickUp-Logo.png",
    },
    {
      pilar: "contexto",
      categoria: "Personas",
      id: "C-3",
      nome: "delve.ia",
      descricao: "Mapeamento baseado em dados",
      preco: 750,
      imagem_link:
        "https://cdn.prod.website-files.com/66b537446841de6d4112344b/6712ba96ad828ce76229f4e8_delve.ai-logo.png",
    },
    {
      pilar: "contexto",
      categoria: "Personas",
      id: "C-4",
      nome: "PersanaAI",
      descricao: "Prospecção e Enriquecimento de leads",
      preco: 500,
      imagem_link:
        "https://cdn.prod.website-files.com/66b537446841de6d4112344b/6712ba96f045700b989b2aef_PersanaAI.png",
    },
    {
      pilar: "contexto",
      categoria: "",
      id: "C-5",
      nome: "",
      descricao: "",
      preco: 0,
      imagem_link: "",
    },
    {
      pilar: "contexto",
      categoria: "",
      id: "C-6",
      nome: "",
      descricao: "",
      preco: 0,
      imagem_link: "",
    },
    {
      pilar: "contexto",
      categoria: "",
      id: "C-7",
      nome: "",
      descricao: "",
      preco: 0,
      imagem_link: "",
    },
    {
      pilar: "contexto",
      categoria: "",
      id: "C-8",
      nome: "",
      descricao: "",
      preco: 0,
      imagem_link: "",
    },
    {
      pilar: "recursos",
      categoria: "",
      id: "RC-",
      nome: "",
      descricao: "",
      preco: 0,
      imagem_link: "",
    },
  ];

  getComplementoById(id) {
    return this.#complementos.find((complemento) => complemento.id === id);
  }

  complementoHTML(complemento) {
    const { id, nome, pilar, descricao, preco, imagem_link } = complemento;

    let preco_final;
    if (preco == 0) {
      preco_final = "Incluso";
    } else {
      preco_final = numberToReal(preco);
    }

    return `
    <div nc_pilar="${pilar}" nc_id="${id}" nc_preco="${preco}" class="card-complemento">
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

  renderAllComplementosHTML() {
    this.#complementos.forEach((complemento) => {
      const html_list = $(
        "[nc_pilar='" + complemento.pilar + "'] .complementos-list"
      );
      const html_complemento = this.complementoHTML(complemento);
      html_list.append(html_complemento);
    });
  }
}

const LISTA_COMPLEMENTOS = new COMPLEMENTOS();
