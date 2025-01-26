namespace Travel_API.Services
{
    public interface ITripService
    {
        List<TripNoteModel> GetTripNotes();
        TripNoteModel Create(TripNoteModel tripNote);

        void Update(TripNoteModel tripNote);
        void Delete(string id);


    }

}
