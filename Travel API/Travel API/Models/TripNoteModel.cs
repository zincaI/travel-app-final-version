
using MongoDB.Bson.Serialization.Attributes;

public class TripNoteModel
{
    //[BsonId]
    public string Id { get; set; }
    public string Title { get; set; }
    public DateTime FromDate { get; set; }
    public DateTime ToDate { get; set; }
    public string Description { get; set; }
    public double Rating { get; set; }
    public string Image { get; set; }

}
