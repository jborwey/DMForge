using Microsoft.AspNetCore.Mvc;
using OpenAI.GPT3;
using OpenAI.GPT3.Managers;
using OpenAI.GPT3.ObjectModels.RequestModels;

namespace DMForge.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GenerateItemController : ControllerBase
    {
        public class ItemRequest
        {
            public string ItemType { get; set; }
        }
        // Multiline system prompt for the generative model
        // TODO: Replace this with a templated item generator
        private const string SystemPrompt = @"You are a creative tabletop game content assistant. You will help users by generating interesting items in the Fantasy table top game Dungeons and Dragons. You have creative license to come up new characters, places, content, etc. for the game.
Each item is described with:
* name
* weapon type
* a description
* a stat block";

        private readonly ILogger<GenerateItemController> _logger = new Logger<GenerateItemController>(new LoggerFactory());

        private OpenAIService openAiService = new OpenAIService(new OpenAiOptions()
        {
            ApiKey = @"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"
        });


        // GET generateitem
        [HttpPost]
        public async Task<IActionResult> GetGeneratedItem([FromBody] ItemRequest item)
        {
            _logger.LogInformation("Generating item, sending request to OpenAI");
            var completionResult = await openAiService.ChatCompletion.CreateCompletion(
                new ChatCompletionCreateRequest
                {
                    Messages = new List<ChatMessage>
                {
                    ChatMessage.FromSystem(SystemPrompt),
                    ChatMessage.FromUser("Can you generate me a " + item.ItemType + "?"),
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
                name = item.ItemType,
                description = "A " + item.ItemType,
                weight = 2,
                value = 10,
                type = "weapon",
                damage = 1,
                damageType = "slashing",
                properties = new string[] { "versatile" },
                itemText = completion_result
            });
        }
    }
}