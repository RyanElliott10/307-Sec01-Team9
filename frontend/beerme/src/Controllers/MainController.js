import * as Constants from "../Utils/Constants";

class MainController {
  static username = "";
  static password = "";

  static login(username, password) {
    // API call here
    console.log("MainController login");
    this.username = username;
    this.password = password;
    return (
      username === Constants.DUMMY_LOGIN_EMAIL &&
      password === Constants.DUMMY_LOGIN_PASSWORD
    );
  }

  static getCurrentUser() {
    console.log("getCurrentUser");
    return (
      this.username === Constants.DUMMY_LOGIN_EMAIL &&
      this.password === Constants.DUMMY_LOGIN_PASSWORD
    );
  }
}

export default MainController;
