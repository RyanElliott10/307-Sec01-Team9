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
    public class BeerStylesController : ApiController
    {
        private BeerMeEntities db = new BeerMeEntities();

        // GET: api/BeerStyles
        public IHttpActionResult GetBeerStyles()
        {
            var styles = db.BeerStyles.Select(style =>
           new
           {
               Id = style.Id,
               Style = style.Style,
               CategoryName = style.BeerCategory.CategoryName
           }).ToList();

            return Ok(styles);
        }

        // GET: api/BeerStyles/5
        [ResponseType(typeof(BeerStyle))]
        public IHttpActionResult GetBeerStyle(int id)
        {
            var styleById = db.BeerStyles.Where(style => style.Id == id).Select(style =>
          new
          {
              Id = style.Id,
              Style = style.Style,
              CategoryName = style.BeerCategory.CategoryName
          });

                if(styleById == null)
            {
                return NotFound();
            }

            return Ok(styleById);
        }

        // PUT: api/BeerStyles/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBeerStyle(int id, BeerStyle beerStyle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != beerStyle.Id)
            {
                return BadRequest();
            }

            db.Entry(beerStyle).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BeerStyleExists(id))
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

        // POST: api/BeerStyles
        [ResponseType(typeof(BeerStyle))]
        public IHttpActionResult PostBeerStyle(BeerStyle beerStyle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.BeerStyles.Add(beerStyle);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (BeerStyleExists(beerStyle.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = beerStyle.Id }, beerStyle);
        }

        // DELETE: api/BeerStyles/5
        [ResponseType(typeof(BeerStyle))]
        public IHttpActionResult DeleteBeerStyle(int id)
        {
            BeerStyle beerStyle = db.BeerStyles.Find(id);
            if (beerStyle == null)
            {
                return NotFound();
            }

            db.BeerStyles.Remove(beerStyle);
            db.SaveChanges();

            return Ok(beerStyle);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BeerStyleExists(int id)
        {
            return db.BeerStyles.Count(e => e.Id == id) > 0;
        }
    }
}