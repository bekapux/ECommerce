namespace API.DAL.Entities
{
  public class BasketItem
  {
    public int Id { get; set; }
    public int Quantity { get; set; }

    #region Navigation Properties
    public int ProductId { get; set; }
    public Product Product { get; set; }
    #endregion
  }
}