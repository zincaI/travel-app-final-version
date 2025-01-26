using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Travel_API.Repository;

namespace Travel_API.Services
{
    public class TripService : ITripService
    {
        private ITripNoteRepository _tripNoteRepository;

        public TripService(ITripNoteRepository tripNoteRepository)
        {
            _tripNoteRepository = tripNoteRepository;
        }

        public List<TripNoteModel> GetTripNotes()
        {
            return _tripNoteRepository.GetAll();
        }

        public TripNoteModel Create(TripNoteModel tripNote)
        {
            Guid randomValue = Guid.NewGuid();
            string newId = randomValue.ToString();

            tripNote.Id = newId;

            _tripNoteRepository.Create(tripNote);

            return tripNote;
        }

        public void Update(TripNoteModel tripNote)
        {
            _tripNoteRepository.Update(tripNote);
        }

        public void Delete(string id)
        {
            _tripNoteRepository.Delete(id);
        }
    }
}
