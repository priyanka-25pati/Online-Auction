using System.Collections.Generic;
using System.Threading.Tasks;
using OnlineAuctionApp.Models;
using OnlineAuctionApp.Repository;
using OnlineAuctionApp.Repository.Interfaces;
using OnlineAuctionApp.Services.Interfaces;

namespace OnlineAuctionApp.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IPayment _paymentRepo;

        public PaymentService(IPayment paymentRepo)
        {
            _paymentRepo = paymentRepo;
        }

        public async Task<IEnumerable<Payments>> GetAllPaymentsAsync()
        {
            return await _paymentRepo.GetAllPaymentsAsync();
        }

        public async Task<Payments> GetPaymentByIdAsync(int paymentId)
        {
            return await _paymentRepo.GetPaymentByIdAsync(paymentId);
        }

        public async Task<Payments> AddPaymentAsync(Payments payment)
        {
            return await _paymentRepo.AddPaymentAsync(payment);
        }

        public async Task<Payments> UpdatePaymentAsync(Payments payment)
        {
            return await _paymentRepo.UpdatePaymentAsync(payment);
        }

        public async Task DeletePaymentAsync(int paymentId)
        {
            await _paymentRepo.DeletePaymentAsync(paymentId);
        }
    }
}
