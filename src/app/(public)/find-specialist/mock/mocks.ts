import { SpecialistType } from "../components/SpecialistCard/type";

export const specialistsMock: SpecialistType[] = [
  {
    name: "Alex Machado",
    role: "Psicólogo Clínico",
    crm: "CRP 01/2345",
    location: "Rua Augusta, SP",
    rating: 4.8,
    reviews: 302,
    approach: [{ label: "TCC" }, { label: "Mindfulness" }, { label: "Casais" }],
    specialties: [
      { label: "Terapia Cognitivo-Comportamental" },
      { label: "Terapia de Casal" },
      { label: "Mindfulness" },
    ],
    price: "R$100",
    imgSrc: "/images/alex.png",
    about:
      "Sou um psicólogo clínico com mais de 10 anos de experiência ajudando pessoas a superar desafios emocionais e mentais. Minha abordagem é baseada em Terapia Cognitivo-Comportamental (TCC), focada em resultados práticos e duradouros.",

    education: [
      "Graduação em Psicologia - Universidade de São Paulo (USP)",
      "Especialização em Terapia Cognitivo-Comportamental - Instituto de Psicologia Aplicada (IPA)",
      "Curso de Mindfulness para Psicólogos - Centro de Mindfulness de São Paulo",
    ],
    personalDescription:
      "Além da minha paixão pela psicologia, adoro viajar e explorar novas culturas. Acredito que o autoconhecimento é uma jornada contínua e estou aqui para ajudar meus pacientes a trilhar esse caminho com empatia e profissionalismo. Vamos trabalhar juntos para alcançar seus objetivos e melhorar sua qualidade de vida.",
  },
  {
    name: "Beatriz Souza",
    role: "Psicóloga Infantil",
    crm: "CRP 02/6789",
    location: "Rua Augusta, SP",
    rating: 4.6,
    reviews: 120,
    approach: [
      { label: "TCC" },
      { label: "Crianças" },
      { label: "Desenvolvimento" },
    ],
    specialties: [
      { label: "Terapia Cognitivo-Comportamental" },
      { label: "Terapia de Brinquedo" },
      { label: "Intervenção Precoce" },
    ],
    price: "R$120",
    imgSrc: "/images/beatriz.png",
    education: [
      "Graduação em Psicologia - Pontifícia Universidade Católica de São Paulo (PUC-SP)",
      "Especialização em Psicologia Infantil - Instituto de Psicologia da Criança (IPC)",
    ],
    personalDescription:
      "Sou apaixonada por trabalhar com crianças e ajudar no desenvolvimento emocional e cognitivo delas. Acredito que cada criança é única e merece uma abordagem personalizada para florescer em seu próprio ritmo.",
  },
  {
    name: "Carlos Lima",
    role: "Psicólogo",
    crm: "CRM 03/1122",
    location: "Av. Brasil, RJ",
    rating: 4.9,
    reviews: 450,
    approach: [
      { label: "Psicanálise" },
      { label: "Inconsciente" },
      { label: "Autoconhecimento" },
    ],
    specialties: [
      { label: "Psicanálise" },
      { label: "Depressão" },
      { label: "Sono" },
    ],
    price: "R$200",
    imgSrc: "/images/carlos.png",
    education: [
      "Graduação em Psicologia - Universidade Federal do Rio de Janeiro (UFRJ)",
      "Especialização em Psicanálise - Instituto de Psicanálise do Rio de Janeiro (IPRJ)",
    ],
    personalDescription:
      "Com mais de 15 anos de experiência, ajudo meus pacientes a explorar o inconsciente e compreender os padrões que influenciam suas vidas. Meu objetivo é promover o autoconhecimento e a transformação pessoal através da psicanálise.",
  },
  {
    name: "Daniela Rocha",
    role: "Psicóloga",
    crm: "CRP 04/3344",
    location: "Av. Faria Lima, SP",
    rating: 4.7,
    reviews: 210,
    approach: [
      { label: "TCC" },
      { label: "Carreira" },
      { label: "Gestão" },
      { label: "Liderança" },
    ],
    specialties: [
      { label: "Terapia Cognitivo-Comportamental" },
      { label: "Coaching de Carreira" },
      { label: "Desenvolvimento de Liderança" },
    ],
    price: "R$150",
    imgSrc: "/images/daniela.png",
    education: [
      "Graduação em Psicologia - Universidade Federal do Rio de Janeiro (UFRJ)",
      "Especialização em Terapia Cognitivo-Comportamental - Instituto de Psicologia Aplicada (IPA)",
    ],
    personalDescription:
      "Sou dedicada a ajudar profissionais a alcançarem seu potencial máximo, tanto na vida pessoal quanto na carreira. Acredito que o equilíbrio emocional é fundamental para o sucesso e felicidade.",
  },
  {
    name: "Eduardo Mendes",
    role: "Psicólogo Clínico",
    crm: "CRP 05/5566",
    location: "Rua das Flores, BH",
    rating: 4.5,
    reviews: 98,
    approach: [{ label: "TCC" }, { label: "Memória" }, { label: "Aprendizado" }],
    specialties: [
      { label: "Terapia Cognitivo-Comportamental" },
      { label: "Terapia de Memória" },
      { label: "Técnicas de Aprendizado" },
    ],
    price: "R$180",
    imgSrc: "/images/eduardo.png",
    education: [
      "Graduação em Psicologia - Universidade Federal de Minas Gerais (UFMG)",
      "Especialização em Terapia Cognitivo-Comportamental - Instituto de Psicologia Aplicada (IPA)",
    ],
    personalDescription:
      "Tenho paixão por ajudar meus pacientes a desenvolverem habilidades práticas para melhorar sua memória e capacidade de aprendizado. Acredito que todos têm o potencial para crescer e se adaptar às mudanças da vida.",
  },
  {
    name: "Fernanda Lima",
    role: "Psicóloga Clínica",
    crm: "CRP 06/7788",
    location: "Av. Ipiranga, SP",
    rating: 4.4,
    reviews: 150,
    approach: [
      { label: "Psicanálise" },
      { label: "Ansiedade" },
      { label: "Autoestima" },
      { label: "Relacionamento" },
    ],
    specialties: [
      { label: "Psicanálise" },
      { label: "Terapia de Ansiedade" },
      { label: "Terapia de Relacionamento" },
    ],
    price: "R$130",
    imgSrc: "/images/fernanda.png",
    education: [
      "Graduação em Psicologia - Universidade de São Paulo (USP)",
      "Especialização em Psicanálise - Instituto de Psicanálise de São Paulo (IPSP)",
    ],
    personalDescription:
      "Acredito na importância do autoconhecimento e da compreensão profunda dos sentimentos para promover mudanças significativas na vida dos meus pacientes. Estou aqui para apoiar cada um em sua jornada pessoal.",
  },
  {
    name: "Gustavo Fernandes",
    role: "Psicólogo Infantil",
    crm: "CRM 07/9900",
    location: "Rua XV de Novembro, PR",
    rating: 4.6,
    reviews: 80,
    approach: [{ label: "TCC" }, { label: "Crianças" }, { label: "TDAH" }],
    specialties: [
      { label: "Terapia Cognitivo-Comportamental" },
      { label: "Terapia de Brinquedo" },
      { label: "Intervenção em TDAH" },
    ],
    price: "R$210",
    imgSrc: "/images/gustavo.png",
    education: [
      "Graduação em Psicologia - Universidade Federal do Paraná (UFPR)",
      "Especialização em Psicologia Infantil - Instituto de Psicologia da Criança (IPC)",
    ],
    personalDescription:
      "Trabalho com crianças para ajudá-las a superar desafios emocionais e comportamentais, promovendo um ambiente seguro e acolhedor. Acredito que a infância é uma fase crucial para o desenvolvimento saudável.",
  },
  {
    name: "Helena Martins",
    role: "Psicóloga Familiar",
    crm: "CRP 08/1112",
    location: "Av. Copacabana, RJ",
    rating: 4.8,
    reviews: 270,
    approach: [
      { label: "Psicanálise" },
      { label: "Relacionamento" },
      { label: "Casais" },
    ],
    specialties: [
      { label: "Psicanálise" },
      { label: "Terapia de Casal" },
      { label: "Terapia Familiar" },
    ],
    price: "R$160",
    imgSrc: "/images/helena.png",
    education: [
      "Graduação em Psicologia - Universidade Federal do Rio de Janeiro (UFRJ)",
      "Especialização em Psicanálise - Instituto de Psicanálise do Rio de Janeiro (IPRJ)",
    ],
    personalDescription:
      "Tenho como missão ajudar famílias e casais a fortalecerem seus vínculos e superarem desafios juntos. Acredito que a comunicação aberta e o entendimento mútuo são essenciais para relações saudáveis.",
  },
  {
    name: "Igor Santos",
    role: "Psicólogo Esportivo",
    crm: "CRP 09/1314",
    location: "Av. Atlântica, RJ",
    rating: 4.7,
    reviews: 135,
    approach: [{ label: "Esporte" }, { label: "Performance" }],
    specialties: [
      { label: "Psicologia do Esporte" },
      { label: "Melhoria de Performance" },
      { label: "Gestão de Estresse" },
    ],
    price: "R$140",
    imgSrc: "/images/igor.png",
    education: [
      "Graduação em Psicologia - Universidade Federal do Rio de Janeiro (UFRJ)",
      "Especialização em Psicologia do Esporte - Instituto de Psicologia do Esporte (IPE)",
    ],
    personalDescription:
      "Sou dedicado a ajudar atletas a alcançarem seu melhor desempenho através do equilíbrio mental e emocional. Acredito que a mente é uma ferramenta poderosa para o sucesso esportivo e pessoal.",
  },
];
