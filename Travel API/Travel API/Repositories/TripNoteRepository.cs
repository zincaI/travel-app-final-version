
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Threading.Tasks;
using Travel_API.Settings;

namespace Travel_API.Repository
{
    public class TripNoteRepository : ITripNoteRepository
    {
        private IMongoCollection<TripNoteModel> _tripNotesCollection;


        public TripNoteRepository(IOptions<MongoDBSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            var database = client.GetDatabase(settings.Value.DatabaseName);

            _tripNotesCollection = database.GetCollection<TripNoteModel>(settings.Value.CollectionName);
        }

        public List<TripNoteModel> GetAll()
        {
            var filter = Builders<TripNoteModel>.Filter.Empty;
            var result = _tripNotesCollection.Find(filter);
            var tripNotes = result.ToList();
            return tripNotes;
        }

        public TripNoteModel Create(TripNoteModel tripNote)
        {
            _tripNotesCollection.InsertOne(tripNote);
            return tripNote;
        }

        public void Update(TripNoteModel tripNote)
        {
            var filter = Builders<TripNoteModel>.Filter.Eq(t => t.Id, tripNote.Id);
            _tripNotesCollection.ReplaceOne(filter, tripNote);
        }

        public void Delete(string id)
        {
            var filter = Builders<TripNoteModel>.Filter.Eq(t => t.Id, id);
            _tripNotesCollection.DeleteOne(filter);
        }
    }
}
