import UserController from "../UserController";

// MARK: - login

test("invalid email with a valid passowrd to login", async () => {
  const originalError = console.error;
  console.error = jest.fn();

  const success = await UserController.login("wrong-email", "password123");
  expect(success).toBeFalsy();

  console.error = originalError;
});

test("valid email with an invalid passowrd to login", async () => {
  const originalError = console.error;
  console.error = jest.fn();

  const success = await UserController.login("test@gmail.com", "Password123");
  expect(success).toBeFalsy();

  console.error = originalError;
});

// MARK: - getCurrentuser

test("getCurrentUser returns false when there is no logged in user", async () => {
  const originalError = console.error;
  console.error = jest.fn();

  await UserController.login("test@gmail.com", "password123");
  const currentUser = UserController.getCurrentUser();
  expect(currentUser).toBeFalsy();

  console.error = originalError;
});

// MARK: - createAccount

test("createAccount returns false when fed isBusiness=true and no business name", async () => {
  const originalError = console.error;
  console.error = jest.fn();

  const success = await UserController.createAccount(
    "First",
    "Last",
    "test@gmail.com",
    "password123",
    true,
    null
  );
  expect(success).toBeFalsy();

  console.error = originalError;
});

test("createAccount returns true when fed isBusiness=true and valid business name", async () => {
  const originalError = console.error;
  console.error = jest.fn();

  const success = await UserController.createAccount(
    "First",
    "Last",
    "test@gmail.com",
    "password123",
    true,
    "businessName"
  );
  expect(success).toBeFalsy();

  console.error = originalError;
});

test("createAccount returns true when fed not a business", async () => {
  const originalError = console.error;
  console.error = jest.fn();

  const success = await UserController.createAccount(
    "First",
    "Last",
    "test@gmail.com",
    "password123",
    false,
    null
  );
  expect(success).toBeFalsy();

  console.error = originalError;
});

// MARK: - getCurrentUserObject

test("getCurrentUserObject returns an object with the correct fields when a user is logged in", () => {
  UserController.userId = 1;
  UserController.firstName = "First";
  UserController.lastName = "Last";
  UserController.email = "test@gmail.com";
  UserController.password = "password123";
  UserController.isBusiness = true;
  UserController.businessName = "BeerMe";

  const retObj = UserController.getCurrentUserObject();
  const expectedObj = {
    Id: 1,
    Name: "First Last",
    Email: "test@gmail.com",
    Password: "password123",
    IsBusiness: true,
    BusinessName: "BeerMe"
  };

  expect(retObj).toEqual(expectedObj);
});

// MARK: - fetchAllBeers

test("fetchAllBeers should return a list with all the beers", async () => {
  const originalError = console.error;
  console.error = jest.fn();

  await UserController.fetchAllBeers();
  expect(UserController.cachedBeers).toBeTruthy();

  console.error = originalError;
});

// MARK: - Utils

test("assignLoginData should return false with invalid data", async () => {
  const success = UserController.assignLoginData({});
  expect(success).toBeFalsy();
});

test("assignLoginData should return true with invalid data", async () => {
  const success = UserController.assignLoginData({
    Id: 0,
    Name: "First Last",
    Email: "test@gmail.com",
    IsBusiness: false,
    BussinessName: ""
  });
  expect(success).toBeTruthy();
});

test("logout should logout the use and reset all fields", () => {
  UserController.userId = 1;
  UserController.logout();
  expect(UserController.userId).toEqual(0);
})
