using eleicao2022;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Data.SqlClient;
using System.Security.Cryptography.X509Certificates;

namespace minhaAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class votes : ControllerBase
    {

        [HttpGet]
        public List<RetornoVotos> RetornaVotos()
        {
            DataContext context = new DataContext();

            List<CadCandidate> candidatosCadastrados = new List<CadCandidate>();

            candidatosCadastrados = context.candidatos.ToList();

            List<registroVoto> voto = new List<registroVoto>();
            voto = context.Votos.ToList();


            List<RetornoVotos> QtdVotos = new List<RetornoVotos>();
            var RtrnVotos = new RetornoVotos();


            foreach (registroVoto vt in voto)
            {
                for (int i = 0; i < candidatosCadastrados.Count; i++)
                {

                    var QtVotos = vt.QtdVotos;

                    if (candidatosCadastrados[i].IdCandidato == vt.IdCandidato)
                    {

                    
                        var IdCandidato = candidatosCadastrados[i].IdCandidato;
                        var NomeCom = candidatosCadastrados[i].NomeCompleto;
                        var Vice = candidatosCadastrados[i].Vice;
                        var Info = candidatosCadastrados[i].Legenda;
                        var QVotos = QtVotos; 

                        var dataVoto = DateTime.Now;

                        RtrnVotos = new RetornoVotos()
                        {

                            IdCandidato = IdCandidato,
                            NomeCompleto = NomeCom,
                            Vice = Vice,
                            Info = Info,
                            QtdVotos = QVotos
                        };
                        QtdVotos.Add(RtrnVotos);
                        


                    }
                  
                }

            }


            foreach (registroVoto vt in voto)
            {

                    if (vt.IdCandidato == 0)
                    {

                        var NomeCom = "Branco";
                        var Vice = "Branco";
                        var Info = "Branco";
                        var QVotos = vt.QtdVotos;

                        var dataVoto = DateTime.Now;

                        RtrnVotos = new RetornoVotos()
                        {

                            IdCandidato = 0,
                            NomeCompleto = NomeCom,
                            Vice = Vice,
                            Info = Info,
                            QtdVotos = QVotos
                        };
                        QtdVotos.Add(RtrnVotos);

                    

                }
            }


            return QtdVotos.OrderByDescending(x => x.QtdVotos).ToList();

        }


    }
}