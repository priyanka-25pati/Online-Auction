

using OnlineAuctionApp.Models;

namespace OnlineAuctionApp.Services.Interfaces
{
    public interface IUserDashboardService
    {
        Task<IEnumerable<UserDashboard>> GetAllUserDashboardsAsync();
        Task<UserDashboard> GetUserDashboardByIdAsync(int dashboardId);
        Task<UserDashboard> AddUserDashboardAsync(UserDashboard userDashboard);
        Task<UserDashboard> UpdateUserDashboardAsync(UserDashboard userDashboard);
        Task DeleteUserDashboardAsync(int dashboardId);
    }
}
