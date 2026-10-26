/* =====================================================================
   DADOS DO PORTEFÓLIO
   ---------------------------------------------------------------------
   Este é o único ficheiro que precisas de editar para:
   - mudar textos gerais (apresentação, sobre, contactos, fotografias)
   - acrescentar, editar ou esconder projetos

   Para um projeto novo: copia um bloco de PROJECTS, muda o "slug"
   (nome curto sem espaços nem acentos), põe as imagens em
   assets/projetos/<slug>/ e preenche os campos.
   ===================================================================== */

window.SITE = {
  name: "maithy",
  fullName: "Miguel Angel Colina Contreras",
  tagline: "Trabalhos, experiências e projetos visuais.",
  place: "Viseu — PT",
  available: true,
  availableText: "Aberto a colaborações",

  // Recortes de trabalhos próprios mostrados na abertura (cada um abre o projeto)
  fragments: [
    { src: "assets/fragmentos/caos.jpg", slug: "caos-harmonia-movimento", label: "Caos" },
    { src: "assets/fragmentos/harmonia.jpg", slug: "caos-harmonia-movimento", label: "Harmonia" },
    { src: "assets/fragmentos/movimento.jpg", slug: "caos-harmonia-movimento", label: "Movimento" },
    { src: "assets/fragmentos/azulejo.jpg", slug: "azulejo-guatire", label: "Azulejo Guatire" }
  ],

  about: {
    lead: "Sou o Miguel, também conhecido como maithy.",
    paragraphs: [
      "Venho de uma formação em informática e frequento unidades curriculares de Tecnologias e Design de Multimédia na ESTGV, em Viseu.",
      "Tenho desenvolvido trabalhos entre o design gráfico, a programação e a experimentação visual. Quero continuar a desenvolver o meu percurso artístico através de diferentes meios de expressão, incluindo a imagem, a música e a produção audiovisual.",
      "Este portefólio reúne os meus projetos e processos, e vai continuar a crescer com novas ideias e futuras colaborações."
    ],
    photo: {
      src: "assets/fotografias/pessoais/skate-noite.jpg",
      caption: "Skate, à noite."
    },
    timeline: [
      { when: "2026 —", what: "Tecnologias e Design de Multimédia", where: "ESTGV · Instituto Politécnico de Viseu" },
      { when: "2026", what: "Curso Profissional de Técnico de Informática – Sistemas", where: "Escola Secundária de Viriato · PAP: FitGuide (14 valores)" }
    ],
    // Só ferramentas usadas nos trabalhos publicados
    skills: ["Adobe Illustrator", "Adobe Photoshop", "Canva", "Premiere Pro", "HTML", "CSS", "JavaScript", "PHP", "MySQL"]
  },

  // Registos: fotografias pessoais (não são projetos nem colaborações)
  records: [
    { src: "assets/fotografias/pessoais/com-saikoro.jpg", caption: "Com Saikoro." },
    { src: "assets/fotografias/pessoais/com-joshu-joshu.jpg", caption: "Com Joshu Joshu." },
    { src: "assets/fotografias/pessoais/com-pedroladroga.jpg", caption: "Com PedroLadroga." }
  ],

  contacts: [
    { label: "Email", value: "macc24092006@gmail.com", href: "mailto:macc24092006@gmail.com" },
    { label: "Instagram", value: "@z_maithy", href: "https://www.instagram.com/z_maithy/" }
  ]
};

/* ---------------------------------------------------------------------
   PROJETOS
   category:  "academico" | "pessoal"
   status:    "concluido" | "em-desenvolvimento" (omite se não for relevante)
   featured:  número = posição na Seleção da página inicial
   secondary: número = posição em "Outros trabalhos"
   thumb:     miniatura leve para a página inicial e o índice (opcional; senão usa cover)
   coverFit:  "contain" = mostra a capa inteira, sem cortar
   role:      contributo (omite quando não estiver confirmado)
   blocks:    conteúdo da página, por ordem. Tipos:
     { type: "text", heading, body: [parágrafos] }
     { type: "list", heading, items: [...] }
     { type: "image", src, caption, size: "full" | "narrow" }
     { type: "gallery", heading, cols, items: [{ src, caption }], caption }
   --------------------------------------------------------------------- */

const P = "assets/projetos";
const F = "assets/fotografias";

