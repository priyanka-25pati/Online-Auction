using System.Collections.Generic;
using System.Threading.Tasks;
using OnlineAuctionApp.Models;

namespace OnlineAuctionApp.Repository.Interfaces
{
    public interface IUser
    {
        Task<Users> RegisterUserAsync(Users user);
        Task<Users> AuthenticateUserAsync(LogIn loginModel);
        Task<Users> GetUserByIdAsync(int userId);
        Task<IEnumerable<Users>> GetAllUsersAsync();
        Task UpdateUserAsync(Users user);
        Task DeleteUserAsync(int userId);

        // Admin authentication method
        Task<Admins> AuthenticateAdminAsync(Admins admin);
    }
}
