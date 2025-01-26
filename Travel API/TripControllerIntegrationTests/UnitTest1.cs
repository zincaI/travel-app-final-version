using Newtonsoft.Json;
using System.Net.Http.Json;
using System.Net.Http;
using System.Text;
using Microsoft.AspNetCore.Http;

namespace TripControllerIntegrationTests
{
    public class UnitTest1
    {

        readonly string baseUrl = "https://localhost:44339/Trip";

        [Fact]
        public async Task TripController_GetAll_Success()
        {
            // Create HttpClient
            HttpClient client = new HttpClient();


            HttpRequestMessage getRequest = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri(baseUrl)
            };
            var getResponse = await client.SendAsync(getRequest);
            var getResponseContent = await getResponse.Content.ReadAsStringAsync();
            var getTripNotes = JsonConvert.DeserializeObject<List<TripNoteModel>>(getResponseContent);


            // Assert: Verify that the response is successful
            Assert.NotNull(getTripNotes);
            Assert.Equal(System.Net.HttpStatusCode.OK, getResponse.StatusCode);
        }

        //[Fact]
        //public async Task TripController_Create_Failure_NullTripNote()
        //{
        //    // Arrange
        //    TripNoteModel note = null;
        //    var serializedNote = JsonConvert.SerializeObject(note);
        //    var httpContent = new StringContent(serializedNote, Encoding.UTF8, "application/json");

        //    // Create HttpClient
        //    HttpClient client = new HttpClient();
        //    client.BaseAddress = new Uri(baseUrl);

        //    // Act: Try to create a null trip note
        //    var postResponse = await client.PostAsync("/Trip", httpContent);

        //    // Assert: Verify the response is BadRequest
        //    Assert.Equal(System.Net.HttpStatusCode.BadRequest, postResponse.StatusCode);
        //}

        //[Fact]
        //public async Task TripController_Update_Success()
        //{
        //    // Arrange
        //    var note = new TripNoteModel
        //    {
        //        Id = Guid.NewGuid().ToString(),
        //        Title = "Brasov",
        //        FromDate = DateTime.UtcNow,
        //        ToDate = DateTime.UtcNow.AddDays(5),
        //        Description = "updated description",
        //        Rating = 4,
        //        Image = "cv"
        //    };
        //    var serializedNote = JsonConvert.SerializeObject(note);
        //    var httpContent = new StringContent(serializedNote, Encoding.UTF8, "application/json");

        //    // Create HttpClient
        //    HttpClient client = new HttpClient();
        //    client.BaseAddress = new Uri(baseUrl);

        //    // Act: Update the trip note
        //    var putResponse = await client.PutAsync("/Trip", httpContent);

        //    // Assert: Verify the response is successful
        //    Assert.Equal(System.Net.HttpStatusCode.OK, putResponse.StatusCode);

        //    // 2. Get the notes from database and find the recently added note
        //    HttpRequestMessage firstGetRequest = new HttpRequestMessage
        //    {
        //        Method = HttpMethod.Get,
        //        RequestUri = new Uri(baseUrl)
        //    };
        //    var firstGetResponse = await client.SendAsync(firstGetRequest);
        //    var firstGetResponseContent = await firstGetResponse.Content.ReadAsStringAsync();
        //    var firstGetTripNotes = JsonConvert.DeserializeObject<List<TripNoteModel>>(firstGetResponseContent);
        //    var firstGetTripNote = firstGetTripNotes.Find(tripNote => tripNote.Id == note.Id);

        //    Assert.NotNull(firstGetTripNote);

        //}


        [Fact]
        public async Task TripController_Update_Success()
        {
            var note = new TripNoteModel
            {
                Id = "74d8af3d-4b7c-41b2-adf3-8eebbea3e15f",
                Title = "Brasov",
                FromDate = DateTime.UtcNow,
                ToDate = DateTime.UtcNow.AddDays(5),
                Description = "test no.3",
                Rating = 4,
                Image = "cv"
            };

            using HttpClient client = new HttpClient { BaseAddress = new Uri(baseUrl) };

            // Act: Update the trip note
            var putResponse = await client.PutAsJsonAsync("/Trip", note);

            // Assert: Verify the response is successful
            Assert.Equal(System.Net.HttpStatusCode.OK, putResponse.StatusCode);

            // Get the notes from database and find the recently added note
            var getResponse = await client.GetAsync("/Trip");
            var getResponseContent = await getResponse.Content.ReadAsStringAsync();
            var tripNotes = JsonConvert.DeserializeObject<List<TripNoteModel>>(getResponseContent);

            Assert.NotNull(tripNotes);
            var foundTripNote = tripNotes.Find(tripNote => tripNote.Id == note.Id || tripNote.Description== "test no.2");

            Assert.NotNull(foundTripNote);
        }