// Experiências em Illustrator, cinco por conceito:
// estudos/01–05 caos, 06–10 harmonia, 11–15 movimento
function estudos(nome, primeiro) {
  return Array.from({ length: 5 }, (_, i) => {
    const n = String(primeiro + i).padStart(2, "0");
    return { src: `${P}/caos-harmonia-movimento/estudos/${n}.jpg`, caption: `${nome} ${i + 1}` };
  });
}

// Os 23 diapositivos de "O Processo Criativo", pela ordem original
const CCM3_SLIDES = [
  "Título", "Objetivo", "Etapas do processo criativo", "O modelo de Graham Wallas", "Preparação, incubação, iluminação, verificação",
  "Caso real: a gravação de Loveless", "Loveless", "O problema", "As condições de gravação", "Os custos",
  "A alteração decisiva", "Produto: a sequência", "Ideia / problema", "Tentativa", "Erro ou feedback",
  "Alteração", "Resultado", "Reflexão final", "Em que momento ocorreu a aprendizagem?", "O erro prejudicou ou ajudou o processo?",
  "E se a primeira ideia fosse aceite sem crítica?", "Fontes", "Nota pessoal"
].map((caption, i) => {
  const n = String(i + 1).padStart(2, "0");
  return { src: `${P}/ccm-processo-criativo/${n}.jpg`, caption: `${n} · ${caption}` };
});

