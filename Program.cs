var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();
 
app.UseDefaultFiles();  
app.UseStaticFiles();   

app.MapPost("/signup", async (context) =>
{
    await Results.Json($"api work, {context.Request.Form["name"]}").ExecuteAsync(context);
});

app.Run();
