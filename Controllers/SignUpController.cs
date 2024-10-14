using System.Diagnostics.Eventing.Reader;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Text.Json;



namespace YogaWebsite.Controllers
{
    public class SignUpController : Controller
    {
        private string pathPossibleClinets;
        private YogamasterskyaContext context;
        public SignUpController(YogamasterskyaContext context)
        {
            this.context = context;
        }
        [HttpPost][Route("/signup")]
        public async Task FormHandler(string name, string phone, bool agree)
        {
            if (agree) {
                context.PossibleClients.Add(new PossibleClient()
                {
                    Id = context.PossibleClients.Select(pc => pc.Id).Max() + 1,
                    Name = name,
                    Phone = phone
                });
                context.SaveChanges();
            }
        }

    }
}
