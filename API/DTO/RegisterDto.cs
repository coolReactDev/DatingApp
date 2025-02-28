
public class  RegisterDto
{
    public required string UserName { get; set; }

    public required  string Password { get; set; }
}

public class  UserDto
{
    public required string UserName { get; set; }
    public int  Id { get; set; }

    public required  string Token { get; set; }
}

public class  LoginDto
{
    public required string UserName { get; set; }

    public required  string Password { get; set; }
}