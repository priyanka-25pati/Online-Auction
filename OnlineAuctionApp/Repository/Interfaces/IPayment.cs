using System.Collections.Generic;
using System.Threading.Tasks;
using OnlineAuctionApp.Models;

namespace OnlineAuctionApp.Repository.Interfaces
    {
        public interface IPayment
        {
            Task<IEnumerable<Payments>> GetAllPaymentsAsync();
            Task<Payments> GetPaymentByIdAsync(int paymentId);
            Task<Payments> AddPaymentAsync(Payments payment);
            Task<Payments> UpdatePaymentAsync(Payments payment);
            Task DeletePaymentAsync(int paymentId);
        }
    }
