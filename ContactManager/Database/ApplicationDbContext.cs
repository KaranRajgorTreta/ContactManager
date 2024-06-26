using ContactManager.Models;
using Microsoft.EntityFrameworkCore;

namespace ContactManager.Database
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Contact> Contacts { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Contact>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.HasData(
                    new Contact { Id = 1, Name = "John Doe", Email = "john@example.com", Phone = "1234567890", Address = "123 Main St" }
                );
            });
        }
    }
}
