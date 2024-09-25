const OPTIONS = [
  {
    title: "Problemas em construções",
    items: [
      {
        id: 1,
        name: "Deterioração do concreto",
      },
      {
        id: 2,
        name: "Rachaduras",
      },
      {
        id: 3,
        name: "Infiltração",
      },
      {
        id: 4,
        name: "Mofo",
      },
      {
        id: 5,
        name: "Destacamento cerâmico",
      },
      {
        id: 6,
        name: "Corrosão",
      },
    ],
  },
  {
    title: "Problemas em pavimentações",
    items: [
      { id: 1, name: "Buraco" },
      { id: 2, name: "Afundamento" },
      { id: 3, name: "Trincas" },
    ],
  },
];

const BUILDINGS = OPTIONS[0].items;
const PAVIMENTS = OPTIONS[1].items;

export { BUILDINGS, PAVIMENTS, OPTIONS };
