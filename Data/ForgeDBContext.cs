using Microsoft.EntityFrameworkCore;
using DMForge.Models;

namespace DMForge.Data
{
    public class ForgeDBContext : DbContext
    {
        public ForgeDBContext(DbContextOptions<ForgeDBContext> options) : base(options) { }
        public DbSet<Items> Items { get; set; }
    }
}