using DnsClient;
using Moq;
using Travel_API.Repository;
using Travel_API.Services;
using static System.Net.Mime.MediaTypeNames;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Travel_API_Tests 
{
    public class UnitTest1
    {

        [Fact]
        public void GetTripNotes_Successfully()
        {
            var mockRepository = new Mock<ITripNoteRepository>();
            var service = new TripService(mockRepository.Object);

            service.GetTripNotes();

            mockRepository.Verify(r => r.GetAll(), Times.Once);
        }

        [Fact]
        public void Create_Successfully()
        {
            var mockRepository = new Mock<ITripNoteRepository>();
            var service = new TripService(mockRepository.Object);
            var tripNote = new TripNoteModel();

            service.Create(tripNote);

            Assert.False(string.IsNullOrEmpty(tripNote.Id));
            mockRepository.Verify(r => r.Create(It.Is<TripNoteModel>(t => t.Id == tripNote.Id)), Times.Once);
        }

        [Fact]
        public void Update_Successfully()
        {
            var mockRepository = new Mock<ITripNoteRepository>();



            TripNoteModel tripNote = new TripNoteModel() {   
                    Id = "2",
                    Title = "Beach",
                FromDate = DateTime.Parse("2024-12-10T09:00:00Z"),
                ToDate = DateTime.Parse("2024-12-15T16:00:00Z"),
                Description = "Relaxing time at the beach.",
                Rating = 4,
                Image = "no jpg"
            };

            var service = new TripService(mockRepository.Object);
            service.Update(tripNote);

            Assert.False(string.IsNullOrEmpty(tripNote.Id));
            mockRepository.Verify(r => r.Update(It.Is<TripNoteModel>(t => t == tripNote)), Times.Once);
        }

        [Fact]
        public void Delete_Successfully()
        {
            var mockRepository = new Mock<ITripNoteRepository>();
            var service = new TripService(mockRepository.Object);

            string tripNoteId="2";

            service.Delete(tripNoteId);

            Assert.False(string.IsNullOrEmpty(tripNoteId));
            mockRepository.Verify(r => r.Delete(It.Is<string>(t => t == tripNoteId)),Times.Once);
        }
    }
}