using API.DAL.Services;
using API.DAL.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly IProductsService productsService;

        public ProductsController(IProductsService productsService)
        {
            this.productsService = productsService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> Products_List()
        {
            var Products = await productsService.Products_List();
            return Ok(Products);
        }

        [HttpGet("{Id}")]
        public async Task<ActionResult<Product>> Product_Get_By_Id(int Id)
        {
            var Product = await productsService.Product_By_ID(Id);
            return Ok(Product);
        }

    }
}
