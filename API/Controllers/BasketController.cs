using API.DAL.Entities;
using API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class BasketController : BaseApiController
  {
    private readonly StoreContext context;
    public BasketController(StoreContext context)
    {
      this.context = context;
    }

    [HttpGet]
    public async Task<ActionResult<Basket>> GetBasket()
    {
      Basket Basket = await RetrieveBasket();

      if (Basket == null) return NotFound();
      return Basket;
    }

    private async Task<Basket> RetrieveBasket()
    {
      return await context.Baskets
        .Include(i => i.Items)
        .ThenInclude(p => p.Product)
        .FirstOrDefaultAsync(x => x.BuyedID == Request.Cookies["buyerId"]);
    }

    [HttpPost]
    public async Task<ActionResult> AddItemToBasket(int productId, int quantity)
    {
      return StatusCode(201);
    }

    [HttpDelete]
    public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
    {
      return StatusCode(201);
    }
  }
}
