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
    public class BeerCategoriesController : ApiController
    {
        private BeerMeEntities db = new BeerMeEntities();

        // GET: api/BeerCategories
        public IQueryable<BeerCategory> GetBeerCategories()
        {
            return db.BeerCategories;
        }

        // GET: api/BeerCategories/5
        [ResponseType(typeof(BeerCategory))]
        public IHttpActionResult GetBeerCategory(int id)
        {
            BeerCategory beerCategory = db.BeerCategories.Find(id);
            if (beerCategory == null)
            {
                return NotFound();
            }

            return Ok(beerCategory);
        }

        // PUT: api/BeerCategories/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBeerCategory(int id, BeerCategory beerCategory)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != beerCategory.CategoryId)
            {
                return BadRequest();
            }

            db.Entry(beerCategory).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BeerCategoryExists(id))
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

        // POST: api/BeerCategories
        [ResponseType(typeof(BeerCategory))]
        public IHttpActionResult PostBeerCategory(BeerCategory beerCategory)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.BeerCategories.Add(beerCategory);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (BeerCategoryExists(beerCategory.CategoryId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = beerCategory.CategoryId }, beerCategory);
        }

        // DELETE: api/BeerCategories/5
        [ResponseType(typeof(BeerCategory))]
        public IHttpActionResult DeleteBeerCategory(int id)
        {
            BeerCategory beerCategory = db.BeerCategories.Find(id);
            if (beerCategory == null)
            {
                return NotFound();
            }

            db.BeerCategories.Remove(beerCategory);
            db.SaveChanges();

            return Ok(beerCategory);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BeerCategoryExists(int id)
        {
            return db.BeerCategories.Count(e => e.CategoryId == id) > 0;
        }
    }
}