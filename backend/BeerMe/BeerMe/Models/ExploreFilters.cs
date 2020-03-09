using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BeerMe.Models
{
    public class ExploreFilters
    {
        public int ColorStart { get; set; }
        public int ColorEnd { get; set; }

        public int ABVStart { get; set; }

        public int ABVEnd { get; set; }

        public int IBUStart { get; set; }

        public int IBUEnd { get; set; }


    }
}