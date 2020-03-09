using BeerMe.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;


namespace BeerMe.Controllers
{
    public class LoginController : ApiController
    {
        private BeerMeEntities db = new BeerMeEntities();
        public IHttpActionResult LoginValidation(UserLoginDetails details)
        {
            User dbUser = db.Users.Where(user => user.Email.Equals(details.email)).FirstOrDefault();
            bool isLoginSuccessful = Models.User.Login(details, dbUser);
            if(isLoginSuccessful)
            {
                return Ok(dbUser);
            }
            return Ok(new User());

        }
    }
}
