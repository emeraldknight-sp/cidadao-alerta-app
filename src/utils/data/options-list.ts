const OPTIONS = [
  {
    title: "Problemas em construções",
    items: [
      {
        id: 1,
        name: "Deterioração do concreto",
        description:
          "A deterioração do concreto é o processo pelo qual, o concreto começa a se desgastar e perder suas propriedades, resultando em fissuras, desintegração e perda de resistência, comprometendo a segurança e a durabilidade das estruturas.",
        image: require("@/src/assets/deterioracao-concreto.png"),
      },
      {
        id: 2,
        name: "Rachaduras",
        description:
          "As rachaduras podem ser superficiais ou profundas, e sua gravidade deve ser avaliada. Fissuras pequenas geralmente não representam perigo, mas rachaduras grandes podem indicar problemas estruturais, necessitando de atenção profissional.",
        image: require("@/src/assets/rachaduras.png"),
      },
      {
        id: 3,
        name: "Infiltração",
        description:
          "A infiltração é o processo pelo qual a água penetra em estruturas, como paredes e pisos, causando danos e comprometendo a integridade do ambiente.",
        image: require("@/src/assets/infiltracao.png"),
      },
      {
        id: 4,
        name: "Mofo",
        description:
          "Mofo é um problema comum que surge devido à umidade excessiva e à falta de ventilação adequada. Ele se manifesta como manchas escuras ou verdes nas superfícies e pode afetar tanto a estética quanto a saúde dos ocupantes.",
        image: require("@/src/assets/mofo.png"),
      },
      {
        id: 5,
        name: "Destacamento cerâmico",
        description:
          "O destacamento cerâmico ocorre quando as placas de cerâmica se soltam da superfície em que foram aplicadas, como pisos ou paredes.",
        image: require("@/src/assets/destacamento-ceramico.png"),
      },
      {
        id: 6,
        name: "Corrosão",
        description:
          "A corrosão é um processo de degradação dos materiais, especialmente metais, causado por reações químicas e eletroquímicas com o ambiente. Essa patologia pode resultar em sérios danos estruturais e comprometer a segurança das construções.",
        image: require("@/src/assets/corrosao.png"),
      },
    ],
  },
  {
    title: "Problemas em pavimentações",
    items: [
      {
        id: 7,
        name: "Buraco",
        description:
          "Um buraco no asfalto é uma cavidade ou depressão na superfície asfaltada. Ele se forma devido a uma combinação de fatores, como a deterioração do material, infiltração de água, ciclos de congelamento e descongelamento, e sobrecarga de tráfego.",
        image: require('@/src/assets/buraco.png'),

      },
      {
        id: 8,
        name: "Afundamento",
        description:
          "O afundamento no asfalto refere-se a áreas da superfície que se encontram em um nível inferior em relação ao restante do pavimento, criando depressões.Tratar afundamentos rapidamente é crucial para manter a segurança e a integridade das vias asfaltadas.",
        image: require('@/src/assets/afundamento.png'),

      },
      {
        id: 9,
        name: "Trincas",
        description:
          "As trincas no asfalto são fissuras que aparecem na superfície pavimentada, podendo variar em tamanho e profundidade. Elas podem ser causadas por diversos fatores e, se não forem tratadas, podem levar a problemas mais sérios.",
        image: require('@/src/assets/trincas.png'),

      },
      {
        id: 10,
        name: "Remendo",
        description:
          "Remendo no asfalto é uma técnica utilizada para reparar buracos ou fissuras na superfície asfaltada. O objetivo é restaurar a integridade do pavimento e prolongar sua vida útil.Se feito de forma inadequada, além de não cumprir esse objetivo pode ampliar os problemas asfálticos anteriores.",
        image: require('@/src/assets/remendo.png'),
      },
    ],
  },
];

const BUILDINGS = OPTIONS[0].items;
const PAVIMENTS = OPTIONS[1].items;
const DEFECTS = BUILDINGS.concat(PAVIMENTS);

export { BUILDINGS, PAVIMENTS, OPTIONS, DEFECTS };
