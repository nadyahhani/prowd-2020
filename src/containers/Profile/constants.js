// examples on the landing page

const giniEx = [
  {
    gini: 0.894,
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0.1632245169886742, 1],
    insight:
      "The top 20% population of the class amounts to 100% cumulative number of properties.",
    class: "Disease - Q12136",
    desc: `This is an example of a class with a high Gini coefficient. 
            A class is considered to be heavily imbalanced when its Gini coefficient is more than 0.4.
            This example is bounded with a set of properties (P1542, P924, P2176, P780)`,
    link: "/Q12136/P1542-P924-P2176-P780",
    more: [
      {
        class: "programming language",
        link: "/Q9143"
      }
    ]
  },
  {
    gini: 0.235,
    data: [
      0,
      0.06196548584540732,
      0.13341999589493128,
      0.2145687835839355,
      0.30473819661173945,
      0.4054071122946808,
      0.5184807035456215,
      0.6464588519491182,
      0.7971148735059919,
      1
    ],
    insight:
      "The top 20% population of the class amounts to 47% cumulative number of properties.",
    class: "Human - Q5",
    desc: `This is an example of a class with a medium Gini coefficient.
    A class is considered to be imbalanced when its Gini coefficient is between 0.2 and 0.4.
      This example is unbounded and considers all properties of each entity to calculate the imbalance of the class`,
    link: "/Q5",
    more: [
      { class: "chemical element", link: "/Q11344" },
      { class: "virus", link: "/Q808" },
      {
        class: "infectious disease",
        link: "/Q18123741"
      }
    ]
  },
  {
    gini: 0.125,
    data: [
      0,
      0.09669438526561748,
      0.20032987423544774,
      0.30740155315785855,
      0.41756580303759194,
      0.5305477286784414,
      0.6469658442718713,
      0.767507387808398,
      0.8961583396330149,
      1
    ],
    insight:
      "The top 20% population of the class amounts to 23% cumulative number of properties.",
    class: "Country - Q6256",
    desc: `This is an example of a class with a low Gini coefficient. 
    A class is considered to be balanced when its Gini coefficient is less than 0.2.
      This example is unbounded and considers all properties of each entity to calculate the imbalance of the class`,
    link: "/Q6256",
    more: [
      { class: "doll", link: "/Q168658" },
      {
        class: "video",
        link: "/Q34508"
      },
      { class: "taxon", link: "/Q16521" }
    ]
  },
  { gini: null, data: null, insight: null, class: null, desc: "", link: null }
];

// property gap column config

const propertiesCol = [
  {
    width: 300,
    label: "Property",
    dataKey: "propertyLabel",
    linkKey: "propertyLink",
    link: true
  }
];

// entities column config

const columns = [
  {
    width: 100,
    label: "Percentile",
    dataKey: "percentile",
    numeric: true
  },
  {
    width: 280,
    label: "Entity",
    dataKey: "label",
    linkKey: "entityLink",
    link: true
  },
  {
    width: 100,
    label: "# of Properties",
    dataKey: "propertyCount",
    numeric: true
  }
];

export { propertiesCol, giniEx, columns };
