namespace Dtos.CalculatorUsage
{
    public class CalculatorInformationDto
    {
        public Guid SchoolId { get; set; }
        public Guid UserId { get; set; }
        public Guid CorrelationId { get; set; }
        public int QuestionNumber { get; set; }
    }
}
