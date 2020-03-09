using BeerMe.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BeerMe.Controllers
{
    public class ExploreBeerStylesController : ApiController
    {
        private BeerMeEntities db = new BeerMeEntities();

        public IHttpActionResult PostBeerStylesToExplore(ExploreFilters filter)
        {
            var beerStylesToExplore = db.BeerStyles.Where(style => (style.ColorValue >= filter.ColorStart && style.ColorValue <= filter.ColorEnd)
            && ((style.IBU >= filter.IBUStart && style.IBU <= filter.IBUEnd) || (style.ABV >= filter.ABVStart && style.ABV <= filter.ABVEnd))).Select(style =>
            new
            {
                StyleName = style.Style,
                StyleCategory = style.BeerCategory.CategoryName,
                BeerName = style.Beers.FirstOrDefault().BeerName,
                BeerId = style.Beers.FirstOrDefault().Id,
                ABV = style.ABV,
                IBU = style.IBU,
                Color = style.ColorValue
            });

            return Ok(beerStylesToExplore);
        }
    }
}
