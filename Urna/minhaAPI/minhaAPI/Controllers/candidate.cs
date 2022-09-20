using eleicao2022;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore.Diagnostics;
using System;


namespace minhaAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class candidate : ControllerBase
    {

        [HttpPost]
        public string CadastraCandidato(string NomeCom, string VicePre, string NumCandidato, string Legenda)
        {
            try
            {

                if (!string.IsNullOrEmpty(NomeCom) && !string.IsNullOrEmpty(VicePre) && !string.IsNullOrEmpty(Legenda))

                {
                    int NumC = Convert.ToInt32(NumCandidato);

                    DataContext context = new DataContext();

                    /* Verifica se o número de candidato já foi utilizado */

                    List<CadCandidate> candidatosCadastrados = new List<CadCandidate>();

                    foreach (var c in context.candidatos)
                    {
                        if (c.NumCandidato == NumC)
                        {
                            return "Este número de candidato já foi utilizado. Por favor, escolha outro.";
                        }
                    }



                    Random randNum = new Random();

                    var nome = NomeCom;
                    var vice = VicePre;
                    var dt = DateTime.Now;
                    var InfoCand = Legenda;
                    var NumCand = NumC;

                    var cand = new CadCandidate()
                    {
                        IdCandidato = randNum.Next(),
                        NomeCompleto = NomeCom,
                        Vice = VicePre,
                        DataCadastro = DateTime.Now,
                        Legenda = Legenda,
                        NumCandidato = NumCand

                    };

                    context.candidatos.Add(cand);

                    context.SaveChanges();

                    return "Candidato cadastrado !";

                }

            }
            catch (Exception ex)
            {
                new Exception(ex.ToString());
                return "Erro!";
            }
            return "Cadastrou !";

        }



        [HttpDelete]
        public int RemoveCandidato(int id)
        {
            int nome = id;
            SqlConnection con = new SqlConnection("Data Source = (localdb)\\MSSQLLocalDB; Initial Catalog = eleicao; Integrated Security = True; Connect Timeout = 30; Encrypt = False; TrustServerCertificate = False; ApplicationIntent = ReadWrite; MultiSubnetFailover = False");

            con.Open();

            DataContext context = new DataContext();

            SqlCommand comando = new SqlCommand("DELETE FROM candidatos WHERE IdCandidato =" + id, con);


            comando.ExecuteNonQuery();
            con.Close();





            return nome;
        }


        [HttpGet]
        public List<CadCandidate> RetornaCandidatos(int numCandidato)
        {
            DataContext context = new DataContext();

            List<CadCandidate> candidatosCadastrados = new List<CadCandidate>();

            if (numCandidato == 0)
            {
                foreach (var c in context.candidatos)
                {
                    candidatosCadastrados.Add(c);
                }
                return candidatosCadastrados;

            }
            else
            {
                foreach (var c in context.candidatos)
                {
                    if (c.NumCandidato == numCandidato)
                    {
                        candidatosCadastrados.Add(c);
                        return candidatosCadastrados;
                    }
                }

            }
            return null;

        }
    }
}