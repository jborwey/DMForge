using Microsoft.AspNetCore.Mvc;
using MailKit.Net.Smtp;
using MimeKit;

namespace DMForge.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpPost("register")]
        public async Task<IActionResult> Register(Data.UserRegisterRequest request)
        {
          Console.WriteLine("API invoked");
            // Validate the request data (email, username, password, etc.)
            // ...

            // Save the user to the database
            // ...

            // Generate a verification token
            string verificationToken = GenerateVerificationToken();

            // Store the token in your database, associated with the user's record
            // ...

            // Send the verification email
            await SendVerificationEmailAsync(request.Email, verificationToken);

            // Return a success response
            return Ok(new { message = "User registered. Verification email sent." });
        }

        public string GenerateVerificationToken()
        {
            return Guid.NewGuid().ToString();
        }

        public async Task SendVerificationEmailAsync(string userEmail, string verificationToken)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("YourApp", "your-email@example.com"));
            message.To.Add(new MailboxAddress("", userEmail));
            message.Subject = "Email Verification";

            var verificationLink = $"https://yourapp.com/verify?token={verificationToken}";
            message.Body = new TextPart("html")
            {
                Text = $"<p>Please click the link below to verify your email address:</p><a href='{verificationLink}'>Verify Email</a>"
            };

            using (var client = new SmtpClient())
            {
                await client.ConnectAsync("smtp.example.com", 587, false);
                await client.AuthenticateAsync("your-smtp-username", "your-smtp-password");
                await client.SendAsync(message);
                await client.DisconnectAsync(true);
            }
        }
    }

}
