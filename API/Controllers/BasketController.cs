using API.DAL.Dtos;
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

    [HttpGet(Name = "GetBasket")]
    public async Task<ActionResult<BasketDto>> GetBasket()
    {
      Basket Basket = await RetrieveBasket();

      if (Basket == null) return NotFound();
      return MapBasketToDto(Basket);
    }


    [HttpPost]
    public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
    {
      var Basket = await RetrieveBasket();
      if (Basket == null) Basket = CreateBasket();
      var product = await context.Products.FirstOrDefaultAsync(p => p.Id == productId);

      if (product == null) return NotFound();
      Basket.AddItem(product, quantity);
      var result = await context.SaveChangesAsync() > 0;
      if (result) return CreatedAtRoute("GetBasket", MapBasketToDto(Basket));
      return BadRequest(new ProblemDetails { Title = "Problem Saving item to basket" });
    }


    [HttpDelete]
    public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
    {
      var Basket = await RetrieveBasket();
      if (Basket == null) return NotFound();

      var product = await context.Products.FindAsync(productId);
      if (product == null) return NotFound();

      Basket.removeItem(productId, quantity);

      var result = await context.SaveChangesAsync() > 0;
      if (result) return Ok();
      return BadRequest(new ProblemDetails { Title = "Problem Removing Item From the basket" });
    }

    private async Task<Basket> RetrieveBasket()
    {
      var Basket = await context.Baskets
        .Include(i => i.Items)
        .ThenInclude(p => p.Product)
        .FirstOrDefaultAsync(x => x.BuyedID == Request.Cookies["buyerId"]);
      return Basket;
    }
    private BasketDto MapBasketToDto(Basket Basket)
    {
      return new BasketDto
      {
        Id = Basket.Id,
        BuyerId = Basket.BuyedID,
        Items = Basket.Items.Select(I => new BasketItemDto
        {
          ProductId = I.ProductId,
          Name = I.Product.Name,
          Price = I.Product.Price,
          PictureUrl = I.Product.PictureUrl,
          Type = I.Product.Type,
          Brand = I.Product.Brand,
          Quantity = I.Quantity
        }).ToList()
      };
    }

    private Basket CreateBasket()
    {
      var buyerId = Guid.NewGuid().ToString();
      var cookieOptions = new CookieBuilder
      {
        IsEssential = true,
        Expiration = new TimeSpan(days: 30, hours: 0, minutes: 0, seconds: 0)
      };
      Response.Cookies.Append("buyerId", buyerId);
      var basket = new Basket { BuyedID = buyerId };
      context.Baskets.Add(basket);
      return basket;
    }

  }
}
