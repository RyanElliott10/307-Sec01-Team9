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
    public class BeerRatingsController : ApiController
    {
        private BeerMeEntities db = new BeerMeEntities();

        // GET: api/BeerRatings
        //public IQueryable<BeerRating> GetBeerRatings()
        //{
        //    return db.BeerRatings;
        //}

        // GET: api/BeerRatings/5
        [ResponseType(typeof(BeerRating))]

       //Here the id parameter represents the BeerId passed in by the client
       //Finds the average ratings across all users for that particular beer
        public IHttpActionResult GetAverageBeerRating(int id)
        {
            int beerId = id;
            List<BeerRating> allRatings = db.BeerRatings.Where(beerRating => beerRating.BeerId == beerId).ToList();
            if (allRatings.Count() == 0 )
            {
                //returning null
                return Ok((Object)null);
            }
            else
            {
                return Ok(allRatings.Average(beerRating => beerRating.Rating));
            }
            //if (beerRating == null)
            //{
            //    return NotFound();
            //}

            //return Ok(averageBeerRating);
        }

        // PUT: api/BeerRatings/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBeerRating(int id, BeerRating beerRating)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != beerRating.Id)
            {
                return BadRequest();
            }

            db.Entry(beerRating).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BeerRatingExists(id))
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

        // POST: api/BeerRatings
        [ResponseType(typeof(BeerRating))]
        public IHttpActionResult PostBeerRating(BeerRating beerRating)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.BeerRatings.Add(beerRating);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = beerRating.Id }, beerRating);
        }

        // DELETE: api/BeerRatings/5
        [ResponseType(typeof(BeerRating))]
        public IHttpActionResult DeleteBeerRating(int id)
        {
            BeerRating beerRating = db.BeerRatings.Find(id);
            if (beerRating == null)
            {
                return NotFound();
            }

            db.BeerRatings.Remove(beerRating);
            db.SaveChanges();

            return Ok(beerRating);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BeerRatingExists(int id)
        {
            return db.BeerRatings.Count(e => e.Id == id) > 0;
        }
    }
}