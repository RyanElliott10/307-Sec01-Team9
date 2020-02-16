import * as Constants from "../Utils/Constants";
import NetClient from "../Utils/NetClient";

class MainController {
  static email = "";
  static password = "";

  static async login(email, password) {
    console.log(`MainController: login ${email, password}`);
    this.email = email;
    this.password = password;

    const data = {
      email: email,
      password: password
    };

    let retValue = null;
    NetClient.post("http://httpbin.org/post", data)
      .then(res => res.json())
      .then(data => console.log(data));

    retValue =
      email === Constants.DUMMY_LOGIN_EMAIL &&
      password === Constants.DUMMY_LOGIN_PASSWORD;
    return retValue;
  }

  static getCurrentUser() {
    console.log("getCurrentUser");
    return (
      this.email === Constants.DUMMY_LOGIN_EMAIL &&
      this.password === Constants.DUMMY_LOGIN_PASSWORD
    );
  }
}

export default MainController;
