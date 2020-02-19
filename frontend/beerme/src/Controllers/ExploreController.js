class ExploreController {
  static getPages() {
    return [
      {
        title: "Preferred Notes",
        description:
          "This is where the explanation of what a note is in beer lives.",
        checkboxes: null
      },
      {
        title: "Color",
        description:
          "This is where the user would select their preferred colors.",
        checkboxes: null
      }
    ];
  }
}

export default ExploreController;
