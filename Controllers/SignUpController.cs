using System.Diagnostics.Eventing.Reader;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;




namespace YogaWebsite.Controllers
{
    public class SignUpController : Controller
    {
        private readonly string POSSIBLE_CLIENTS_PATH = @"/var/YogaMasterskyaStorage/possibleClients.json"; 
        private YogamasterskyaContext context;
        public SignUpController(YogamasterskyaContext context)
        {
            this.context = context;
            
        }
        [HttpPost][Route("/signup")]
        public async Task FormHandler(string name, string phone, bool agree)
        {
            if (agree)
            {
                string clientsJson;
                List<PossibleClient> possibleClients;

                using (FileStream fs = new FileStream(POSSIBLE_CLIENTS_PATH, FileMode.OpenOrCreate, FileAccess.ReadWrite))
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
                    Phone = phone[0] == '+' ? phone : ("+7" + phone[1..])
                });

                using (FileStream fs = new FileStream(POSSIBLE_CLIENTS_PATH, FileMode.Truncate, FileAccess.Write, FileShare.None))
                using (StreamWriter writer = new StreamWriter(fs))
                {
                    clientsJson = JsonConvert.SerializeObject(possibleClients);
                    await writer.WriteAsync(clientsJson);
                }
            }
        }

    }
}
