namespace Dtos
{
    public class ResponseBase
    {
        public ResponseBase()
        {
            Messages = new List<string>();
        }
        public bool IsSuccessful => !Messages?.Any() ?? true;
        public List<string> Messages { get; set; }
    }
}
