class CRIAR {
  #solucoes = [
    // CONTEXTO
    {
      pilar: "contexto",
      nome: "Estratégia",
      descricao: "Planejamento e ajustes de rotas",
      descontos: [0, 0.1, 0.3, 0.5],
      min: 1,
      servicos: [
        {
          nome: "Diagnóstico de Marketing",
          preco: 500,
          descricao: "Diagnóstico de Marketing metodologia C.R.I.A.R.",
        },
        {
          nome: "Plano de Marketing",
          preco: 500,
          descricao: "Plano de Marketing metodologia C.R.I.A.R.",
        },
        {
          nome: "Plano de Comunicação",
          preco: 500,
          descricao: "Plano de Comunicação metodologia C.R.I.A.R.",
        },
      ],
    },
    {
      pilar: "contexto",
      nome: "Persona",
      descricao: "Monitoramento e inteligência de dados",
      descontos: [0, 0.1, 0.3, 0.5],
      min: 0,
      servicos: [
        {
          nome: "Personas com I.A.",
          preco: 500,
          descricao: "Perfil de personas com I.A.",
        },
        {
          nome: "Monitor de Personas",
          preco: 500,
          descricao: "Monitor do fluxo da Jornada de personas em tempo real",
        },
        {
          nome: "LeadScore de Personas",
          preco: 500,
          descricao: "LeadScore automatizado de personas",
        },
      ],
    },
    {
      pilar: "contexto",
      nome: "Concorrência",
      descricao: "Monitoramento e inteligência de dados",
      descontos: [0, 0.1, 0.3, 0.5],
      min: 0,
      servicos: [
        {
          nome: "Performances Concorrentes",
          preco: 500,
          descricao: "Monitoramento automatizado de performances concorrentes",
        },
        {
          nome: "Comparativos Concorrentes",
          preco: 500,
          descricao: "Comparativos automatizados entre concorrentes do mercado",
        },
        {
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
      descontos: [0, 0.1, 0.3, 0.5],
      min: 0,
      servicos: [
        {
          nome: "CRM Marketing",
          preco: 1000,
          descricao:
            "CRM Marketing (listas segmentadas, e-mails, forms e automações)",
        },
        {
          nome: "CRM Vendas",
          preco: 1000,
          descricao: "CRM Vendas (pipelines, tarefas e automações de vendas)",
        },
        {
          nome: "CRM Atendimento",
          preco: 1000,
          descricao:
            "CRM Atendimento (inbox, tickets e automações de atendimento) ",
        },
      ],
    },
    {
      pilar: "recursos",
      nome: "WEB",
      descricao: "Configurações e suporte às rotinas",
      descontos: [0, 0.1, 0.3, 0.5],
      min: 0,
      servicos: [
        {
          nome: "Website",
          preco: 1000,
          descricao: "Website / Apps No-Code",
        },
        {
          nome: "Widgets",
          preco: 1000,
          descricao:
            "Widgets (configurações de galerias, reviews, tradutores, etc.)",
        },
        {
          nome: "Landing Pages",
          preco: 1000,
          descricao: "Landing Pages (configuração de páginas de conversão)",
        },
      ],
    },
    {
      pilar: "recursos",
      nome: "API/IA",
      descricao: "Configurações e integrações",
      descontos: [0, 0.1, 0.3, 0.5],
      min: 0,
      servicos: [
        {
          nome: "Integrações",
          preco: 1000,
          descricao: "Integrações de API's",
        },
        {
          nome: "Automações",
          preco: 1000,
          descricao: "Automações de processos e fluxos de trabalho",
        },
        {
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
      descricao: "Conceitos e redação publicitária",
      descontos: [0, 0.1, 0.3, 0.5],
      min: 0,
      servicos: [
        {
          nome: "Geração de ideias e estratégias",
          preco: 1250,
          descricao:
            "Geração de ideias e estratégias de marketing para a marca",
        },
        {
          nome: "Criação conceitual de campanhas publicitárias",
          preco: 1250,
          descricao: "Criação conceitual de campanhas publicitárias",
        },
        {
          nome: "Criação conceitual de projetos e ações de comunicação",
          preco: 1250,
          descricao: "Criação conceitual de projetos e ações de comunicação",
        },
      ],
    },
    {
      pilar: "ideias",
      nome: "Design",
      descricao: "Layouts e Artes finais",
      descontos: [0, 0.1, 0.3, 0.5],
      min: 0,
      servicos: [
        {
          nome: "Design de Interfaces",
          preco: 2500,
          descricao: "Design de interfaces digitais e experiência do usuário",
        },
        {
          nome: "Design Gráfico",
          preco: 2500,
          descricao: "Design gráfico de peças e criativos",
        },
        {
          nome: "Edição de vídeos curtos",
          preco: 2500,
          descricao: "Edição de vídeos curtos para Reels/Shorts",
        },
      ],
    },
    {
      pilar: "ideias",
      nome: "Conteúdo",
      descricao: "Planejamento editorial",
      descontos: [0, 0.1, 0.3, 0.5],
      min: 0,
      servicos: [
        {
          nome: "Calendário Editorial",
          preco: 500,
          descricao: "Calendário editorial com agendamento de postagens",
        },
        {
          nome: "Conteúdos Interativos",
          preco: 500,
          descricao: "Conteúdos interativos para conversão (configuração)",
        },
        {
          nome: "Conteúdos Ricos",
          preco: 500,
          descricao: "Conteúdos ricos para conversão (edição)",
        },
      ],
    },
    // ACOES
    {
      pilar: "acoes",
      nome: "Mídia",
      descricao: "Planejamento e configurações",
      descontos: [0, 0.1, 0.3, 0.5],
      min: 0,
      servicos: [
        {
          nome: "Mídias OFF",
          preco: 1000,
          descricao: "Mídias OFF (Eletrônica, OOH, Exterior, Impressa, etc.)",
        },
        {
          nome: "Mídias ON",
          preco: 1000,
          descricao:
            "Mídias ON (programática, display, sociais, adwords, etc.)",
        },
        {
          nome: "Mídias Alternativas",
          preco: 1000,
          descricao:
            "Mídias Alternativas (Merchandising, patrocínios, collabs, influencers, etc.)",
        },
      ],
    },
    {
      pilar: "acoes",
      nome: "Promo / Vendas",
      descricao: "Planejamento e configurações",
      descontos: [0, 0.1, 0.3, 0.5],
      min: 0,
      servicos: [
        {
          nome: "Programa de Afiliados",
          preco: 1000,
          descricao: "Programa de afiliados automatizado (configuração)",
        },
        {
          nome: "Ações Promocionais",
          preco: 1000,
          descricao: "Ações promocionais virais e experiências (configuração)",
        },
        {
          nome: "Print On Demand",
          preco: 1000,
          descricao: "Print On Demand da grife da marca (d-commerce)",
        },
      ],
    },
    {
      pilar: "acoes",
      nome: "Relacionamento",
      descricao: "Planejamento e configurações",
      descontos: [0, 0.1, 0.3, 0.5],
      min: 0,
      servicos: [
        {
          nome: "Comunidades de Membros",
          preco: 1000,
          descricao:
            "Comunidades de membros, áreas de clientes ou redes internas de colaboradores",
        },
        {
          nome: "Chatbots e Agentes",
          preco: 1000,
          descricao:
            "Chatbots e agentes de atendimento (Inteligência Artificial)",
        },
        {
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
      descontos: [0, 0.1, 0.3, 0.5],
      min: 0,
      servicos: [
        {
          nome: "Gestão de Eventos",
          preco: 500,
          descricao: "Gestão de eventos na Camada de Dados (DataLayer)",
        },
        {
          nome: "Tratamento de Dados",
          preco: 500,
          descricao: "Tratamento de dados de eventos e integrações",
        },
        {
          nome: "SEO",
          preco: 500,
          descricao: "SEO - Otimização de mecanismos de busca baseada em dados",
        },
      ],
    },
    {
      pilar: "resultados",
      nome: "Relatórios",
      descricao: "Configurações e análises",
      descontos: [0, 0.1, 0.3, 0.5],
      min: 0,
      servicos: [
        {
          nome: "Funil de Atribuições",
          preco: 500,
          descricao: "Funil de tráfego e atribuições de eventos a conversão",
        },
        {
          nome: "Dashboard Integrado",
          preco: 500,
          descricao: "Dashboard centralizado e integrado",
        },
        {
          nome: "Relatórios com agendamento",
          preco: 500,
          descricao: "Relatórios compartilháveis com agendamento",
        },
      ],
    },
    {
      pilar: "resultados",
      nome: "Pesquisas",
      descricao: "Configurações e análises",
      descontos: [0, 0.1, 0.3, 0.5],
      min: 0,
      servicos: [
        {
          nome: "Pesquisas NPS",
          preco: 500,
          descricao: "Pesquisas NPS on-line",
        },
        {
          nome: "Pesquisas de Satisfação",
          preco: 500,
          descricao: "Pesquisas de satisfação on-line",
        },
        {
          nome: "Pesquisas de Mercado",
          preco: 500,
          descricao: "Pesquisas de mercado on-line por painel de respondentes",
        },
      ],
    },
  ];

  #itens_selecionados = {
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

  // SOLUCAO FUNCTIONS
  getSolucaoByNome(nome) {
    return this.#solucoes.find((solucao) => solucao.nome === nome);
  }






  addSelection(nome, pilar, tipo) {
    const uid = createUID();
    const item_selecionado = {
      nome: nome,
      uid: uid,
    };
    this.#itens_selecionados[pilar][tipo].push(item_selecionado);
    return uid;
  }
  removeSelection(pilar, tipo, uid) {
    this.#itens_selecionados[pilar][tipo] = this.#itens_selecionados[pilar][
      tipo
    ].filter((selection) => selection.uid !== uid);
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