using eleicao2022;
using Microsoft.AspNetCore.Mvc;
using System;


namespace minhaAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class vote : ControllerBase
    {

        [HttpPost]
        public string CadastraVoto(int num)
        {

            try
            {

                if (num != 0)
                {

                    DataContext context = new DataContext();
                    Random randNum = new Random();


                    List<CadCandidate> ca = new List<CadCandidate>();
                    ca = context.candidatos.ToList().Where(x => x.NumCandidato == num).ToList();

                    if (ca.Count > 0)
                    {

                        var idVoto = randNum.Next();
                        var idCand = ca[0].IdCandidato;
                        var dataVoto = DateTime.Now;

                        List<registroVoto> voto = new List<registroVoto>();
                        voto = context.Votos.ToList();
                       
                            foreach(var vo in voto)
                            {
                                if(vo.IdCandidato == idCand)
                                {

                                vo.QtdVotos = vo.QtdVotos + 1;
                                context.SaveChanges();

                                return "Voto Registrado!";
                            }
                            }
                        var vt = new registroVoto()
                        {

                            IdCandidato = idCand,
                            IdVoto = idVoto,
                            DataVoto = dataVoto,
                            QtdVotos = 1
                        };

                        context.Votos.Add(vt);

                        context.SaveChanges();

                        return "Voto Registrado!";
                    }
                    else
                    {
                        return "Este candidato não existe !";
                    }

                }
                else if (num == 0)
                {
                    DataContext context = new DataContext();

                    Random randNum = new Random();

                    var idVoto = randNum.Next();
                    var idCand = num;
                    var dataVoto = DateTime.Now;


                    List<registroVoto> voto = new List<registroVoto>();
                    voto = context.Votos.ToList();

                    foreach (var vo in voto)
                    {
                        if (vo.IdCandidato == idCand)
                        {

                            vo.QtdVotos = vo.QtdVotos + 1;
                            context.SaveChanges();

                            return "Voto Registrado!";
                        }
                    }


                    var vt = new registroVoto()
                    {

                        IdCandidato = idCand,
                        IdVoto = idVoto,
                        DataVoto = dataVoto,
                        QtdVotos = 1

                    };

                    context.Votos.Add(vt);

                    context.SaveChanges();

                    return "Voto Branco Registrado!";

                }


            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);

            }

            return null;
        }


    }

}