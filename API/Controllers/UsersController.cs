using System.Net;
using System.Net.NetworkInformation;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly DataContext context;

        public UsersController(DataContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
        {
            var users = await this.context.Users.ToListAsync();
            return users.Select(s => new UserDto()
            {
                UserName = s.UserName,
                Token = ""
            }).ToList();
        }

        [HttpGet("{id:int}")]
        
        public async Task<ActionResult<UserDto>> GetUser(int id)
        {
            var user = await this.context.Users.FindAsync(id); 
            if( user == null)
            return  NotFound();
            return new UserDto()
            {
                UserName = user.UserName,
                Token = ""
            };
        }

    }
}