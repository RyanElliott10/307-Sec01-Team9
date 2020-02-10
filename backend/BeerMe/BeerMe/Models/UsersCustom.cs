using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BeerMe.Models
{
    public partial class Users
    {
        private static BeerMeEntities db = new BeerMeEntities();
        public static bool Login(UserLoginDetails details)
        {
            if(details.email.Length == 0 || details.password.Length == 0)
            {
                return false;
            }
            else
            {
                User dbUser = db.Users.Where(user => user.Email.Equals(details.email)).FirstOrDefault();
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