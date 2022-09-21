using System.ComponentModel.DataAnnotations;

namespace eleicao2022
{
    public class CadCandidate
    {
        [Key]
        public int IdCandidato { get; set; }
        public string NomeCompleto { get; set; }
        public string Vice { get; set; }
        public DateTime DataCadastro { get; set; }
        public string Legenda { get; set; }
        public int NumCandidato { get; set; }



    }
}
