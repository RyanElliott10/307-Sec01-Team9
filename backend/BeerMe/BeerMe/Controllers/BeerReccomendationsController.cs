using BeerMe.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BeerMe.Controllers
{
    public class BeerRecommendationsController : ApiController
    {
        private BeerMeEntities db = new BeerMeEntities();

        public IHttpActionResult PostUserForBeerReccomendations(User user)
        {
            return Ok(user.findRecommendedBeers());
        }

    }
}
