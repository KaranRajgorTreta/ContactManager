using ContactManager.Interface;
using ContactManager.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace ContactManager.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IContact _contactService;

        public HomeController(ILogger<HomeController> logger, IContact contactService)
        {
            _logger = logger;
            _contactService = contactService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> CreateContact([FromBody] CreateContact request)
        {
            try
            {
                var contactId = await _contactService.CreateContact(request);
                return Ok(new ApiResponse<int>(true, "Contact created successfully.", contactId));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(false, "An error occurred.", ex.Message));
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateContact([FromQuery] int id, [FromBody] UpdateContact request)
        {
            try
            {
                var result = await _contactService.UpdateContact(id, request);
                if (result == 0)
                {
                    return NotFound(new ApiResponse<string>(false, "Contact not found.", null));
                }
                return Ok(new ApiResponse<int>(true, "Contact updated successfully.", result));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(false, "An error occurred.", ex.Message));
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteContact([FromQuery] int id)
        {
            try
            {
                var result = await _contactService.DeleteContact(id);
                if (result == 0)
                {
                    return NotFound(new ApiResponse<string>(false, "Contact not found.", null));
                }
                return Ok(new ApiResponse<int>(true, "Contact deleted successfully.", result));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(false, "An error occurred.", ex.Message));
            }
        }

        [HttpGet]
        public async Task<IActionResult> ViewContact(int id)
        {
            try
            {
                var contact = await _contactService.ViewContact(id);
                if (contact == null)
                {
                    return NotFound(new ApiResponse<string>(false, "Contact not found.", null));
                }
                return Ok(new ApiResponse<ViewContact>(true, "Contact retrieved successfully.", contact));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(false, "An error occurred.", ex.Message));
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetContactList()
        {
            try
            {
                var contacts = await _contactService.GetContactList();
                return Ok(new ApiResponse<List<ViewContact>>(true, "Contacts retrieved successfully.", contacts));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(false, "An error occurred.", ex.Message));
            }
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
