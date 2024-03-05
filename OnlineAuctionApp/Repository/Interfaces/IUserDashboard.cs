using System.Collections.Generic;
using System.Threading.Tasks;
using OnlineAuctionApp.Models;

namespace OnlineAuctionApp.Repository.Interfaces
{
    public interface IUserDashboard
    {
        Task<IEnumerable<UserDashboard>> GetAllUserDashboardsAsync();
        Task<UserDashboard> GetUserDashboardByIdAsync(int dashboardId);
        Task<UserDashboard> AddUserDashboardAsync(UserDashboard userDashboard);
        Task<UserDashboard> UpdateUserDashboardAsync(UserDashboard userDashboard);
        Task DeleteUserDashboardAsync(int dashboardId);
    }
}
