using System.Diagnostics.Eventing.Reader;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Text.Json;



namespace YogaWebsite.Controllers
{
    public class SignUpController : Controller
    {
        private string pathPossibleClinets;
        public SignUpController()
        {
            pathPossibleClinets = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "possibleClients.json");
        }
        [HttpPost][Route("/signup")]
        public async Task FormHandler(string name, string phone, bool agree)
        {
            FileInfo fileInfo = new(pathPossibleClinets);
            using var fs = fileInfo.Open(FileMode.OpenOrCreate);
            List<Client> clients; 
            try
            {
                clients = await JsonSerializer.DeserializeAsync<List<Client>>(fs) ?? new List<Client>();  
            }
            catch (System.Text.Json.JsonException)
            {
                clients = new();
            }
            var client = new Client(name, phone, agree);
            if (!clients.Contains(client)) {
                clients.Add(client);
                fs.Position = 0;
                await JsonSerializer.SerializeAsync<List<Client>>(fs, clients, 
                new JsonSerializerOptions() {
                    WriteIndented = true,
                });
                fs.Flush();
            }
        }

    }
    record Client(string name, string phone, bool agree);
}
