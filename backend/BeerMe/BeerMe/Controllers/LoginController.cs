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

            // User is verified otherwise new user is being created
            if(isLoginSuccessful)
            {
                var loggedInUser = new
                {
                    Id = dbUser.Id,
                    Name = dbUser.Name,
                    Email = dbUser.Email,
                    IsBusiness = dbUser.IsBusiness,
                    BusinessName = dbUser.BusinessName,
                    BeerRatings = dbUser.BeerRatings.Select(rating =>
                    new
                    { 
                    Id = rating.Id,
                    UserId = rating.UserId,
                    BeerId = rating.BeerId,
                    Rating = rating.Rating
                    }),


                };
                return Ok(loggedInUser);
            }
            return Ok(new User());

        }
    }
}
