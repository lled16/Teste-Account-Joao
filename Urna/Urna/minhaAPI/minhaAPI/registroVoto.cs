using System.ComponentModel.DataAnnotations;

namespace eleicao2022
{
    public class registroVoto

    {
        [Key]
        public int IdVoto { get; set; }
        public int IdCandidato { get; set; }
        public DateTime DataVoto { get; set; }
       public int QtdVotos { get; set; }


    }
}
