using ContactManager.Models;

namespace ContactManager.Interface
{
    public interface IContact
    {
        public Task<int> CreateContact(CreateContact request);
        public Task<int> UpdateContact(int id,UpdateContact request);
        public Task<int> DeleteContact(int id);
        public Task<ViewContact> ViewContact(int id);
        public Task<List<ViewContact>> GetContactList(string searchQuery = "");
    }
}
