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
    public class LoginController : ControllerBase
    {
        private readonly DataContext context;
        private readonly ITokenService tokenService;

        public LoginController(DataContext context, ITokenService tokenService)
        {
            this.context = context;
            this.tokenService = tokenService;
        }

        [HttpPost]
        public async Task<ActionResult<UserDto>> Login(LoginDto userDto)
        {

            var currentUser = await context.Users.FirstOrDefaultAsync(u => u.UserName.ToLower()
             == userDto.UserName.ToLower());
            if(currentUser == null)
            {
                return BadRequest("Username exists");
            }
            
            using var hmac = new HMACSHA512(currentUser.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDto.Password));
            
            for (int i = 0; i < computedHash.Length; i++)
            {
                if(computedHash[i] != currentUser.PasswordHash[i])
                {
                    return Unauthorized("Login Failed");    
                }
            }
          
          return new UserDto
          {
            Id = currentUser.Id,
            UserName = userDto.UserName,
            Token = tokenService.CreateToken(currentUser)
          };
            
        }

    }
}