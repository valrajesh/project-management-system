using Microsoft.AspNetCore.Mvc;
using PMS.Business;
using PMS.Model;

namespace PMS.Web.Controllers
{
    [Route("/api")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductBusiness _productBusiness;
        public ProductController(IProductBusiness productBusiness)
        {
            _productBusiness = productBusiness;
        }
        [HttpGet]
        [Route("GetProducts")]
        public async Task<IActionResult> GetProducts(int CategoryId, int SubCategoryId)
        {
            var result = await _productBusiness.GetProducts(CategoryId, SubCategoryId);
            return Ok(result);
        }
        [HttpPost]
        [Route("CreateProduct")]
        public async Task<IActionResult> CreateProduct(Product product)
        {
            var result = await _productBusiness.CreateProduct(product);
            if(result.ModelStateDictionary.Count> 0)
            {
                return BadRequest(result.ModelStateDictionary.Values.Select(x => x.Errors).Select(x => x.Select(y => y.ErrorMessage)).FirstOrDefault());
            }
            return Ok(result.Result);
        }
        [HttpPut]
        [Route("UpdateProduct")]
        public async Task<IActionResult> UpdateProduct(Product product)
        {
            var result = await _productBusiness.UpdateProduct(product);
            if (result.ModelStateDictionary.Count > 0)
            {
                return BadRequest(result.ModelStateDictionary.Values.Select(x => x.Errors).Select(x => x.Select(y => y.ErrorMessage)).FirstOrDefault());
            }
            return Ok(result.Result);
        }

    }
}
