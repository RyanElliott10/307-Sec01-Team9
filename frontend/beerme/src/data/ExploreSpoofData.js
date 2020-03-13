export default class ExploreSpoofData {
  static getSpoofData() {
    return [
      {
        id: 0,
        title: "Colors",
        description: "Select your preferred color of beer.",
        checkboxes: [
          {
            id: 1,
            type: "color",
            option: "Light Yellow",
            value: [1, 1.5],
            isChecked: false
          },
          {
            id: 2,
            type: "color",
            option: "Straw",
            value: [2, 3],
            isChecked: false
          },
          {
            id: 3,
            type: "color",
            option: "Pale",
            value: [4, 4],
            isChecked: false
          },
          {
            id: 4,
            type: "color",
            option: "Gold",
            value: [5, 6],
            isChecked: false
          },
          {
            id: 5,
            type: "color",
            option: "Light Amber",
            value: [7, 7],
            isChecked: false
          },
          {
            id: 6,
            type: "color",
            option: "Amber",
            value: [8, 8],
            isChecked: false
          },
          {
            id: 7,
            type: "color",
            option: "Medium Amber",
            value: [9, 9],
            isChecked: false
          },
          {
            id: 8,
            type: "color",
            option: "Copper",
            value: [10, 12],
            isChecked: false
          },
          {
            id: 9,
            type: "color",
            option: "Light Brown",
            value: [13, 15],
            isChecked: false
          },
          {
            id: 10,
            type: "color",
            option: "Saddle Brown",
            value: [16, 17],
            isChecked: false
          },
          {
            id: 11,
            type: "color",
            option: "Brown",
            value: [18, 24],
            isChecked: false
          },
          {
            id: 12,
            type: "color",
            option: "Dark Brown",
            value: [25, 39],
            isChecked: false
          },
          {
            id: 13,
            type: "color",
            option: "Black",
            value: [40, 100],
            isChecked: false
          }
        ]
      },
      {
        id: 1,
        title: "Bitterness (IBU)",
        description: "A gauge of your preferred beer bitterness.",
        checkboxes: [
          {
            id: 1,
            type: "ibu",
            option: "Restrained (0-20)",
            value: [0, 20],
            isChecked: false
          },
          {
            id: 2,
            type: "ibu",
            option: "Moderate (21-40)",
            value: [21, 40],
            isChecked: false
          },
          {
            id: 3,
            type: "ibu",
            option: "Aggressive (41-60)",
            value: [41, 60],
            isChecked: false
          },
          {
            id: 4,
            type: "ibu",
            option: "Harsh (60-100)",
            value: [61, 100],
            isChecked: false
          }
        ]
      },
      {
        id: 2,
        title: "Alcohol by Volume (ABV)",
        description:
          "Alcohol by volume is used to measure the alcohol content of beer, wine, distilled spirits, and other alcoholic beverages.",
        checkboxes: [
          {
            id: 1,
            type: "abv",
            option: "Restrained (1-3%)",
            value: [1, 3],
            isChecked: false
          },
          {
            id: 2,
            type: "abv",
            option: "Mild (4-6%)",
            value: [4, 6],
            isChecked: false
          },
          {
            id: 3,
            type: "abv",
            option: "Moderate (7-9%)",
            value: [7, 9],
            isChecked: false
          },
          {
            id: 4,
            type: "abv",
            option: "Strong (10-12%)",
            value: [10, 12],
            isChecked: false
          },
          {
            id: 5,
            type: "abv",
            option: "Harsh (13-15%)",
            value: [13, 15],
            isChecked: false
          }
        ]
      }
    ];
  }
}
