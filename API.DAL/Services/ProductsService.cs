using API.Data;
using API.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.DAL.Services
{
    public class ProductsService : IProductsService
    {
        private readonly StoreContext context;

        public ProductsService(StoreContext context)
        {
            this.context = context;
        }

        public async Task<List<Product>> Products_List()
        {
            return await context.Products.ToListAsync();
        }

        public async Task<Product> Product_By_ID(int Id)
        {
            return await context.Products.FirstOrDefaultAsync(P => P.Id == Id);
        }
    }
}
