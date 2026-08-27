

const PERIODO_ENQUETES = {
  inicio: '07/04/2026',
  fim: '27/04/2026',
  dias: 21,
  rodada: '2ª rodada de avaliação do quadriênio 2025–2028',
  conselheiros: 145,
  conselheirosData: '06/05/2026'
};

const RODADAS = {
  quadrienio: { inicio: 2025, fim: 2028 },
  realizadas: [
    { ord: 1, ano: 2025, inicio: '24/03/2025', fim: '13/04/2025' },
    { ord: 2, ano: 2026, inicio: PERIODO_ENQUETES.inicio, fim: PERIODO_ENQUETES.fim, atual: true },
  ]
};

const SUPERINTENDENCIAS = {
  SOG: { nome: 'Superintendência de Outorgas', sigla: 'SOG', servicos: 18, cor: '#0070C0' },
  SRG: { nome: 'Superintendência de Regulação', sigla: 'SRG', servicos: 8, cor: '#0090C0' },
  SAF: { nome: 'Superintendência de Administração e Finanças', sigla: 'SAF', servicos: 4, cor: '#103050' },
  SFC: { nome: 'Superintendência de Fiscalização e Coordenação das Unidades Regionais', sigla: 'SFC', servicos: 1, cor: '#F2A900' }
};

const CARTA_HISTORICO = [
  { ano: 2021, SOG: 18, SRG: 8, SAF: 2, SFC: 0 },
  { ano: 2023, SOG: 18, SRG: 8, SAF: 3, SFC: 1 },
  { ano: 2025, SOG: 18, SRG: 8, SAF: 4, SFC: 1 },
  { ano: 2026, SOG: 18, SRG: 8, SAF: 4, SFC: 1 }
];

