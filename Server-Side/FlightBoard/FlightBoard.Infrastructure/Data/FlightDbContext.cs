using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;
using FlightBoard.Domain.Entities;
namespace FlightBoard.Infrastructure.Data
{
    public class FlightDbContext : DbContext
    {
        public FlightDbContext(DbContextOptions<FlightDbContext> options)
            : base(options) { }

        public DbSet<Flight> Flights => Set<Flight>();
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Flight>()
                .HasIndex(f=>f.FlightNumber)
                .IsUnique();

            base.OnModelCreating(modelBuilder);
        }
    }
}
