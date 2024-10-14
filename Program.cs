using Microsoft.AspNetCore.HttpLogging;
using Microsoft.EntityFrameworkCore;
using YogaWebsite;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<YogamasterskyaContext>(options => options.UseNpgsql(connectionString));
var app = builder.Build();

app.UseDefaultFiles();  
app.UseStaticFiles();

app.MapControllers();

app.Run();
