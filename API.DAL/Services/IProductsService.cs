using API.DAL.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.DAL.Services
{
    public interface IProductsService
    {
        Task<List<Product>> Products_List();
        Task<Product> Product_By_ID(int Id);
    }
}