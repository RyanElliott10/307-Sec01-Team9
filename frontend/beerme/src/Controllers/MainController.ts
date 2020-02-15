import * as Constants from "../Utils/Constants";
import NetClient from "../Utils/NetClient.ts";

class MainController {
  static username = "";
  static password = "";

  static login(username: string, password: string) {
    // API call here
    console.log("MainController login");
    this.username = username;
    this.password = password;

    NetClient.post("http://httpbin.org/post", {
      username: username,
      password: password
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(console.log);
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
