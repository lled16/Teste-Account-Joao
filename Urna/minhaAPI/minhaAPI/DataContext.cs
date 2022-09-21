using Microsoft.EntityFrameworkCore;



namespace eleicao2022
{
    public class DataContext : DbContext
    {
        public virtual DbSet<CadCandidate> candidatos { get; set; }


        public virtual DbSet<registroVoto> Votos { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

            optionsBuilder.UseSqlServer("Data Source = (localdb)\\MSSQLLocalDB;Initial Catalog=eleicao;Integrated Security=True;Pooling=False;MultipleActiveResultSets=True");

            //optionsBuilder.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=eleicao;Integrated Security=True;Pooling=False;MultipleActiveResultSets=True");


        }
    }


}
