using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using OnlineAuctionApp.Models;
using OnlineAuctionApp.Repository;
using OnlineAuctionApp.Repository.Interfaces;
using OnlineAuctionApp.Services.Interfaces;

namespace OnlineAuctionApp.Services
{
    public class UserService : IUserService
    {
        private readonly IUser _userRepo;

        public UserService(IUser userRepo)
        {
            _userRepo = userRepo;
        }

        public async Task<Users> RegisterUserAsync(Users user)
        {
            Users registeredUser = await _userRepo.RegisterUserAsync(user);
            if (registeredUser != null)
            {
                return registeredUser;
            }
            else
            {
                throw new Exception("Failed to register user.");
            }
        }

        public async Task<Users> AuthenticateUserAsync(LogIn loginModel)
        {
            return await _userRepo.AuthenticateUserAsync(loginModel);
        }

        public async Task<Users> GetUserByIdAsync(int userId)
        {
            return await _userRepo.GetUserByIdAsync(userId);
        }

        public async Task UpdateUserAsync(Users user)
        {
            await _userRepo.UpdateUserAsync(user);
        }

        public async Task<IEnumerable<Users>> GetAllUsersAsync()
        {
            return await _userRepo.GetAllUsersAsync();
        }

        public async Task DeleteUserAsync(int userId)
        {
            await _userRepo.DeleteUserAsync(userId);
        }

        // Modified admin authentication method
        public async Task<Admins> AuthenticateAdminAsync(Admins admin)
        {
            return await _userRepo.AuthenticateAdminAsync(admin);
        }
    }
}
