using ContactManager.Database;
using ContactManager.Interface;
using ContactManager.Models;
using Microsoft.EntityFrameworkCore;

namespace ContactManager.Service
{
    public class ContactService : IContact
    {
        private readonly ApplicationDbContext _context;
        public ContactService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<int> CreateContact(CreateContact request)
        {
            try
            {
                var contact = new Contact
                {
                    Name = request.Name,
                    Email = request.Email,
                    Phone = request.Phone,
                    Address = request.Address
                };

                _context.Contacts.Add(contact);
                await _context.SaveChangesAsync();
                return contact.Id;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<int> DeleteContact(int id)
        {
            try
            {
                var contact = await _context.Contacts.FindAsync(id);
                if (contact == null)
                {
                    return 0; // Contact not found
                }

                _context.Contacts.Remove(contact);
                return await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public async Task<List<ViewContact>> GetContactList()
        {
            try
            {
                return await _context.Contacts
            .Select(c => new ViewContact
            {
                Id = c.Id,
                Name = c.Name,
                Email = c.Email,
                Phone = c.Phone,
                Address = c.Address
            })
            .ToListAsync();
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<int> UpdateContact(int id, UpdateContact request)
        {
            try
            {
                var contact = await _context.Contacts.FindAsync(id);
                if (contact == null)
                {
                    return 0; // Contact not found
                }

                contact.Name = request.Name;
                contact.Email = request.Email;
                contact.Phone = request.Phone;
                contact.Address = request.Address;

                _context.Contacts.Update(contact);
                return await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<ViewContact> ViewContact(int id)
        {
            try
            {
                var contact = await _context.Contacts.FindAsync(id);
                if (contact == null)
                {
                    return null; 
                }

                return new ViewContact
                {
                    Id = contact.Id,
                    Name = contact.Name,
                    Email = contact.Email,
                    Phone = contact.Phone,
                    Address = contact.Address
                };
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
