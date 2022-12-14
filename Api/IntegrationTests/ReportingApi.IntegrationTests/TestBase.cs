namespace ReportingApi.IntegrationTests
{
    public class TestBase
    {
        public HttpRequest CreateHttpRequest(Dictionary<string, StringValues> querystring, string data = "")
        {
            var context = new DefaultHttpContext();
            var request = context.Request;
            request.Query = new QueryCollection(querystring);

            if (!string.IsNullOrEmpty(data))
            {
                var stream = new MemoryStream(Encoding.UTF8.GetBytes(data));
                request.Body = stream;
            }
            return request;
        }
    }
}
