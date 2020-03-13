using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BeerMe.Models
{
    public partial class User
    {
        private static BeerMeEntities db = new BeerMeEntities();

        public List<int> FindRecommendedBeers()
        {
            var userBeerRatings = db.BeerRatings.Where(ratings => ratings.UserId == this.Id).ToList();
            this.BeerRatings = userBeerRatings;
            List<int> beersRatedByUser = this.BeerRatings.Select(beerRating => beerRating.Beer.StyleId).ToList();
            if (beersRatedByUser.Count == 0)
            {
                return new List<int>();
            }
            
            int averageBeersId = (int)(userBeerRatings.Where(ratings => ratings.Rating >= 3).Select(beerRating => beerRating.Beer.StyleId).Average());
            int beerStartIndex = 1;
            int beerEndIndex = 111;
            int currentBeerForwardIndex = averageBeersId + 1;
            int currentBeerBackwardIndex = averageBeersId - 1;
            List<int> reccomendedBeerStyleIds = new List<int>();
            int noOfReccomendedBeers;
            if (!beersRatedByUser.Contains(averageBeersId))
            {
                reccomendedBeerStyleIds.Add(averageBeersId);
                noOfReccomendedBeers = 1;
            }
            else
            {
                noOfReccomendedBeers = 0;
            }
            
            while(currentBeerBackwardIndex >= beerStartIndex && currentBeerForwardIndex <= beerEndIndex && noOfReccomendedBeers < 5)
            {
                if (!beersRatedByUser.Contains(currentBeerForwardIndex))
                {
                    reccomendedBeerStyleIds.Add(currentBeerForwardIndex);
                    noOfReccomendedBeers += 1;
                }
                if(noOfReccomendedBeers >= 5)
                {
                    break;
                }
                if (!beersRatedByUser.Contains(currentBeerBackwardIndex))
                {
                    reccomendedBeerStyleIds.Add(currentBeerBackwardIndex);
                    noOfReccomendedBeers += 1;
                }

                currentBeerForwardIndex += 1;
                currentBeerBackwardIndex -= 1;


            }

            List <int>reccomendedBeerIds = new List<int>();
            foreach(int styleId in reccomendedBeerStyleIds)
            {
                List<int> beerIdsByStyle = db.Beers.Where(beer => beer.StyleId == styleId).Select(beer => beer.Id).Take(2).ToList();
                foreach (int beerId in beerIdsByStyle) {
                    reccomendedBeerIds.Add(beerId);
                }
            }

            return reccomendedBeerIds;
        }
        public static bool Login(UserLoginDetails details,User dbUser)
        {
            if(details.email.Length == 0 || details.password.Length == 0)
            {
                return false;
            }
            else
            {
                if(dbUser == null)
                {
                    return false;
                }
                else
                {
                    if (dbUser.Password.Equals(details.password))
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            }
        }
    }
}