using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BeerMe.Models
{
    public partial class User
    {
        private static BeerMeEntities db = new BeerMeEntities();

        public List<int> findRecommendedBeers()
        {
            var userBeerRatings = db.BeerRatings.Where(ratings => ratings.UserId == this.Id && ratings.Rating >= 3.5).ToList();
            this.BeerRatings = userBeerRatings;
            List<int> beersRatedByUser = this.BeerRatings.Select(beerRating => beerRating.BeerId).ToList();
            if (beersRatedByUser.Count == 0)
            {
                return new List<int>();
            }
            int averageBeersId = (int)beersRatedByUser.Average();
            int beerStartIndex = 1;
            int beerEndIndex = 111;
            int currentBeerForwardIndex = averageBeersId + 1;
            int currentBeerBackwardIndex = averageBeersId - 1;
            List<int> reccomendedBeerIds = new List<int>();
            int noOfReccomendedBeers;
            if (!beersRatedByUser.Contains(averageBeersId))
            {
                reccomendedBeerIds.Add(averageBeersId);
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
                    reccomendedBeerIds.Add(currentBeerForwardIndex);
                    noOfReccomendedBeers += 1;
                }
                if(noOfReccomendedBeers >= 5)
                {
                    break;
                }
                if (!beersRatedByUser.Contains(currentBeerBackwardIndex))
                {
                    reccomendedBeerIds.Add(currentBeerBackwardIndex);
                    noOfReccomendedBeers += 1;
                }

                currentBeerForwardIndex += 1;
                currentBeerBackwardIndex -= 1;


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