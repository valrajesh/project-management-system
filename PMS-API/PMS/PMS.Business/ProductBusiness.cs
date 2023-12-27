using PMS.Model;
using PMS.Repository;

namespace PMS.Business
{
    public class ProductBusiness : IProductBusiness
    {
        private readonly IProductRepository _productRepository;
        public ProductBusiness(IProductRepository productRepository) { 
            _productRepository = productRepository;
        }
        private async Task<BusinessResult<Product>> ValidateProduct(Product product)
        {
            var validatedresult = new BusinessResult<Product>();
            if(product == null)
            {
                validatedresult.ModelStateDictionary.AddModelError("E101","Product is Null");
                return validatedresult;
            }
            if (string.IsNullOrEmpty(product.ProductName))
            {
                validatedresult.ModelStateDictionary.AddModelError("E102", "ProductName can't be Null or Empty");
                return validatedresult;
            }
            if (product.CategoryId <1 || product.SubCategoryId<1)
            {
                validatedresult.ModelStateDictionary.AddModelError("E103", "Invalid Category or SubCategory Selected");
                return validatedresult;
            }
            if (product.Price < 1)
            {
                validatedresult.ModelStateDictionary.AddModelError("E104", "Price is not valid");
                return validatedresult;
            }
           
            
            validatedresult.Result = product;
            return validatedresult;
        }
        public async Task<BusinessResult<Product>> CreateProduct(Product product)
        {
            var validatedProduct = await ValidateProduct(product);
            var products = await _productRepository.GetAllProducts();
            if (products.Exists(x => x.ProductName == product.ProductName))
            {
                validatedProduct.ModelStateDictionary.AddModelError("E105", "Product with same Name exists");
                return validatedProduct;
            }
            if (products.Exists(x => x.ProductCode == product.ProductCode))
            {
                validatedProduct.ModelStateDictionary.AddModelError("E106", "Product with same Code exists");
                return validatedProduct;
            }
            if (validatedProduct.ModelStateDictionary.IsValid)
            {
                await _productRepository.CreateProduct(product);
            }
            return validatedProduct;
        }

        public Task<List<Product>> GetProducts(int CategoryId, int SubCategoryId)
        {
            return _productRepository.FetchProductsByCategory(CategoryId, SubCategoryId);
        }

        public async Task<BusinessResult<Product>> UpdateProduct(Product product)
        {
            var validatedProduct =  await ValidateProduct(product);
            if (validatedProduct.ModelStateDictionary.IsValid)
            {
                await _productRepository.UpdateProduct(product);
                return validatedProduct;
            }
            return validatedProduct;
        }
    }
}