const ENQUETES = [

  {
    id: 8270, sup: 'SOG', num: 15, pagina: 139,
    servico: 'Solicitar autorização e registro na ANTAQ para afretamento de embarcação estrangeira',
    pergunta: 'Qual é a sua opinião a respeito do serviço prestado pela Antaq no registro de afretamento de embarcação estrangeira?',
    publicacao: '07/04/2026', respondentes: 7, base: 147,
    q1: { sim: 2, nao: 5 }, q2: { sim: 2, nao: 5 },
    q3: [0, 1, 0, 0, 1], q4: [0, 0, 1, 0, 1],
    sugestoes: ['Acesso a poucas empresas']
  },
  {
    id: 8271, sup: 'SOG', num: 9, pagina: 109,
    servico: 'Registrar na ANTAQ afretamento de embarcação brasileira',
    pergunta: 'Qual é a sua opinião a respeito do serviço prestado pela Antaq no registro de afretamento de embarcação brasileira?',
    publicacao: '07/04/2026', respondentes: 6, base: 146,
    q1: { sim: 3, nao: 3 }, q2: { sim: 3, nao: 3 },
    q3: [0, 0, 0, 0, 3], q4: [0, 0, 0, 0, 3],
    sugestoes: ['Abrir a informação para que seja uma prática comum entre os usuários; fiz comentários com clientes nos quais não tinham informação que poderiam utilizar o órgão como suporte para seu atual problema com a linha de navegação; acredito que praticar e divulgar os canais seria algo muito válido para alertar sobre os deveres das cias em nosso país.']
  },
  {
    id: 8272, sup: 'SOG', num: 11, pagina: 116,
    servico: 'Registrar na ANTAQ comunicação sobre alteração de frota',
    pergunta: 'Qual é a sua opinião a respeito do serviço prestado pela Antaq no registro de comunicação sobre a alteração de frota?',
    publicacao: '07/04/2026', respondentes: 6, base: 145,
    q1: { sim: 0, nao: 6 }, q2: null,
    q3: null, q4: null,
    sugestoes: []
  },
  {
    id: 8273, sup: 'SOG', num: 10, pagina: 113,
    servico: 'Registrar na ANTAQ alteração de situação cadastral de empresa brasileira de navegação',
    pergunta: 'Qual é a sua opinião a respeito do serviço prestado pela Antaq no registro de alteração de situação cadastral de empresa brasileira de navegação?',
    publicacao: '07/04/2026', respondentes: 6, base: 145,
    q1: { sim: 1, nao: 5 }, q2: { sim: 1, nao: 0 },
    q3: [0, 0, 0, 0, 1], q4: [0, 0, 0, 0, 1],
    sugestoes: []
  },
  {
    id: 8274, sup: 'SOG', num: 7, pagina: 84,
    servico: 'Obter outorga de autorização da ANTAQ para construção e exploração de instalação portuária privada localizada fora da área do Porto Organizado',
    pergunta: 'Qual é a sua opinião a respeito do serviço prestado pela Antaq na obtenção de outorga de autorização para construção e exploração de instalação portuária privada localizada fora da área do Porto Organizado?',
    publicacao: '07/04/2026', respondentes: 5, base: 149,
    q1: { sim: 1, nao: 4 }, q2: { sim: 1, nao: 0 },
    q3: [0, 0, 0, 0, 1], q4: [0, 0, 0, 0, 1],
    sugestoes: [],
    nota: 'O texto de análise do documento-fonte registrava 83,3%/16,7% para a questão 1; os percentuais foram corrigidos para 80%/20%, conforme o gráfico da Plataforma e o total de 5 respondentes.'
  },
  {
    id: 8275, sup: 'SOG', num: 6, pagina: 78,
    servico: 'Obter da ANTAQ autorização, aditamento ou renúncia para transporte aquaviário na navegação marítima e de apoio, cabotagem e longo curso',
    pergunta: 'Qual é a sua opinião a respeito do serviço prestado pela Antaq na obtenção de autorização, aditamento ou renúncia para transporte aquaviário na navegação marítima e de apoio, cabotagem e longo curso?',
    publicacao: '07/04/2026', respondentes: 4, base: 148,
    q1: { sim: 0, nao: 4 }, q2: null,
    q3: null, q4: null,
    sugestoes: []
  },
  {
    id: 8276, sup: 'SOG', num: 4, pagina: 44,
    servico: 'Obter autorização da ANTAQ para transporte de cargas na navegação interior de percurso longitudinal interestadual e internacional',
    pergunta: 'Qual é a sua opinião a respeito do serviço prestado pela Antaq na obtenção de autorização para transporte de cargas na navegação interior de percurso longitudinal interestadual e internacional?',
    publicacao: '07/04/2026', respondentes: 8, base: 147,
    q1: { sim: 2, nao: 6 }, q2: { sim: 1, nao: 1 },
    q3: [0, 0, 0, 1, 1], q4: [0, 0, 0, 1, 1],
    sugestoes: [
      'Estávamos com uma situação da cia, porém estava fora de legislação brasileira, porém fora de jurisprudência ANTAQ — acredito que, por se tratar de importador/exportador brasileiro, a Antaq poderia ter um conselho para apoiar aqui o time brasileiro, visto que as cias marítimas acabam rolando datas e deixando os impo/expo com custos e multas na mão.',
      'Sem sugestão.'
    ],
    nota: 'O texto de análise do documento-fonte invertia as respostas da questão 1 (indicava 6 usos e 2 não usos); os valores foram ajustados ao gráfico da Plataforma — 2 utilizaram (25%) e 6 não utilizaram (75%) —, o que também é coerente com os 2 respondentes da questão 2.'
  },
  {
    id: 8277, sup: 'SOG', num: 2, pagina: 38,
    servico: 'Obter autorização da ANTAQ para transporte de passageiros, veículos e cargas na navegação interior de travessia',
    pergunta: 'Qual é a sua opinião a respeito do serviço prestado pela Antaq na obtenção de autorização para transporte de passageiros, veículos e cargas na navegação interior de travessia?',
    publicacao: '07/04/2026', respondentes: 7, base: 148,
    q1: { sim: 3, nao: 4 }, q2: { sim: 2, nao: 1 },
    q3: [0, 0, 1, 0, 2], q4: [0, 0, 1, 0, 2],
    sugestoes: [
      'Antaq devia ter maior controle sobre o que envolve monopólio dentro do Brasil. No ferry boat entre Itajaí x SC, o custo de travessia e o tipo de equipamentos são escassos, e muitas vezes só aceitam dinheiro em espécie, o que causa estranheza de movimentação; outra balsa que nos causa dúvida é Porto Velho x Manaus — custos elevadíssimos; acredito que a falta de fiscalização tem impactado na região.',
      'Informes das concessionárias dos veículos/das pessoas transportados(as) e o tempo de duração do serviço e intervalos.'
    ],
    nota: 'O texto de análise do documento-fonte indicava 3 respostas "sim" na questão 2; o valor foi ajustado para 2, conforme o gráfico da Plataforma (66,7% de 3 respondentes).'
  },
  {
    id: 8278, sup: 'SOG', num: 3, pagina: 41,
    servico: 'Obter autorização da ANTAQ para transporte de passageiros e misto na navegação interior de percurso longitudinal interestadual e internacional',
    pergunta: 'Qual é a sua opinião a respeito do serviço prestado pela Antaq na obtenção de autorização para transporte misto e de passageiros na navegação interior de percurso longitudinal interestadual e internacional?',
    publicacao: '07/04/2026', respondentes: 5, base: 147,
    q1: { sim: 0, nao: 5 }, q2: null,
    q3: null, q4: null,
    sugestoes: []
  },
  {
    id: 8279, sup: 'SOG', num: 5, pagina: 54,
    servico: 'Obter autorização da ANTAQ para ampliação da área da instalação portuária privada localizada fora da área de Porto Organizado',
    pergunta: 'Qual é a sua opinião a respeito do serviço prestado pela Antaq na obtenção de autorização para ampliação da área da instalação portuária privada localizada fora da área de Porto Organizado?',
    publicacao: '07/04/2026', respondentes: 6, base: 145,
    q1: { sim: 3, nao: 3 }, q2: { sim: 3, nao: 0 },
    q3: [0, 0, 1, 0, 2], q4: [0, 0, 1, 0, 2],
    sugestoes: ['Aconselhamos maior clareza no check-list de documentos e procedimentos para outorga junto à Agência.']
  },
  {
    id: 8280, sup: 'SOG', num: 12, pagina: 120,
    servico: 'Registrar na ANTAQ instalação de apoio ao transporte aquaviário não passível de autorização',
    pergunta: 'Qual é a sua opinião a respeito do serviço prestado pela Antaq no registro de instalação de apoio ao transporte aquaviário não passível de autorização?',
    publicacao: '07/04/2026', respondentes: 7, base: 146,
    q1: { sim: 2, nao: 5 }, q2: { sim: 2, nao: 0 },
    q3: [0, 0, 0, 1, 1], q4: [0, 0, 0, 1, 1],
    sugestoes: ['Melhorar o tempo de retorno.']
  },
  {
    id: 8281, sup: 'SOG', num: 16, pagina: 142,
    servico: 'Solicitar da ANTAQ análise de tonelagem para inscrição no Registro Especial Brasileiro (REB)',
    pergunta: 'Qual é a sua opinião a respeito do serviço prestado pela Antaq na solicitação de análise de tonelagem para inscrição no Registro Especial Brasileiro (REB)?',
    publicacao: '07/04/2026', respondentes: 5, base: 145,
    q1: { sim: 1, nao: 4 }, q2: { sim: 1, nao: 0 },
    q3: [0, 0, 0, 0, 1], q4: [0, 0, 0, 0, 1],
    sugestoes: []
  },
  {
    id: 8282, sup: 'SOG', num: 14, pagina: 136,
    servico: 'Solicitar atualização de dados na ANTAQ para o Sistema Mercante — AFRMM',
    pergunta: 'Qual é a sua opinião a respeito do serviço prestado pela Antaq na solicitação da atualização de dados para o Sistema Mercante - AFRMM?',
    publicacao: '07/04/2026', respondentes: 5, base: 149,
    q1: { sim: 3, nao: 2 }, q2: { sim: 1, nao: 2 },
    q3: [1, 0, 1, 0, 1], q4: [1, 0, 1, 0, 1],
    sugestoes: [
      'Falta transparência. Desconheço as informações da Antaq, caso tenha ações neste sentido.',
      'Atualização constante com disponibilização de canais eficientes de comunicação e resolução de irregularidades e inconsistências.'
    ]
  },
  {
    id: 8283, sup: 'SOG', num: 18, pagina: 146,
    servico: 'Solicitar homologação da ANTAQ para Acordo Operacional na navegação marítima ou interior',
    pergunta: 'Qual é a sua opinião a respeito do serviço prestado pela Antaq na solicitação de homologação para Acordo Operacional na navegação marítima ou interior?',
    publicacao: '07/04/2026', respondentes: 5, base: 145,
    q1: { sim: 0, nao: 5 }, q2: null,
    q3: null, q4: null,
    sugestoes: []
  },
  {
    id: 8284, sup: 'SOG', num: 13, pagina: 133,
    servico: 'Solicitar à ANTAQ autorização para operação em caráter emergencial e especial',
    pergunta: 'Qual é a sua opinião a respeito do serviço prestado pela Antaq na solicitação de autorização para operação em caráter emergencial e especial?',
    publicacao: '07/04/2026', respondentes: 5, base: 145,
    q1: { sim: 2, nao: 3 }, q2: { sim: 2, nao: 0 },
    q3: [0, 0, 0, 0, 2], q4: [0, 0, 0, 0, 2],
    sugestoes: []
  },
  {
    id: 8285, sup: 'SOG', num: 1, pagina: 34,
    servico: 'Obter autorização da ANTAQ para celebração de contrato de transição',
    pergunta: 'Qual é a sua opinião a respeito do serviço prestado pela Antaq na solicitação de autorização para celebrar Contrato de Transição ou Contrato de Uso Temporário?',
    publicacao: '07/04/2026', respondentes: 5, base: 147,
    q1: { sim: 2, nao: 3 }, q2: { sim: 2, nao: 0 },
    q3: [0, 0, 0, 0, 2], q4: [0, 0, 0, 0, 2],
    sugestoes: []
  },
  {
    id: 8286, sup: 'SOG', num: 17, pagina: 144,
    servico: 'Solicitar da ANTAQ análise de Projetos Executivos apresentados no âmbito das Concessões e dos Arrendamentos Portuários',
    pergunta: 'Qual é a sua opinião a respeito do serviço prestado pela Antaq na solicitação de análise de Projetos Executivos apresentados no âmbito das Concessões e dos Arrendamentos Portuários?',
    publicacao: '07/04/2026', respondentes: 6, base: 145,
    q1: { sim: 3, nao: 3 }, q2: { sim: 3, nao: 0 },
    q3: [0, 0, 0, 0, 3], q4: [0, 0, 0, 0, 3],
    sugestoes: ['Antaq acertou e foi corajosa no caso do STS 10.']
  },
  {
    id: 8287, sup: 'SOG', num: 8, pagina: 100,
    servico: 'Propor à ANTAQ recomposição do equilíbrio econômico-financeiro de contratos de Arrendamentos Portuários ou de EVTEA',
    pergunta: 'Qual é a sua opinião a respeito do serviço prestado pela Antaq na análise da proposta de recomposição do equilíbrio econômico-financeiro de contratos de Arrendamentos Portuários ou de EVTEA?',
    publicacao: '07/04/2026', respondentes: 7, base: 145,
    q1: { sim: 4, nao: 3 }, q2: { sim: 3, nao: 1 },
    q3: [1, 0, 0, 0, 3], q4: [1, 0, 0, 0, 3],
    sugestoes: [
      'O serviço prestado pela ANTAQ na análise de propostas de recomposição do equilíbrio econômico-financeiro de contratos de arrendamentos portuários ou de EVTEA é, em geral, técnico e fundamentado, contribuindo para a segurança jurídica e regulatória do setor. Contudo, ainda há oportunidades de aprimoramento, especialmente quanto à celeridade dos processos e à padronização de entendimentos, a fim de garantir maior previsibilidade e eficiência aos agentes envolvidos.',
      'A exemplo do que foi feito na análise do contrato do Ecoporto, que fez investimentos sem ter a garantia de renovação do contrato de concessão, decisões erradas nesse sentido podem ter consequências graves. Existe uma linha muito tênue entre risco do negócio e desequilíbrio de contrato. No caso do Ecoporto, faltou transparência e o processo ainda foi considerado sob sigilo. Deveria ser público e esclarecer as razões de indenização tão vultosa e aparentemente sem sentido.'
    ]
  },


  {
    id: 8288, sup: 'SRG', num: 4, pagina: 47,
    servico: 'Obter autorização da ANTAQ para incorporação/desincorporação de bens da União ao/do acervo patrimonial dos portos organizados',
    pergunta: 'Qual é a sua opinião a respeito do serviço prestado pela Antaq na obtenção de autorização para incorporação/desincorporação de bens da União ao/do acervo patrimonial dos portos organizados?',
    publicacao: '07/04/2026', respondentes: 6, base: 152,
    q1: { sim: 3, nao: 3 }, q2: { sim: 3, nao: 0 },
    q3: [0, 0, 1, 0, 2], q4: [0, 0, 1, 0, 2],
    sugestoes: ['Reduzir a burocracia. Analisar a possibilidade de acabar com a reversão e transformar em indenização ao final do contrato, com base na depreciação, até porque, ao final, muitos bens já não têm utilidade tendo em vista a modernização — caem em desuso. Desta forma, além de entrarem mais recursos aos cofres públicos, os entes de posse dos bens devem dar a destinação, caso não sejam aceitos ao final do contrato de arrendamento/reversão.']
  },
  {
    id: 8289, sup: 'SRG', num: 6, pagina: 64,
    servico: 'Obter autorização da ANTAQ para revisão/reajuste das tarifas portuárias',
    pergunta: 'Qual é a sua opinião a respeito do serviço prestado pela Antaq na obtenção de autorização para revisão/reajuste das tarifas portuárias?',
    publicacao: '07/04/2026', respondentes: 6, base: 151,
    q1: { sim: 5, nao: 1 }, q2: { sim: 2, nao: 3 },
    q3: [2, 0, 1, 0, 2], q4: [2, 0, 1, 0, 2],
    sugestoes: [
      'Acredito que a ANTAQ precise fiscalizar e notar os altos custos cobrados pelos arredores do Brasil. Entendemos que sim, como prestadores de serviço, temos e precisamos de lucro, porém em alguns casos o fornecedor cobra custos imensos, causando a perda da carga. Tudo que gera exagero pode gerar um descontrole; isso deve ser fiscalizado de perto.',
      'A Antaq deve ser mais cuidadosa ao autorizar reajustes de tarifas portuárias, pois muitas delas são abusivas por conta da falta de concorrência.',
      'Os serviços das agências reguladoras devem ser vinculados a total transparência e máxima eficiência na defesa dos interesses dos usuários.',
      'Creio que deveria ter mais transparência.'
    ]
  },
  {
    id: 8290, sup: 'SRG', num: 5, pagina: 59,
    servico: 'Obter autorização da ANTAQ para antecipação de receitas de autoridades portuárias',
    pergunta: 'Qual é a sua opinião a respeito do serviço prestado pela Antaq na obtenção de autorização para antecipação de receitas de autoridades portuárias?',
    publicacao: '07/04/2026', respondentes: 7, base: 149,
    q1: { sim: 0, nao: 7 }, q2: null,
    q3: null, q4: null,
    sugestoes: []
  },
  {
    id: 8291, sup: 'SRG', num: 1, pagina: 13,
    servico: 'Obter análise da ANTAQ para transferência de titularidade de instalação portuária',
    pergunta: 'Qual é a sua opinião a respeito do serviço prestado pela Antaq na obtenção da análise para transferência de titularidade de instalação portuária?',
    publicacao: '07/04/2026', respondentes: 6, base: 145,
    q1: { sim: 3, nao: 3 }, q2: { sim: 3, nao: 0 },
    q3: [0, 0, 0, 0, 3], q4: [0, 0, 0, 0, 3],
    sugestoes: []
  },
  {
    id: 8292, sup: 'SRG', num: 7, pagina: 71,
    servico: 'Obter autorização da ANTAQ para transferência de controle societário de instalação portuária',
    pergunta: 'Qual é a sua opinião a respeito do serviço prestado pela Antaq na obtenção de autorização para transferência de controle societário de instalação portuária?',
    publicacao: '07/04/2026', respondentes: 6, base: 147,
    q1: { sim: 2, nao: 4 }, q2: { sim: 2, nao: 0 },
    q3: [0, 0, 0, 0, 2], q4: [0, 0, 0, 0, 2],
    sugestoes: []
  },
  {
    id: 8293, sup: 'SRG', num: 2, pagina: 21,
    servico: 'Obter análise da ANTAQ quanto à alteração da tabela de preços de instalações portuárias arrendadas ou autorizadas',
    pergunta: 'Qual é a sua opinião a respeito do serviço prestado pela Antaq na obtenção da análise quanto à alteração da tabela de preços de instalações portuárias arrendadas ou autorizadas?',
    publicacao: '07/04/2026', respondentes: 7, base: 145,
    q1: { sim: 4, nao: 3 }, q2: { sim: 2, nao: 2 },
    q3: [0, 1, 1, 0, 2], q4: [0, 1, 1, 0, 2],
    sugestoes: [
      'É preciso uniformização das descrições dos serviços dos terminais da zona primária e zona secundária. É preciso um portal único com todos os serviços praticados para que o exportador e o importador tenham previsibilidade. Os mesmos serviços prestados aos usuários são chamados de nomes diferentes para enganar o exportador e o importador.',
      'A Antaq deve também fiscalizar os novos serviços incluídos nas tabelas públicas, e não somente verificar o índice de correção. Verificar se novas cobranças são legais e já não estão sendo cobradas em duplicidade por outras taxas pagas pelo embarcador/importador.'
    ]
  },
  {
    id: 8294, sup: 'SRG', num: 3, pagina: 27,
    servico: 'Obter autorização da ANTAQ para alteração de tabela de preços dos serviços de transporte aquaviário na navegação interior',
    pergunta: 'Qual é a sua opinião a respeito do serviço prestado pela Antaq na obtenção de autorização para alteração de tabela de preços dos serviços de transporte aquaviário na navegação interior?',
    publicacao: '07/04/2026', respondentes: 6, base: 145,
    q1: { sim: 0, nao: 6 }, q2: null,
    q3: null, q4: null,
    sugestoes: []
  },
  {
    id: 8295, sup: 'SRG', num: 8, pagina: 126,
    servico: 'Solicitar à ANTAQ a harmonização de conflito de interesses nos portos e na navegação',
    pergunta: 'Qual é a sua opinião a respeito do serviço prestado pela Antaq na solicitação de harmonização de conflito de interesses nos portos e na navegação?',
    publicacao: '07/04/2026', respondentes: 8, base: 146,
    q1: { sim: 2, nao: 6 }, q2: { sim: 0, nao: 2 },
    q3: [1, 1, 0, 0, 0], q4: [1, 1, 0, 0, 0],
    sugestoes: [
      'A Antaq deve pautar sua atuação na defesa da concorrência, dos direitos dos usuários e da eficiência econômica.',
      'É necessário mais transparência pelo órgão regulador. Deve analisar com clareza a situação antes de decidir. Um exemplo é a questão do SSE, onde uma decisão errada e equivocada da Antaq interpretou erroneamente o conceito de THC na Resolução 2389/2012, separando THC, o que gerou assimetrias e inclusive originou a cobrança do SSE, pois o conceito de THC no embarque sempre foi igual à descarga, ou seja, compreendia todos os serviços regulares até a saída do gate (inclusive).'
    ]
  },


  {
    id: 8296, sup: 'SAF', num: 1, pagina: 81,
    servico: 'Obter declaração da ANTAQ para fins de credenciamento, validação ou outros atestados',
    pergunta: 'Qual é a sua opinião a respeito do serviço prestado pela Antaq na solicitação de declaração para fins de credenciamento, validação ou outros atestados?',
    publicacao: '07/04/2026', respondentes: 6, base: 145,
    q1: { sim: 1, nao: 5 }, q2: { sim: 1, nao: 0 },
    q3: [0, 0, 0, 0, 1], q4: [0, 0, 0, 0, 1],
    sugestoes: []
  },
  {
    id: 8297, sup: 'SAF', num: 3, pagina: 96,
    servico: 'Obter parcelamento de multas emitidas pela ANTAQ',
    pergunta: 'Qual é a sua opinião a respeito do serviço prestado pela Antaq na obtenção de parcelamento de multas emitidas pela Agência?',
    publicacao: '07/04/2026', respondentes: 7, base: null,
    q1: { sim: 1, nao: 6 }, q2: { sim: 1, nao: 0 },
    q3: [0, 0, 0, 1, 0], q4: [0, 0, 1, 0, 0],
    sugestoes: ['O processo e o sistema da ANTAQ poderiam ser simplificados para as entidades empresariais, de modo que não fosse necessário um advogado especialista.'],
    nota: 'No documento-fonte, o cabeçalho desta enquete repete o da enquete anterior. O enunciado acima foi reconstituído a partir da Carta de Serviços e o total de 7 respondentes, a partir do gráfico da questão 1 (14,3% / 85,7%). O total de conselheiros inscritos na data não consta.'
  },
  {
    id: 8298, sup: 'SAF', num: 4, pagina: 102,
    servico: 'Realizar pagamento de multa e outros débitos junto à ANTAQ',
    pergunta: 'Qual é a sua opinião a respeito do serviço prestado pela Antaq na realização de pagamento de multa aplicada pela Agência?',
    publicacao: '07/04/2026', respondentes: 6, base: 145,
    q1: { sim: 2, nao: 4 }, q2: { sim: 2, nao: 0 },
    q3: [0, 0, 0, 1, 1], q4: [0, 0, 0, 2, 0],
    sugestoes: [
      'O processo foi conduzido por advogado especializado face à burocracia envolvida.',
      'Foi um bom atendimento, mas acredito que seria interessante a conversão de multas em prestação de serviço social.'
    ]
  },
  {
    id: 8299, sup: 'SAF', num: 2, pagina: 93,
    servico: 'Obter parcela de Contrato de Concessão/Arrendamento em que a ANTAQ seja interveniente',
    pergunta: 'Qual é a sua opinião a respeito do serviço prestado pela Antaq na obtenção de parcela de Contrato de Concessão/Arrendamento em que a Agência seja interveniente?',
    publicacao: '07/04/2026', respondentes: 6, base: null,
    q1: { sim: 3, nao: 3 }, q2: { sim: 3, nao: 0 },
    q3: [0, 0, 0, 0, 3], q4: [0, 0, 0, 0, 3],
    sugestoes: [],
    nota: 'No documento-fonte, o cabeçalho desta enquete repete o da enquete anterior. O enunciado acima foi reconstituído a partir da Carta de Serviços. O total de conselheiros inscritos na data não consta.'
  },


  {
    id: 8300, sup: 'SFC', num: 1, pagina: 5,
    servico: 'Consultar empresas e embarcações para o transporte aquaviário federal de passageiros na navegação interior (Navegue Seguro)',
    pergunta: 'Qual é a sua opinião a respeito do serviço prestado pela Antaq na consulta a empresas e embarcações para o transporte aquaviário federal de passageiros na navegação interior (Navegue Seguro)?',
    publicacao: '07/04/2026', respondentes: 8, base: 145,
    q1: { sim: 3, nao: 5 }, q2: { sim: 3, nao: 0 },
    q3: [0, 0, 0, 1, 2], q4: [0, 0, 0, 1, 2],
    sugestoes: [
      'A opinião de entidades empresariais é balizadora para o dinamismo e o crescimento econômico.',
      'A ANTAQ deveria ser mais ativa na gestão dos portos delegados e privados: 1) no sentido de revisar, apoiar e auditar os Regulamentos de Atracação em cada porto, principalmente nos portos públicos, muito provavelmente ferindo regras de compliance; 2) como pode o Porto de Vila do Conde, em Barcarena, não possuir balanças para pesagem de cargas no fluxo de exportação e importação? Já houve várias denúncias dos motivos e nada foi feito. Este caso foi denunciado através do Fala.BR para CGU, PF e MPF.'
    ],
    nota: 'No documento-fonte esta enquete aparece numerada como 8299, repetindo a anterior; a numeração foi corrigida para 8300 conforme a sequência da Carta de Serviços.'
  }
];

