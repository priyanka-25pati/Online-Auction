using OnlineAuctionApp.Models;

namespace OnlineAuctionApp.Services.Interfaces
{
    public interface IUserService
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


