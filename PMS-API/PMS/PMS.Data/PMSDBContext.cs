using Microsoft.EntityFrameworkCore;
using PMS.Model;

namespace PMS.Data
{
    
    public class PMSDBContext:DbContext
    {
        public PMSDBContext(DbContextOptions dbContextOptions):base(dbContextOptions) { 
            
        }
        public DbSet<Product> Product { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<SubCategory> SubCategory { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Product>().Property(x => x.image).HasColumnType("varbinary(MAX)");
        }
    }
}