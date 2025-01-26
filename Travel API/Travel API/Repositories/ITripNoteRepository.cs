using Travel_API.Services;

namespace Travel_API.Repository
{
    public interface ITripNoteRepository
    {
        List<TripNoteModel> GetAll();
        TripNoteModel Create(TripNoteModel tripNote);
        void Update(TripNoteModel tripNote);
        void Delete(string id);

    }
}

