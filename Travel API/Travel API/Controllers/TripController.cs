using Microsoft.AspNetCore.Mvc;
using Travel_API.Repository;
using Travel_API.Services;

namespace Travel_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TripController : Controller
    {
        private readonly ITripService _tripService;

        public TripController(ITripService tripService)
        {
            _tripService = tripService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var tripNotes = _tripService.GetTripNotes();
            return Ok(tripNotes);
        }

        [HttpPost]
        public IActionResult Create([FromBody] TripNoteModel tripNote)
        {
            //if (tripNote != null)
            //{
            //    _tripService.Create(tripNote);
            //    return Ok();
            //}
            //return BadRequest();


            if (tripNote is null)
            {
                return BadRequest();
            }

            var addedtripNote = _tripService.Create(tripNote);

            //return Accepted();
            return Ok(addedtripNote);
        }

        [HttpPut]
        public IActionResult Update([FromBody] TripNoteModel tripNote)
        {
            if (tripNote is null)
            {
                return BadRequest();
            }

            _tripService.Update(tripNote);

            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest();
            }

            _tripService.Delete(id);

            return Ok();
        }
    }
}
