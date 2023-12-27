using Microsoft.EntityFrameworkCore;
using PMS.Business;
using PMS.Data;
using PMS.Repository;

var builder = WebApplication.CreateBuilder(args);
var connection = builder.Configuration.GetConnectionString("PMSSQLConnection");

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<PMSDBContext>(con => con.UseSqlServer(connection));
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IProductBusiness, ProductBusiness>();
builder.Services.AddCors(x=>x.AddDefaultPolicy(y=>y.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors();
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
