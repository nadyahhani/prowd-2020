// examples on the landing page

const giniEx = [
  {
    gini: 0.894,
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0.16366065464261856, 1],
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
      0.04449827615668379,
      0.10370701699719562,
      0.17194708856433505,
      0.24943459949541147,
      0.3355815332656528,
      0.4317297737392825,
      0.5397891181762441,
      0.662076452199785,
      0.8061002945108406,
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
      0.024738219895287957,
      0.11393979057591623,
      0.21230366492146596,
      0.3138743455497382,
      0.41852094240837695,
      0.5258507853403142,
      0.6361910994764398,
      0.7505235602094241,
      0.8716623036649215,
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
