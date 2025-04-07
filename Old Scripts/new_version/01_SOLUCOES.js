class SOLUCOES {
  #solucoes = [
    // CONTEXTO
    {
      pilar: "contexto",
      nome: "Estratégia",
      descricao: "Planejamento | On Going",
      descontos: [0, 0.1, 0.25, 0.4],
      id: "C-0",
      servicos: [
        {
          id: "C-0-0",
          nome: "Diagnóstico e Prognóstico de Marketing",
          preco: 500,
          descricao:
            "Diagnóstico e Prognóstico de Marketing metodologia C.R.I.A.R.",
        },
        {
          id: "C-0-1",
          nome: "Planejamento de Marketing",
          preco: 500,
          descricao: "Planejamento de Marketing com proposições de IA",
        },
        {
          id: "C-0-2",
          nome: "Plano de Comunicação",
          preco: 500,
          descricao: "Plano de Comunicação em plataforma de gestão de projetos",
        },
      ],
    },
    {
      pilar: "contexto",
      nome: "Persona",
      descricao: "Monitoramento e inteligência de dados",
      descontos: [0, 0.1, 0.25, 0.4],
      id: "C-1",
      servicos: [
        {
          id: "C-1-0",
          nome: "Perfis de personas com I.A.",
          preco: 500,
          descricao: "Perfis de personas com I.A. por dados do GA4 e Meta",
        },
        {
          id: "C-1-1",
          nome: "Prospecção de personas com I.A.",
          preco: 500,
          descricao: "Prospecção de personas com I.A. por dados do Linkedin",
        },
        {
          id: "C-1-2",
          nome: "Enriquecimento de Personas com I.A.",
          preco: 500,
          descricao:
            "Enriquecimento de Personas com I.A. por API's de bases de dados e LLMs",
        },
      ],
    },
    {
      pilar: "contexto",
      nome: "Concorrência",
      descricao: "Monitoramento e inteligência de dados",
      descontos: [0, 0.1, 0.25, 0.4],
      id: "C-2",
      servicos: [
        {
          id: "C-2-0",
          nome: "Performances Concorrentes",
          preco: 500,
          descricao: "Rastreamento de performances concorrentes",
        },
        {
          id: "C-2-1",
          nome: "Comparativos Concorrentes",
          preco: 500,
          descricao: "Comparativo automatizados entre concorrentes do mercado",
        },
        {
          id: "C-2-2",
          nome: "Compra de Mídia Legalizada",
          preco: 500,
          descricao:
            "Monitoramento de compra de mídia legalizada pela concorrência",
        },
      ],
    },
    // RECURSOS
    {
      pilar: "recursos",
      nome: "CRM",
      descricao: "Configurações e suporte às rotinas",
      descontos: [0, 0.1, 0.25, 0.4],
      id: "RC-0",
      servicos: [
        {
          id: "RC-0-0",
          nome: "CRM Marketing",
          preco: 1000,
          descricao: "Listas segmentadas, e-mails, forms e automações",
        },
        {
          id: "RC-0-1",
          nome: "CRM Vendas",
          preco: 1000,
          descricao: "Pipelines, tarefas e automações de vendas",
        },
        {
          id: "RC-0-2",
          nome: "CRM Atendimento",
          preco: 1000,
          descricao: "Inbox, tickets e automações de atendimento",
        },
      ],
    },
    {
      pilar: "recursos",
      nome: "WEB",
      descricao: "Configurações e suporte às rotinas",
      descontos: [0, 0.1, 0.25, 0.4],
      id: "RC-1",
      servicos: [
        {
          id: "RC-1-0",
          nome: "Website",
          preco: 1000,
          descricao: "Website CMS - collections e páginas templates",
        },
        {
          id: "RC-1-1",
          nome: "Aplicações no-code",
          preco: 1000,
          descricao: "Aplicações JavaScript convertidas em atributos no-code",
        },
        {
          id: "RC-1-2",
          nome: "Widgets",
          preco: 1000,
          descricao: "Configurações de galerias, reviews, tradutores, etc.",
        },
      ],
    },
    {
      pilar: "recursos",
      nome: "API/IA",
      descricao: "Configurações e integrações",
      descontos: [0, 0.1, 0.25, 0.4],
      id: "RC-2",
      servicos: [
        {
          id: "RC-2-0",
          nome: "Integrações",
          preco: 1000,
          descricao: "Integrações de API's, Webhooks e HTTP requests",
        },
        {
          id: "RC-2-1",
          nome: "Automações",
          preco: 1000,
          descricao: "Automações de processos e fluxos de trabalho",
        },
        {
          id: "RC-2-2",
          nome: "Inteligência Artificial",
          preco: 1000,
          descricao:
            "Inteligência Artificial aplicada aos processos e fluxos de marketing",
        },
      ],
    },
    //IDEIAS
    {
      pilar: "ideias",
      nome: "Criação",
      descricao: "Criações conceituais",
      descontos: [0, 0.1, 0.25, 0.4],
      id: "I-0",
      servicos: [
        {
          id: "I-0-0",
          nome: "Criação Conceitual",
          preco: 1000,
          descricao: "Criação conceitual de campanhas e peças publicitárias",
        },
        {
          id: "I-0-1",
          nome: "Proposição",
          preco: 1000,
          descricao: "Proposição de interações e experiências criativas",
        },
        {
          id: "I-0-2",
          nome: "Ideação e Inovação",
          preco: 1000,
          descricao:
            "Ideação colaborativa e inovação aberta com Inteligência artificial",
        },
      ],
    },
    {
      pilar: "ideias",
      nome: "Design",
      descricao: "Layouts e Artes finais",
      descontos: [0, 0.1, 0.25, 0.4],
      id: "I-1",
      servicos: [
        {
          id: "I-1-0",
          nome: "Design Gráfico",
          preco: 2500,
          descricao: "Design gráfico de peças e criativos estáticos",
        },
        {
          id: "I-1-1",
          nome: "Design de Interfaces",
          preco: 2500,
          descricao: "Design de interfaces digitais dinâmicas e interativas",
        },
        {
          id: "I-1-2",
          nome: "Edição de vídeos curtos",
          preco: 2500,
          descricao: "Edição de vídeos curtos (mini clipes) para Reels/Shorts",
        },
      ],
    },
    {
      pilar: "ideias",
      nome: "Conteúdo",
      descricao: "Planejamento editorial",
      descontos: [0, 0.1, 0.25, 0.4],
      id: "I-2",
      servicos: [
        {
          id: "I-2-0",
          nome: "Calendário Editorial",
          preco: 1000,
          descricao: "Calendário editorial com agendamento de postagens",
        },
        {
          id: "I-2-1",
          nome: "Conteúdos Interativos",
          preco: 1000,
          descricao: "Conteúdos interativos para conversão (configuração)",
        },
        {
          id: "I-2-2",
          nome: "Conteúdos Ricos",
          preco: 1000,
          descricao: "Redação de conteúdos ricos terceirizados (edição)",
        },
      ],
    },
    // ACOES
    {
      pilar: "acoes",
      nome: "Mídia",
      descricao: "Planejamento e configurações",
      descontos: [0, 0.1, 0.25, 0.4],
      id: "A-0",
      servicos: [
        {
          id: "A-0-0",
          nome: "Mídias OFF",
          preco: 1000,
          descricao: "Eletrônica, OOH, Exterior, Impressa, etc.",
        },
        {
          id: "A-0-1",
          nome: "Mídias ON",
          preco: 1000,
          descricao: "Programática, display, sociais, adwords, etc.",
        },
        {
          id: "A-0-2",
          nome: "Marketing de Influência",
          preco: 1000,
          descricao: "Seleção, gestão e mensuração de campanhas",
        },
      ],
    },
    {
      pilar: "acoes",
      nome: "Promo / Vendas",
      descricao: "Planejamento e configurações",
      descontos: [0, 0.1, 0.25, 0.4],
      id: "A-1",
      servicos: [
        {
          id: "A-1-0",
          nome: "Programa de Afiliados",
          preco: 500,
          descricao: "Programa de afiliados automatizado (configuração)",
        },
        {
          id: "A-1-1",
          nome: "Ações Promocionais",
          preco: 500,
          descricao: "Ações promocionais virais e experiências (configuração)",
        },
        {
          id: "A-1-2",
          nome: "Grife da marca",
          preco: 500,
          descricao: "Print on demand + 3rd commerce",
        },
      ],
    },
    {
      pilar: "acoes",
      nome: "Relacionamento",
      descricao: "Planejamento e configurações",
      descontos: [0, 0.1, 0.25, 0.4],
      id: "A-2",
      servicos: [
        {
          id: "A-2-0",
          nome: "Comunidades de Membros",
          preco: 1000,
          descricao:
            "Comunidades de membros, áreas de clientes ou redes internas de colaboradores",
        },
        {
          id: "A-2-1",
          nome: "Chatbots e Agentes",
          preco: 1000,
          descricao:
            "Chatbots e agentes de atendimento (Inteligência Artificial)",
        },
        {
          id: "A-2-2",
          nome: "Agendamentos Automatizados",
          preco: 1000,
          descricao: "Agendamentos automatizados de reuniões e atendimentos",
        },
      ],
    },
    // RESULTADOS
    {
      pilar: "resultados",
      nome: "Dados",
      descricao: "Configurações e análises",
      descontos: [0, 0.1, 0.25, 0.4],
      id: "RS-0",
      servicos: [
        {
          id: "RS-1-0",
          nome: "Banco de Dados",
          preco: 500,
          descricao: "Banco de dados para integrações no-code",
        },
        {
          id: "RS-0-1",
          nome: "Gestão de eventos",
          preco: 500,
          descricao: "Gestão de eventos na Camada de Dados (DataLayer)",
        },
        {
          id: "RS-0-2",
          nome: "Rastreamento do lado do servidor",
          preco: 500,
          descricao:
            "Rastreamento do lado do servidor para atribuição no Google Tag Manager",
        },
      ],
    },
    {
      pilar: "resultados",
      nome: "Relatórios",
      descricao: "Configurações e análises",
      descontos: [0, 0.1, 0.25, 0.4],
      id: "RS-1",
      servicos: [
        {
          id: "RS-1-0",
          nome: "Dashboard Integrado",
          preco: 500,
          descricao: "Dashboard centralizado e integrado",
        },
        {
          id: "RS-1-1",
          nome: "Analytics IA",
          preco: 500,
          descricao: "Analytics IA com compartilhamento agendado",
        },
        {
          id: "RS-1-2",
          nome: "Funil com atribuições",
          preco: 500,
          descricao: "Funil com jornada e atribuições de eventos a conversões",
        },
      ],
    },
    {
      pilar: "resultados",
      nome: "Pesquisas",
      descricao: "Configurações e análises",
      descontos: [0, 0.1, 0.25, 0.4],
      id: "RS-2",
      servicos: [
        {
          id: "RS-2-0",
          nome: "Pesquisas de Mercado por painel de respondentes",
          preco: 500,
          descricao: "Pesquisas de mercado on-line por painel de respondentes",
        },
        {
          id: "RS-2-1",
          nome: "Pesquisas de Mercado por Inteligência Artificial",
          preco: 500,
          descricao: "Pesquisas de mercado on-line por Inteligência Artificial",
        },
        {
          id: "RS-2-2",
          nome: "Pesquisas de satisfação / NPS",
          preco: 500,
          descricao:
            "Pesquisas de satisfação / NPS on-line em formulários integrados",
        },
      ],
    },
  ];

  getSolucaoById(id) {
    return this.#solucoes.find((solucao) => solucao.id === id);
  }

  getSolucaoServicos(id){
    const solucao = this.getSolucaoById(id);
    return solucao.servicos;
  }

  getSolucaoServicoPreco(id, serviço_index) {
    const solucao = this.getSolucaoById(id);
    return solucao.servicos[serviço_index].preco;
  }

  solucaoHTML(solucao) {
    const { id, nome, pilar, descricao } = solucao;
    return `
  <div nc_id="${id}" nc_pilar="${pilar}" class="card-solucao">
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

  renderAllSolucoesHTML() {
    this.#solucoes.forEach((solucao) => {
      const html_list = $("[nc_pilar='" + solucao.pilar + "'] .solucoes-list");
      const html_solucao = this.solucaoHTML(solucao);
      html_list.append(html_solucao);
    });
  }

  renderServicos(solucao, uid) {
    solucao.servicos.forEach((servico, index) => {
      const $servico_card = $("#popup_servicos .servico-card").eq(index);
      // Nome
      $servico_card.find(".servico-card-nome").text(servico.nome);
      // Descrição
      $servico_card.find(".servico-card-descricao").text(servico.descricao);
      // Preço
      $servico_card
        .find(".servico-card-preco")
        .text(numberToReal(servico.preco));
      // UID
      $servico_card.attr("solucao_uid", uid);
      // PILAR
      $servico_card.attr("solucao_pilar", solucao.pilar);
    });
  }
}

const LISTA_SOLUCOES = new SOLUCOES();
