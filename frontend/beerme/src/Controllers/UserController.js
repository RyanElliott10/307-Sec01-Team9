import NetClient from "../Utils/NetClient";

class UserController {
  static firstName = "";
  static lastName = "";
  static email = "";
  static password = "";
  static isBusiness = false;
  static businessName = "";
  static currBeer = "";
  static currABV = "";
  static currIBU = "";
  static currStyle = "";
  static currBeerId = 0;
  static userId = 0;

  static isLoggedIn = false;
  static cachedBeers = [];
  static beerRatings = [];

  // {
  //   Id:
  //   UserId:
  //   BeerId:
  //   Rating:
  // }

  static assignLoginData(data) {
    if (data && data.Name) {
      this.userId = data.Id;
      this.firstName = data.Name.split(" ")[0];
      this.lastName = data.Name.split(" ")[1];
      this.email = data.Email;
      this.isBusiness = data.IsBusiness;
      this.businessName = data.BusinessName;
      this.isLoggedIn = true;
      this.beerRatings = data.BeerRatings;
      return this.isLoggedIn;
    } else {
      this.isLoggedIn = false;
      return this.isLoggedIn;
    }
  }

  static async login(email, password) {
    console.log(`UserController: login ${email} ${password}`);
    this.email = email;
    this.password = password;

    const data = {
      email: email,
      password: password
    };

    return NetClient.post(
      "https://localhost:44300/api/login",
      data
    ).then(data => this.assignLoginData(data));
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

    return NetClient.post(
      "https://localhost:44300/api/users",
      data
    ).then(data => this.assignLoginData(data));
  }

  static getCurrentUserObject() {
    return {
      Id: this.userId,
      Name: `${this.firstName} ${this.lastName}`,
      Email: this.email,
      Password: this.password,
      IsBusiness: this.isBusiness,
      BusinessName: this.businessName
    };
  }

  static getCurrentUser() {
    return this.isLoggedIn;
  }

  static async fetchAllBeers() {
    NetClient.get("https://localhost:44300/api/beers").then(data => {
      this.cachedBeers = data;
    });
  }

  static logout() {
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.password = "";
    this.isBusiness = false;
    this.businessName = "";
    this.currBeer = "";
    this.currABV = "";
    this.currIBU = "";
    this.currStyle = "";
    this.currBeerId = 0;
    this.userId = 0;

    this.isLoggedIn = false;
  }

  static addToRatedBeers(data) {
    this.beerRatings.push(data);
  }
}

export default UserController;
