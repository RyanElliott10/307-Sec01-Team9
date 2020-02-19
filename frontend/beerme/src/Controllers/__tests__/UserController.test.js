import UserController from "../UserController";

test("invalid email with a valid passowrd to login", async () => {
    const value = await UserController.login("wrong-email", "password123");
    expect(value).toBeFalsy();
});

test("valid email with an invalid passowrd to login", async () => {
    const value = await UserController.login("test@gmail.com", "Password123");
    expect(value).toBeFalsy();
});

test("valid email with a valid passowrd to login", async () => {
    const value = await UserController.login("test@gmail.com", "password123");
    expect(value).toBeTruthy();
});

// This isn't a valid test since the return data is dummy data. Should eventually
// return a user object.
test("getCurrentUser returns true when the correct user is logged in", async () => {
    await UserController.login("test@gmail.com", "password123")
    const currentUser = UserController.getCurrentUser();
    expect(currentUser).toBeTruthy();
});
