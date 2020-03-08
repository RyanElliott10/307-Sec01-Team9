import * as Constants from "../Utils/Constants";
import NetClient from "../Utils/NetClient";

class UserController {
  static firstName = "";
  static lastName = "";
  static email = "";
  static password = "";
  static isBusiness = true; // change to default of false once live
  static businessName = "";

  static async login(email, password) {
    console.log(`UserController: login ${email} ${password}`);
    this.email = email;
    this.password = password;

    const data = {
      email: email,
      password: password
    };

    let retValue = null;
    NetClient.post("http://httpbin.org/post", data).then(data => {
      if (data.Name) {
        this.firstName = data.Name.split(" ")[0];
        this.lastName = data.Name.split(" ")[1];
        this.email = data.Email;
        this.isBusiness = data.IsBusiness;
        this.businessName = data.businessName;
      }
    });

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
    NetClient.post("https://localhost:44300/api/users", data).then(data => {
      if (data) {
        this.firstName = data.Name.split(" ")[0];
        this.lastName = data.Name.split(" ")[1];
        this.email = data.Email;
        this.isBusiness = data.IsBusiness;
        this.businessName = data.businessName;
      }
    });

    retValue =
      email === Constants.DUMMY_LOGIN_EMAIL &&
      password === Constants.DUMMY_LOGIN_PASSWORD;
    return retValue;
  }

  static getCurrentUser() {
    return (
      this.email === Constants.DUMMY_LOGIN_EMAIL &&
      this.password === Constants.DUMMY_LOGIN_PASSWORD
    );
  }
}

export default UserController;