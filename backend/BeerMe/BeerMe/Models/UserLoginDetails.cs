using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BeerMe.Models
{
    public class UserLoginDetails
    {
        public String email;
        public String password;

        public UserLoginDetails(String email,String password)
        {
            this.email = email;
            this.password = password;
        }
    }
}