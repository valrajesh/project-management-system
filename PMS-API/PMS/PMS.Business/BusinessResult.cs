using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace PMS.Business
{
    public class BusinessResult<T> where T: class
    {
        public BusinessResult() {
            ModelStateDictionary = new ModelStateDictionary();
        }
        public T Result { get; set; }

        public ModelStateDictionary ModelStateDictionary { get; set; }
    }
}
