using Microsoft.AspNetCore.Mvc;
using OpenAI.GPT3;
using OpenAI.GPT3.Managers;
using OpenAI.GPT3.ObjectModels.RequestModels;

namespace DMForge.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GenerateNpcController : ControllerBase
    {
        public class NpcRequest
        {
            public string RaceType { get; set; }
            public string Profession { get; set; }
            public string Appearance { get; set; }
        }
        // Multiline system prompt for the generative model
        // TODO: Replace this with a templated item generator
        private const string SystemPrompt = @"You are a creative tabletop game content assistant. You will help users by generating interesting npcs in the Fantasy table top game Dungeons and Dragons. You have creative license to come up new characters, places, content, etc. for the game.
                Each Npc is described with:
                * Name
                * Race
                * Profession
                * a description of their appearance
                * a stat block";

        private readonly ILogger<GenerateNpcController> _logger = new Logger<GenerateNpcController>(new LoggerFactory());

        private OpenAIService openAiService = new OpenAIService(new OpenAiOptions()
        {
            ApiKey = @"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"
        });

        // POST generatenpc
        [HttpPost]
        public async Task<IActionResult> GetGeneratedNpc([FromBody] NpcRequest npc)
        {
            Console.WriteLine(npc);
             _logger.LogInformation("Generating NPC, sending request to OpenAI");
            var completionResult = await openAiService.ChatCompletion.CreateCompletion(
                new ChatCompletionCreateRequest
                {
                    Messages = new List<ChatMessage>
                {
                    // they are "a elf" " that looks tall and imposing"
                    ChatMessage.FromSystem(SystemPrompt),
                    ChatMessage.FromUser("Can you generate me a NPC? They are " + 
                    (npc.RaceType != "" ? "a " + npc.RaceType : "") + (npc.Profession != "" ? " " + npc.Profession : "") +
                    (npc.Appearance != "" ? " that looks " + npc.Appearance : "")),
                },
                    Model = "gpt-3.5-turbo",
                    MaxTokens = 1000//optional
                });
            var completion_result = completionResult.Choices.First().Message.Content;
            if (completionResult.Successful)
            {
                _logger.LogInformation(completion_result);
            }
            return Ok(new
            {
                npcText = completion_result
            });
        }
    }
}