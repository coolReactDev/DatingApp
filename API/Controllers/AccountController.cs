using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    
    public class AccountController : ControllerBase
    {
        private readonly DataContext context;
        private readonly ITokenService tokenService;

        public AccountController(DataContext context,ITokenService  tokenService)
        {
            this.context = context;
            this.tokenService = tokenService;
        }

        [HttpPost]
        public async Task<ActionResult<UserDto>> Register(RegisterDto userDto)
        {

            var userExists = await context.Users.AnyAsync(u => u.UserName.ToLower() == userDto.UserName.ToLower());
            if(userExists)
            {
                return BadRequest("Username exists");
            }
            using var hmac = new HMACSHA512();
            var user = new AppUser
            {
                 UserName = userDto.UserName.ToLower(),
                 PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDto.Password) ),
                 PasswordSalt = hmac.Key
            };

            context.Users.Add(user);
            await context.SaveChangesAsync();
            return new UserDto()
            {
                UserName = user.UserName,
                Token = tokenService.CreateToken(user)
            };
            
        }

    }
}