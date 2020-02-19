using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using BeerMe.Models;
using BeerMe.Controllers;
using System.Collections.Generic;

namespace BeerMe.Tests
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestLoginSuccessful()
        {
            User mockUser = new User();
            mockUser.Email = "testUser@gmail.com";
            mockUser.Password = "test123";
            UserLoginDetails details = new UserLoginDetails("testUser@gmail.com", "test123");
            bool isLoginSuccessful = User.Login(details, mockUser);
            Assert.IsTrue(isLoginSuccessful);

        }

        [TestMethod]
        public void TestGetUsersController()
        {
            UsersController userController = new UsersController();
            List <User> allUsers = new List<User>();
            User user = new User();
            user.Email = "testUser@gmail.com";
            user.Password = "test123";
            user.IsBusiness = false;
            user.Id = 1;
            allUsers.Add(user);
            var expectedAllUsers = userController.GetUsers();
            Assert.AreEqual(allUsers, expectedAllUsers);

        }
    }
}
