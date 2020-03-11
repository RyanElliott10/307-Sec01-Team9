using BeerMe.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BeerMe.Controllers
{
    public class BeersByBusinessController : ApiController
    {
        private BeerMeEntities db = new BeerMeEntities();

        public IHttpActionResult GetBeersByBusiness(int id)
        {
            var beersById = db.Beers.Where(beer => beer.UserId == id).Select(beer => new
            {
                Id = beer.Id,
                BeerName = beer.BeerName,
                Style = beer.BeerStyle.Style,
                ABV = beer.BeerStyle.ABV,
                IBU = beer.BeerStyle.IBU
            }).ToList();

            return Ok(beersById);
        }
    }
}
