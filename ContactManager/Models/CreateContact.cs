﻿namespace ContactManager.Models
{
    public class CreateContact
    {
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public string? Address { get; set; }
    }
}
