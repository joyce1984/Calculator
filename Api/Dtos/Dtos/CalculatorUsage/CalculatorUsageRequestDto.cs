namespace Dtos.CalculatorUsage
{
    public class CalculatorUsageRequestDto : RequestBase
    {
        public string FirstNumber { get; set; }
        public string SecondNumber { get; set; }
        public string Operator { get; set; }
        public string Answer { get; set; }
        public CalculatorInformationDto CalculatorInformation { get; set; }
        
    }
}