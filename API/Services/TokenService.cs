using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using Microsoft.IdentityModel.Tokens;

class TokenService(IConfiguration configuration) : ITokenService
{
    public string CreateToken(AppUser user)
    {
        var tokenKey = configuration["TokenKey"];
        if(tokenKey == null)
        {
            throw new Exception("Token Key Null");
        }
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));

        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier,user.UserName)
        };
        var tokeDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = new SigningCredentials(key,SecurityAlgorithms.HmacSha512Signature)
        };
        var tokenHandler  = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokeDescriptor);

        return tokenHandler.WriteToken(token);
    }
}