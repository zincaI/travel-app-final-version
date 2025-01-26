namespace Travel_API.Settings
{
    public class MongoDBSettings : IMongoDBSettings
    {
        public string CollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

}
