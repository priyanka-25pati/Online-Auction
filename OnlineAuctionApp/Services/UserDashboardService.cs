using System.Collections.Generic;
using System.Threading.Tasks;
using OnlineAuctionApp.Models;
using OnlineAuctionApp.Repository.Interfaces;
using OnlineAuctionApp.Services.Interfaces;

namespace OnlineAuctionApp.Services
{
    public class UserDashboardService : IUserDashboardService
    {
        private readonly IUserDashboard _userDashboardRepo;

        public UserDashboardService(IUserDashboard userDashboardRepo)
        {
            _userDashboardRepo = userDashboardRepo;
        }

        public async Task<IEnumerable<UserDashboard>> GetAllUserDashboardsAsync()
        {
            return await _userDashboardRepo.GetAllUserDashboardsAsync();
        }

        public async Task<UserDashboard> GetUserDashboardByIdAsync(int dashboardId)
        {
            return await _userDashboardRepo.GetUserDashboardByIdAsync(dashboardId);
        }

        public async Task<UserDashboard> AddUserDashboardAsync(UserDashboard userDashboard)
        {
            return await _userDashboardRepo.AddUserDashboardAsync(userDashboard);
        }

        public async Task<UserDashboard> UpdateUserDashboardAsync(UserDashboard userDashboard)
        {
            return await _userDashboardRepo.UpdateUserDashboardAsync(userDashboard);
        }

        public async Task DeleteUserDashboardAsync(int dashboardId)
        {
            await _userDashboardRepo.DeleteUserDashboardAsync(dashboardId);
        }
    }
}
