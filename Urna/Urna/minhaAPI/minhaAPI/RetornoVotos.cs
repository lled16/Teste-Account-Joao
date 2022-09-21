using System.ComponentModel.DataAnnotations;

namespace eleicao2022
{
    public class RetornoVotos
    {
        [Key]
        public int IdCandidato { get; set; }
        public string NomeCompleto { get; set; }
        public string  Vice { get; set; }
        public string Info { get; set; }
        public int QtdVotos { get; set; }



    }
}
