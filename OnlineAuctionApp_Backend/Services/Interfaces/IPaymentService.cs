using OnlineAuctionApp.Models;

namespace OnlineAuctionApp.Services.Interfaces
{
    public interface IPaymentService
    {
        Task<IEnumerable<Payments>> GetAllPaymentsAsync();
        Task<Payments> GetPaymentByIdAsync(int paymentId);
        Task<Payments> AddPaymentAsync(Payments payment);
        Task<Payments> UpdatePaymentAsync(Payments payment);
        Task DeletePaymentAsync(int paymentId);
    }
}
