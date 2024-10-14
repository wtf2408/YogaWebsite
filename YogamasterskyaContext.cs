using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace YogaWebsite;

public partial class YogamasterskyaContext : DbContext
{
    public YogamasterskyaContext(DbContextOptions<YogamasterskyaContext> options)
        : base(options) {}

    public virtual DbSet<PossibleClient> PossibleClients { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<PossibleClient>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("possible_clients_pkey");

            entity.ToTable("possible_clients");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name).HasColumnName("name");
            entity.Property(e => e.Phone).HasColumnName("phone");
        });
    }
}
