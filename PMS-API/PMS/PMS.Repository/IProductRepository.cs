using PMS.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Repository
{
    public interface IProductRepository
    {
        Task<List<Product>> FetchProductsByCategory(int CategoryId, int SubCategoryId);
        Task<bool> CreateProduct(Product product);
        Task<List<Product>> GetAllProducts();
        Task<bool> UpdateProduct(Product product);
    }
}