window.PROJECTS = [
  /* ---------------- Principais ---------------- */

  {
    slug: "fitguide",
    title: "FitGuide",
    subtitle: "Plataforma web de fitness e nutrição",
    year: 2026,
    category: "academico",
    status: "concluido",
    featured: 1,
    context: "Prova de Aptidão Profissional · Curso Profissional de Técnico de Informática – Sistemas · Escola Secundária de Viriato — 14 valores",
    tools: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "Chart.js", "XAMPP"],
    role: "Projeto individual.",
    // A capa (página inicial do FitGuide) aparece no topo da página do projeto
    cover: `${P}/fitguide/home.jpg`,
    summary: "Plataforma web gratuita com calculadoras, artigos, um quiz de perfil e conta pessoal, para treinar, comer e evoluir com base em evidência.",
    blocks: [
      { type: "text", heading: "Objetivo", body: [
        "Desenvolver uma plataforma web funcional, segura e cientificamente fundamentada, que ajude utilizadores de todos os níveis a treinar, comer e evoluir com base em evidência real."
      ]},
      { type: "gallery", heading: "Páginas do site", cols: 2, items: [
        { src: `${P}/fitguide/comeca.jpg`, caption: "Quiz de perfil" },
        { src: `${P}/fitguide/ferramentas.jpg`, caption: "Calculadoras" },
        { src: `${P}/fitguide/calc-tmb.jpg`, caption: "Calculadora de TMB" },
        { src: `${P}/fitguide/blog.jpg`, caption: "Blog" }
      ]},
      { type: "list", heading: "Funcionalidades", items: [
        "11 calculadoras: TMB, 1RM, gordura corporal, macronutrientes e hidratação, entre outras.",
        "Quiz de perfil com 8 perguntas e 5 perfis, que encaminha para um plano de treino.",
        "Conta pessoal com dashboard: gráfico de barras (Chart.js) com a utilização de cada calculadora e histórico dos cálculos.",
        "23 artigos sobre treino, nutrição e suplementação, com referências científicas.",
        "Passwords com bcrypt, recuperação de password por token de uso único que expira em 1 hora, e consultas com prepared statements.",
        "Layout adaptado a telemóvel, tablet e computador."
      ]},
      { type: "text", heading: "Tecnologia", body: [
        "HTML, CSS e JavaScript sem frameworks; PHP com MySQLi (13 endpoints) e base de dados MySQL com 5 tabelas; Chart.js no dashboard. Desenvolvido em ambiente local, com XAMPP."
      ]}
    ]
  },

  {
    slug: "caos-harmonia-movimento",
    title: "Caos, Harmonia e Movimento",
    subtitle: "Composição com formas básicas",
    year: 2026,
    category: "academico",
    status: "concluido",
    featured: 2,
    context: "Design Multimédia · ESTGV · 2026",
    tools: ["Desenho à mão", "Adobe Illustrator"],
    cover: `${P}/caos-harmonia-movimento/caos.jpg`,
    summary: "Três composições feitas apenas com quadrados para representar três conceitos abstratos.",
    blocks: [
      { type: "text", heading: "O trabalho", body: [
        "Representar caos, harmonia e movimento apenas com quadrados, através da posição, da escala, da cor e da sobreposição.",
        "O processo passou por cinco esboços à mão por conceito e cinco experiências em Illustrator por conceito, antes das composições finais."
      ]},
      { type: "gallery", heading: "Esboços manuais", cols: 2, items: [
        { src: `${P}/caos-harmonia-movimento/esbocos-folha-1.jpg`, caption: "Folha 1" },
        { src: `${P}/caos-harmonia-movimento/esbocos-folha-2.jpg`, caption: "Folha 2" }
      ], caption: "Cinco esboços por conceito, em duas folhas." },
      { type: "gallery", heading: "Exploração digital — Caos", cols: 5, items: estudos("Caos", 1) },
      { type: "gallery", heading: "Exploração digital — Harmonia", cols: 5, items: estudos("Harmonia", 6) },
      { type: "gallery", heading: "Exploração digital — Movimento", cols: 5, items: estudos("Movimento", 11) },
      { type: "gallery", heading: "Composições finais", cols: 3, items: [
        { src: `${P}/caos-harmonia-movimento/caos.jpg`, caption: "Caos" },
        { src: `${P}/caos-harmonia-movimento/harmonia.jpg`, caption: "Harmonia" },
        { src: `${P}/caos-harmonia-movimento/movimento.jpg`, caption: "Movimento" }
      ]}
    ]
  },

  {
    slug: "ccm-processo-criativo",
    title: "O Processo Criativo",
    subtitle: "Errar, melhorar, criar — a gravação de Loveless",
    year: 2026,
    category: "academico",
    status: "concluido",
    featured: 3,
    context: "Criatividade e Comunicação Multimédia (CCM) · TDM · ESTGV — Mini-trabalho 3",
    tools: ["Canva"],
    cover: `${P}/ccm-processo-criativo/01.jpg`,
    summary: "Apresentação que aplica as quatro etapas do processo criativo de Graham Wallas à gravação do álbum Loveless, dos My Bloody Valentine (1991).",
    blocks: [
      { type: "text", heading: "Objetivo", body: [
        "Mostrar que uma solução criativa raramente surge pronta e que o erro, a tentativa, a reformulação e o feedback fazem parte do processo, a partir de um caso real: a gravação de Loveless."
      ]},
      { type: "gallery", heading: "Apresentação — 23 diapositivos", cols: 3, items: CCM3_SLIDES },
      { type: "text", heading: "Créditos", body: [
        "As imagens relacionadas com Loveless — a capa do álbum (Creation Records, 1991) e as fotografias dos My Bloody Valentine — são de outros autores. A pesquisa e a apresentação são o meu trabalho.",
        "Fontes consultadas: Wikipedia, Far Out Magazine, Westword, Sound on Sound e The Marginalian."
      ]}
    ]
  },

  {
    slug: "azulejo-guatire",
    title: "Azulejo Guatire",
    subtitle: "Retrato ilustrado da identidade local",
    year: 2026,
    category: "academico",
    status: "concluido",
    featured: 4,
    context: "Fundamentos Multimédia · TDM · ESTGV — Trabalho Prático 1",
    tools: ["Adobe Illustrator"],
    role: "Trabalho de grupo (2 elementos): cada elemento desenhou um azulejo, com moldura contínua entre os dois.",
    // Versão final: azulejo_guatire_miguel_pv36369_.ai, exportada em PNG pelo Illustrator
    cover: `${P}/azulejo-guatire/azulejo-final_pv36369_.png`,
    coverFit: "contain",
    summary: "Azulejo vetorial dedicado a Guatire (Zamora), desenhado dentro das regras do enunciado.",
    blocks: [
      { type: "text", heading: "Enunciado", body: [
        "Criar um azulejo de 20 × 20 cm dedicado a uma freguesia, com dois elementos representativos, o nome da freguesia e do concelho, uma assinatura discreta e uma moldura contínua com o azulejo do outro elemento do grupo. CMYK, no máximo três cores além do branco, e apenas desenho vetorial."
      ]},
      { type: "image", size: "narrow", src: `${P}/azulejo-guatire/azulejo-final_pv36369_.png` }
    ]
  },

  /* ---------------- Outros trabalhos ---------------- */

  {
    slug: "pesquisa-visual",
    title: "Pesquisa Visual — Sebastião Rodrigues e Eduardo Aires",
    year: 2026,
    category: "academico",
    secondary: 1,
    context: "Design Multimédia · TDM · ESTGV — Tarefa 0: Pesquisa e Inspira-te!",
    tools: ["Canva"],
    cover: `${P}/pesquisa-visual/03.jpg`,
    summary: "Pesquisa de referências visuais da história do design gráfico, com a seleção e análise de obras de Sebastião Rodrigues e Eduardo Aires.",
    blocks: [
      { type: "text", heading: "O trabalho", body: [
        "Tarefa 0 de Design Multimédia: pesquisa de referências visuais de designers relevantes para a história do design gráfico. Selecionei Sebastião Rodrigues e Eduardo Aires e analisei obras suas quanto ao contexto, à função, à forma e ao conceito. A pesquisa foi apresentada no Canva."
      ]},
      { type: "gallery", heading: "Sebastião Rodrigues", cols: 3, items: [
        { src: `${P}/pesquisa-visual/01.jpg` },
        { src: `${P}/pesquisa-visual/02.jpg` },
        { src: `${P}/pesquisa-visual/03.jpg` }
      ], caption: "Capa do Almanaque (outubro de 1959), de Sebastião Rodrigues." },
      { type: "gallery", heading: "Eduardo Aires", cols: 2, items: [
        { src: `${P}/pesquisa-visual/04.jpg` },
        { src: `${P}/pesquisa-visual/05.jpg` }
      ]},
      { type: "text", heading: "Créditos", body: [
        "As obras apresentadas pertencem aos respetivos designers. O meu trabalho consistiu na pesquisa, seleção, análise e apresentação."
      ]}
    ]
  },

  {
    slug: "mapa-pessoal",
    title: "Mapa Pessoal",
    year: 2026,
    category: "academico",
    status: "concluido",
    secondary: 2,
    context: "Criatividade e Comunicação Multimédia · TDM · ESTGV",
    tools: ["Canva"],
    cover: `${P}/mapa-pessoal/mapa.jpg`,
    coverFit: "contain",
    summary: "Colagem digital com cinco palavras — reciprocidade, reflexão, existencial, metacognição e holismo — e imagens associadas.",
    blocks: [
      { type: "image", size: "narrow", src: `${P}/mapa-pessoal/mapa.jpg` },
      { type: "text", heading: "Créditos", body: [
        "Contém imagens de terceiros, entre as quais o ouroboros \"Muerte / Vida\"."
      ]}
    ]
  },

  {
    slug: "placa-caloiro",
    title: "Placa de caloiro",
    year: 2026,
    category: "pessoal",
    status: "concluido",
    secondary: 3,
    context: "Tradição académica · TDM · ESTGV",
    tools: ["Adobe Photoshop"],
    // Versão final: PLACA CALOIRO5.psd, exportada à resolução original (2480 × 1748)
    cover: `${P}/placa-caloiro/placa-caloiro5.jpg`,
    thumb: `${P}/placa-caloiro/placa-caloiro5_miniatura.jpg`,
    summary: "Colagem digital em Photoshop para a placa de caloiro de TDM.",
    blocks: [
      { type: "image", size: "full", src: `${P}/placa-caloiro/placa-caloiro5.jpg` },
      { type: "text", heading: "Créditos", body: [
        "Usa imagens de terceiros: personagens de anime, bonés e o ouroboros \"Muerte / Vida\"."
      ]}
    ]
  },

  /* ---------------- Em desenvolvimento ---------------- */

  {
    slug: "weed420",
    title: "WEED420 — Documentação Audiovisual",
    year: 2026,
    category: "pessoal",
    status: "em-desenvolvimento",
    context: "Projeto pessoal e independente — não é uma colaboração oficial com os artistas.",
    tools: ["Fotografia", "Vídeo", "Premiere Pro"],
    role: "Fotografia, vídeo e edição.",
    cover: `${F}/concertos/weed420_palco.jpg`,
    summary: "Fotografias e vídeos do concerto dos WEED420 em Lisboa, a 4 de outubro de 2026. Projeto audiovisual pessoal, em desenvolvimento.",
    blocks: [
      { type: "gallery", heading: "Fotografias", cols: 3, items: [
        { src: `${F}/concertos/weed420_palco.jpg` },
        { src: `${F}/concertos/weed420_laser.jpg` },
        { src: `${F}/concertos/weed420_luz-roxa.jpg` }
      ], caption: "Lisboa, 4 de outubro de 2026." },
      { type: "text", heading: "Vídeo", body: [
        "O vídeo do concerto está em edição, em Premiere Pro."
      ]}
    ]
  }
];
