using PMS.Data;
using PMS.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly PMSDBContext DBContext;
        public ProductRepository(PMSDBContext pMSDBContext) {
            DBContext = pMSDBContext;
        }

        public async Task<bool> CreateProduct(Product product)
        {
            try
            {
                DBContext.Product.Add(product);
                DBContext.SaveChanges();
                return true;
            }
            catch {
                return false;
            }
        }

        public async Task<List<Product>> FetchProductsByCategory(int CategoryId, int SubCategoryId)
        {
            return DBContext.Product.Where(x=>x.SubCategoryId == SubCategoryId && x.CategoryId == CategoryId).ToList();
        }

        public async Task<List<Product>> GetAllProducts()
        {
            return DBContext.Product.ToList();
        }

        public async Task<bool> UpdateProduct(Product product)
        {
            try
            {
                var products = await GetAllProducts();
                var existing =  products.FirstOrDefault(x => x.ProductId == product.ProductId);
                if (existing!=null)
                {
                    DBContext.Entry(existing).CurrentValues.SetValues(product);
                    DBContext.SaveChanges();
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }
        }
    }
}
