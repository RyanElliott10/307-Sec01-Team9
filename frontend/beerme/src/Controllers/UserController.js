import * as Constants from "../Utils/Constants";
import NetClient from "../Utils/NetClient";

class UserController {
  static email = "";
  static password = "";

  static async login(email, password) {
    console.log(`MainController: login ${email} ${password}`);
    this.email = email;
    this.password = password;

    const data = {
      email: email,
      password: password
    };

    let retValue = null;
    NetClient.post("http://httpbin.org/post", data).then(data =>
      console.log(data)
    );

    retValue =
      email === Constants.DUMMY_LOGIN_EMAIL &&
      password === Constants.DUMMY_LOGIN_PASSWORD;
    return retValue;
  }

  static async createAccount(
    firstName,
    lastName,
    email,
    password,
    isBusiness = false,
    businessName = ""
  ) {
    this.email = email;
    this.password = password;

    const data = {
      name: `${firstName} ${lastName}`,
      email: email,
      password: password,
      isBusiness: isBusiness,
      businessName: businessName
    };

    let retValue = null;
    NetClient.post("https://localhost:44300/api/users", data).then(data =>
      console.log(data)
    );

    retValue =
      email === Constants.DUMMY_LOGIN_EMAIL &&
      password === Constants.DUMMY_LOGIN_PASSWORD;
    return retValue;
  }

  static async addBeer(data) {
    console.log(data);
  }

  static getCurrentUser() {
    return (
      this.email === Constants.DUMMY_LOGIN_EMAIL &&
      this.password === Constants.DUMMY_LOGIN_PASSWORD
    );
  }

  static isBusiness() {
    return true;
  }
}

export default UserController;
