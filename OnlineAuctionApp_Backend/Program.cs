using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using OnlineAuctionApp.Repository;
using OnlineAuctionApp.Repository.Interfaces;
using OnlineAuctionApp.Services;
using OnlineAuctionApp.Services.Interfaces;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();




builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(o =>
{
    o.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this is my security key for generating Jwt token for my application")),
        ValidateAudience = true,
        ValidIssuer = "my issuer",
        ValidAudience = "my audience"
    };
});



builder.Services.AddAuthorization();

// Register repositories and services
builder.Services.AddScoped<IItemRepository, ItemRepo>();
builder.Services.AddTransient<IItemService, ItemService>();

// Register BidRepo and BidService
builder.Services.AddScoped<IBid, BidRepo>();
builder.Services.AddTransient<IBidService, BidService>();


// Register UserRepo and UserService
builder.Services.AddScoped<IUser, UserRepo>();
builder.Services.AddTransient<IUserService, UserService>();




builder.Services.AddScoped<IPayment, PaymentRepo>();
builder.Services.AddTransient<IPaymentService, PaymentService>();




builder.Services.AddScoped<IUserDashboard, UserDashboardRepo>();
builder.Services.AddTransient<IUserDashboardService, UserDashboardService>();





builder.Services.AddCors((o) =>
{
    o.AddPolicy("corspolicy", b => b.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

 app.UseAuthentication(); 
app.UseAuthorization();

app.UseCors("corspolicy");

app.MapControllers();

app.Run();
