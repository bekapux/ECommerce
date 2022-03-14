﻿using System.Collections.Generic;
using System.Linq;

namespace API.DAL.Entities
{
  public class Basket
  {
    public int Id { get; set; }
    public string BuyedID { get; set; }
    public List<BasketItem> Items { get; set; } = new();
    public void AddItem(Product product, int quantity)
    {
      if (Items.All(item => item.ProductId != product.Id))
      {
        Items.Add(new BasketItem { Product = product, Quantity = quantity });
      }
      Items.FirstOrDefault(item => item.Product.Id == product.Id).Quantity += 1;
      var existingItem = Items.FirstOrDefault(item => item.ProductId == product.Id);
      if (existingItem != null) existingItem.Quantity += quantity;
    }

    public void removeItem(int productId, int quantity)
    {
      var item = Items.FirstOrDefault(item => item.ProductId == productId);
      if (item == null) return;
      item.Quantity -= quantity;
      if (item.Quantity == 0) Items.Remove(item);
    }
  }
}
