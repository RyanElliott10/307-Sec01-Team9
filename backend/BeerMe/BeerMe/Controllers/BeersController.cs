using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using BeerMe.Models;

namespace BeerMe.Controllers
{
    public class BeersController : ApiController
    {
        private BeerMeEntities db = new BeerMeEntities();

        // GET: api/Beers
        public IHttpActionResult GetBeers()
        {
            var beers = db.Beers.Select(beer => new { 
                Id = beer.Id,
                BeerName = beer.BeerName,
                Style = beer.BeerStyle.Style,
                ABV = beer.BeerStyle.ABV,
                IBU = beer.BeerStyle.IBU
            });
            return Ok(beers);
        }

        // GET: api/Beers/5
        [ResponseType(typeof(Beer))]
        public IHttpActionResult GetBeer(int id)
        {
            var beerById = db.Beers.Where(beer => beer.Id == id).Select(beer => new {
                Id = beer.Id,
                BeerName = beer.BeerName,
                Style = beer.BeerStyle.Style,
                ABV = beer.BeerStyle.ABV,
                IBU = beer.BeerStyle.IBU
            }).FirstOrDefault();

            if (beerById == null)
            {
                return NotFound();
            }

            return Ok(beerById);
        }

        // PUT: api/Beers/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBeer(int id, Beer beer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != beer.Id)
            {
                return BadRequest();
            }

            db.Entry(beer).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BeerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Beers
        [ResponseType(typeof(Beer))]
        public IHttpActionResult PostBeer(Beer beer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Beers.Add(beer);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (BeerExists(beer.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = beer.Id }, beer);
        }

        // DELETE: api/Beers/5
        [ResponseType(typeof(Beer))]
        public IHttpActionResult DeleteBeer(int id)
        {
            Beer beer = db.Beers.Find(id);
            if (beer == null)
            {
                return NotFound();
            }

            db.Beers.Remove(beer);
            db.SaveChanges();

            return Ok(beer);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BeerExists(int id)
        {
            return db.Beers.Count(e => e.Id == id) > 0;
        }
    }
}