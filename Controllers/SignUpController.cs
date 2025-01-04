using System.Diagnostics.Eventing.Reader;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;




namespace YogaWebsite.Controllers
{
    public class SignUpController : Controller
    {
        private readonly IConfiguration configuration;
        private YogamasterskyaContext context;
        public SignUpController(YogamasterskyaContext context, IConfiguration configuration)
        {
            this.context = context;
            this.configuration = configuration;
            
        }
        [HttpPost][Route("/signup")]
        public async Task FormHandler(string name, string phone, bool agree)
        {
            if (agree)
            {
                string clientsJson;
                List<PossibleClient> possibleClients;
                var path = configuration["Paths:PossibleClientsPath"]?.ToString() 
                ?? throw new NullReferenceException("Path to possible clients can't be null");

                using (FileStream fs = new FileStream(path, FileMode.OpenOrCreate, FileAccess.ReadWrite))
                using (StreamReader reader = new StreamReader(fs))
                {
                    clientsJson = await reader.ReadToEndAsync();
                    possibleClients = JsonConvert.DeserializeObject<List<PossibleClient>>(clientsJson) ?? new List<PossibleClient>();
                }

                possibleClients.Add(new PossibleClient()
                {
                    Id = possibleClients.Count == 0 ? 1 :
                        possibleClients.Select(pc => pc.Id).Max() + 1,
                    Name = name,
                    Phone = phone[0] == '+' ? phone : ("+7" + phone[1..]),
                    CreatedAt = DateTime.Now
                });

                using (FileStream fs = new FileStream(path, FileMode.Truncate, FileAccess.Write, FileShare.None))
                using (StreamWriter writer = new StreamWriter(fs))
                {
                    clientsJson = JsonConvert.SerializeObject(possibleClients, Formatting.Indented);
                    await writer.WriteAsync(clientsJson);
                }
            }
        }

    }
}
