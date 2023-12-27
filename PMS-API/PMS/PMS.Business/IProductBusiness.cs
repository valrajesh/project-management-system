using PMS.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Business
{
    public interface IProductBusiness
    {
        Task<List<Product>> GetProducts(int CategoryId, int SubCategoryId);
        Task<BusinessResult<Product>> CreateProduct(Product product);
        Task<BusinessResult<Product>> UpdateProduct(Product product);
    }
}
