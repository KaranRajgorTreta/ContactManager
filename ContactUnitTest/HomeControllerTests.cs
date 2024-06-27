using ContactManager.Controllers;
using ContactManager.Interface;
using ContactManager.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace ContactUnitTest
{
    public class HomeControllerTests
    {
        private readonly Mock<ILogger<HomeController>> _mockLogger;
        private readonly Mock<IContact> _mockContactService;
#pragma warning disable NUnit1032 // An IDisposable field/property should be Disposed in a TearDown method
        private readonly HomeController _controller;
#pragma warning restore NUnit1032 // An IDisposable field/property should be Disposed in a TearDown method
        public HomeControllerTests()
        {
            _mockLogger = new Mock<ILogger<HomeController>>();
            _mockContactService = new Mock<IContact>();
            _controller = new HomeController(_mockLogger.Object, _mockContactService.Object);
        }



        [Fact]
        public async Task CreateContact_ReturnsOkResult_WithValidContactId()
        {
            // Arrange
            var newContact = new CreateContact
            {
                Name = "Jane Doe",
                Email = "jane@example.com",
                Phone = "9876543210",
                Address = "456 Main St"
            };
            var expectedContactId = 1;

            _mockContactService.Setup(service => service.CreateContact(newContact))
                .ReturnsAsync(expectedContactId);

            // Act
            var result = await _controller.CreateContact(newContact);

            // Assert
            var okResult = Xunit.Assert.IsType<OkObjectResult>(result);
            var apiResponse = Xunit.Assert.IsType<ApiResponse<int>>(okResult.Value);
            Xunit.Assert.True(apiResponse.Success);
            Xunit.Assert.Equal(expectedContactId, apiResponse.Data);
        }

        [Fact]
        public async Task CreateContact_ReturnsServerError_OnException()
        {
            // Arrange
            var newContact = new CreateContact
            {
                Name = "Jane Doe",
                Email = "jane@example.com",
                Phone = "9876543210",
                Address = "456 Main St"
            };

            _mockContactService.Setup(service => service.CreateContact(newContact))
                .ThrowsAsync(new Exception("Database error"));

            // Act
            var result = await _controller.CreateContact(newContact);

            // Assert
            var objectResult = Xunit.Assert.IsType<ObjectResult>(result);
            Xunit.Assert.Equal(500, objectResult.StatusCode);
            var apiResponse = Xunit.Assert.IsType<ApiResponse<string>>(objectResult.Value);
            Xunit.Assert.False(apiResponse.Success);
            Xunit.Assert.Equal("An error occurred.", apiResponse.Message);
            Xunit.Assert.Equal("Database error", apiResponse.Data);
        }

    }
}