const SERVICOS_SEM_ENQUETE = [];

const ESCALA_NOTAS = ['Péssimo', 'Ruim', 'Bom', 'Muito Bom', 'Excelente'];

function acharEnquete(id) {
  return ENQUETES.find(function (e) { return e.id === Number(id); }) || null;
}

function pct(parte, total) {
  if (!total) return '0%';
  var v = (parte / total) * 100;
  var s = (Math.round(v * 10) / 10).toFixed(1).replace('.', ',');
  return s.replace(',0', '') + '%';
}

function plural(n, singular, pluralForma) {
  return n === 1 ? singular : pluralForma;
}

function segmentosAnalise(e, questao) {
  var q1 = e.q1, q2 = e.q2;
  var segs = [];
  var seg = function (texto, chave) { segs.push({ texto: texto, chave: chave || null }); };

  if (questao === 1) {
    var totalQ1 = q1.sim + q1.nao;
    if (q1.sim === 0) {
      seg(totalQ1 + ' ' + plural(totalQ1, 'Conselheiro respondeu', 'Conselheiros responderam') +
        ' ao questionário, mas nenhum deles havia utilizado o serviço; sendo assim, as demais questões não foram apresentadas.', 'nao');
      return segs;
    }
    if (q1.nao > 0) {
      seg(q1.nao + ' ' + plural(q1.nao, 'Conselheiro respondeu', 'Conselheiros responderam') +
        ' que não ' + plural(q1.nao, 'utilizou', 'utilizaram') + ' o serviço (' + pct(q1.nao, totalQ1) + ')', 'nao');
      seg(' e ');
    }
    seg(q1.sim + ' ' + plural(q1.sim, 'Conselheiro respondeu', 'Conselheiros responderam') +
      ' que ' + plural(q1.sim, 'utilizou', 'utilizaram') + ' o serviço (' + pct(q1.sim, totalQ1) + ')', 'sim');
    seg('. ' + plural(q1.sim, 'O Conselheiro que afirmou ter utilizado o serviço foi encaminhado',
      'Os Conselheiros que afirmaram ter utilizado o serviço foram encaminhados') + ' para as próximas perguntas.');
    return segs;
  }

  if (questao === 2) {
    if (!q2) return segs;
    var totalQ2 = q2.sim + q2.nao;
    var houve = false;
    if (q2.nao > 0) {
      seg(q2.nao + ' ' + plural(q2.nao, 'Conselheiro respondeu', 'Conselheiros responderam') +
        ' que não ' + plural(q2.nao, 'teve', 'tiveram') + ' facilidade para acessar o serviço (' + pct(q2.nao, totalQ2) + ')', 'nao');
      houve = true;
    }
    if (q2.sim > 0) {
      if (houve) seg(' e ');
      seg(q2.sim + ' ' + plural(q2.sim, 'Conselheiro respondeu', 'Conselheiros responderam') +
        ' que ' + plural(q2.sim, 'teve', 'tiveram') + ' facilidade para acessar o serviço (' + pct(q2.sim, totalQ2) + ')', 'sim');
    }
    var fecho = '.';
    if (q2.sim > 0 && q2.nao > 0) {
      fecho += ' ' + plural(q2.sim, 'O Conselheiro que afirmou ter facilidade foi encaminhado',
        'Os Conselheiros que afirmaram ter facilidade foram encaminhados') + ' para as próximas perguntas.';
    }
    seg(fecho);
    return segs;
  }

  var notas = questao === 3 ? e.q3 : e.q4;
  if (!notas) return segs;
  var alvo = questao === 3 ? 'o atendimento do serviço' : 'o tempo para a conclusão do pedido';
  var itens = [];
  for (var i = 0; i < 5; i++) {
    if (notas[i] > 0) {
      itens.push({
        chave: 'n' + (i + 1),
        texto: notas[i] + ' ' + plural(notas[i], 'Conselheiro classificou', 'Conselheiros classificaram') +
          ' com nota ' + (i + 1) + ' (' + ESCALA_NOTAS[i] + ')'
      });
    }
  }
  if (!itens.length) return segs;




  ['classificou com', 'classificaram com'].forEach(function (marca) {
    for (var k = 0; k < itens.length; k++) {
      if (itens[k].texto.indexOf(marca) !== -1) {
        itens[k].texto = itens[k].texto.replace(marca, marca.replace(' com', ' ' + alvo + ' com'));
        return;
      }
    }
  });

  itens.forEach(function (it, k) {
    if (k > 0) seg(k === itens.length - 1 ? ' e ' : ', ');
    seg(it.texto, it.chave);
  });
  seg('.');
  return segs;
}

function textoAnalise(e, questao) {
  return segmentosAnalise(e, questao).map(function (s) { return s.texto; }).join('');
}

function mediaNotas(notas) {
  if (!notas) return null;
  var soma = 0, n = 0;
  for (var i = 0; i < 5; i++) { soma += notas[i] * (i + 1); n += notas[i]; }
  return n ? soma / n : null;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ENQUETES, SUPERINTENDENCIAS, PERIODO_ENQUETES, SERVICOS_SEM_ENQUETE, CARTA_HISTORICO };
}
