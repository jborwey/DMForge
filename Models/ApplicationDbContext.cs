using Microsoft.EntityFrameworkCore;

    public class ApplicationDbContext : DbContext
    {
      public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
          : base(options)
      {
      }

        // Define your DbSets here, for example:
        // public DbSet<YourEntity> YourEntities { get; set; }
      public DbSet<Items> Items { get; set; }
      public DbSet<User> Users { get; set; }
    }