        [Fact]
        public async Task TripController_Post_Success()
        {
            // 1. Add the note in database
            var note = new TripNoteModel
            {
                Id = new Guid().ToString(),
                Title = "Brasov",
                FromDate = DateTime.UtcNow,
                ToDate = DateTime.UtcNow.AddDays(5),
                Description = "updated description",
                Rating = 4,
                Image = "cv"
            };

            HttpClient client = new HttpClient();
            HttpRequestMessage postRequest = new HttpRequestMessage
            {
                Content = JsonContent.Create(note),
                Method = HttpMethod.Post,
                RequestUri = new Uri(baseUrl)
            };
            var postResponse = await client.SendAsync(postRequest);
            var postResponseContent = await postResponse.Content.ReadAsStringAsync();
            var addedTripNote = JsonConvert.DeserializeObject<TripNoteModel>(postResponseContent);

            // 2. Get the notes from database and find the recently added note
            HttpRequestMessage firstGetRequest = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri(baseUrl)
            };
            var firstGetResponse = await client.SendAsync(firstGetRequest);
            var firstGetResponseContent = await firstGetResponse.Content.ReadAsStringAsync();
            var firstGetTripNotes = JsonConvert.DeserializeObject<List<TripNoteModel>>(firstGetResponseContent);
            var firstGetTripNote = firstGetTripNotes.Find(tripNote => tripNote.Id == addedTripNote.Id);

            Assert.NotNull(firstGetTripNote);
        }

        [Fact]
        public async Task TripController_Delete_Success()
        {
            // 1. Add the note in database
            var note = new TripNoteModel
            {
                Id = new Guid().ToString(),
                Title = "Brasov",
                FromDate = DateTime.UtcNow,
                ToDate = DateTime.UtcNow.AddDays(5),
                Description = "updated description",
                Rating = 4,
                Image = "cv"
            };

            HttpClient client = new HttpClient();
            HttpRequestMessage postRequest = new HttpRequestMessage
            {
                Content = JsonContent.Create(note),
                Method = HttpMethod.Post,
                RequestUri = new Uri(baseUrl)
            };
            var postResponse = await client.SendAsync(postRequest);
            var postResponseContent = await postResponse.Content.ReadAsStringAsync();
            var addedTripNote = JsonConvert.DeserializeObject<TripNoteModel>(postResponseContent);


            // 2. Get the notes from database and find the recently added note
            HttpRequestMessage firstGetRequest = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri(baseUrl)
            };
            var firstGetResponse = await client.SendAsync(firstGetRequest);
            var firstGetResponseContent = await firstGetResponse.Content.ReadAsStringAsync();
            var firstGetTripNotes = JsonConvert.DeserializeObject<List<TripNoteModel>>(firstGetResponseContent);
            var firstGetTripNote = firstGetTripNotes.Find(tripNote => tripNote.Id == addedTripNote.Id);

            Assert.NotNull(firstGetTripNote);


            // 3. Delete the added note
            HttpRequestMessage deleteRequest = new HttpRequestMessage
            {
                Content = JsonContent.Create(addedTripNote.Id),
                Method = HttpMethod.Delete,
                RequestUri = new Uri(baseUrl)
            };
            var deleteResponse = await client.SendAsync(deleteRequest);
            Assert.Equal(System.Net.HttpStatusCode.OK, deleteResponse.StatusCode);


            // 4. Get the notes from database and see that the note is not anymore in database
            HttpRequestMessage secondGetRequest = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri(baseUrl)
            };
            var secondGetResponse = await client.SendAsync(secondGetRequest);
            var secondGetResponseContent = await secondGetResponse.Content.ReadAsStringAsync();
            var secondGetResponseTripNotes = JsonConvert.DeserializeObject<List<TripNoteModel>>(secondGetResponseContent);
            var secondGetResponseTripNote = secondGetResponseTripNotes.Find(tripNote => tripNote.Id == addedTripNote.Id);

            Assert.Null(secondGetResponseTripNote);
        }
        }
}
