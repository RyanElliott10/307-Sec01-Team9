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
            bool isLoginSuccessful = Users.Login(details);
            return Ok(isLoginSuccessful);
        }
    }
}
