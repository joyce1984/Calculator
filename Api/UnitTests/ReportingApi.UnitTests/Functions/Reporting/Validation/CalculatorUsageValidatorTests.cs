using ReportingApi.Functions.Reporting.Validation;

namespace ReportingApi.UnitTests.Functions.Reporting.Validation
{
    public class CalculatorUsageValidatorTests
    {
        private readonly CalculateUsageValidator _validator;
        public CalculatorUsageValidatorTests()
        {
            _validator = new CalculateUsageValidator();
        }
        [Fact]
        public void When_all_the_required_fields_are_populated_the_result_will_be_valid()
        {
            var result = _validator.Validate(new CalculatorUsageRequestDto {FirstNumber="1", Operator="X", SecondNumber ="2", Answer ="2", CalculatorInformation = new CalculatorInformationDto { QuestionNumber = 1, SchoolId = Guid.NewGuid() },CorrelationId = Guid.NewGuid() });
            result.Should().NotBeNull();
            result.IsValid.Should().BeTrue();
            result.Errors.Should().BeEmpty();
        }
 
        [Fact]
        public void When_the_first_number_field_is_missing_then_an_invalid_result_is_returned()
        {
            var result = _validator.Validate(new CalculatorUsageRequestDto { FirstNumber = string.Empty, Operator = "X", SecondNumber = "2", Answer = "2", CalculatorInformation = new CalculatorInformationDto { QuestionNumber = 1, SchoolId = Guid.NewGuid() },CorrelationId = Guid.NewGuid() });
            result.Should().NotBeNull();
            result.IsValid.Should().BeFalse();
            result.Errors.Should().NotBeEmpty();
        }
        [Fact]
        public void When_the_second_number_field_is_missing_then_an_invalid_result_is_returned()
        {
            var result = _validator.Validate(new CalculatorUsageRequestDto { FirstNumber = "1", Operator = "X", SecondNumber = string.Empty, Answer = "2", CalculatorInformation = new CalculatorInformationDto { QuestionNumber = 1, SchoolId = Guid.NewGuid() },CorrelationId = Guid.NewGuid() });
            result.Should().NotBeNull();
            result.IsValid.Should().BeFalse();
            result.Errors.Should().NotBeEmpty();
        }
        [Fact]
        public void When_the_answer_field_is_missing_then_an_invalid_result_is_returned()
        {
            var result = _validator.Validate(new CalculatorUsageRequestDto { FirstNumber = "1", Operator = "X", SecondNumber = "2", Answer = string.Empty, CalculatorInformation = new CalculatorInformationDto { QuestionNumber = 1, SchoolId = Guid.NewGuid() },CorrelationId = Guid.NewGuid() });
            result.Should().NotBeNull();
            result.IsValid.Should().BeFalse();
            result.Errors.Should().NotBeEmpty();
        }
        [Fact]
        public void When_the_number_field_is_less_than_one_then_an_invalid_result_is_returned()
        {
            var result = _validator.Validate(new CalculatorUsageRequestDto { FirstNumber = "1", Operator = "X", SecondNumber = "2", Answer = "2", CalculatorInformation = new CalculatorInformationDto { QuestionNumber = 0, SchoolId = Guid.NewGuid() }, CorrelationId = Guid.NewGuid() });
            result.Should().NotBeNull();
            result.IsValid.Should().BeFalse();
            result.Errors.Should().NotBeEmpty();
        }
        [Fact]
        public void When_the_corellationId_field_is_empty_then_an_invalid_result_is_returned()
        {
            var result = _validator.Validate(new CalculatorUsageRequestDto { FirstNumber = "1", Operator = "X", SecondNumber = "2", Answer = "2", CalculatorInformation = new CalculatorInformationDto { QuestionNumber = 1, SchoolId = Guid.NewGuid() }, CorrelationId = Guid.Empty});
            result.Should().NotBeNull();
            result.IsValid.Should().BeFalse();
            result.Errors.Should().NotBeEmpty();
        }
        [Fact]
        public void When_the_schoolId_field_is_empty_then_an_invalid_result_is_returned()
        {
            var result = _validator.Validate(new CalculatorUsageRequestDto { FirstNumber = "1", Operator = "X", SecondNumber = "2", Answer = "2", CalculatorInformation = new CalculatorInformationDto { QuestionNumber = 1, SchoolId = Guid.Empty }, CorrelationId = Guid.NewGuid() });
            result.Should().NotBeNull();
            result.IsValid.Should().BeFalse();
            result.Errors.Should().NotBeEmpty();
        }
        [Fact]
        public void When_the_operator_field_is_empty_then_an_invalid_result_is_returned()
        {
            var result = _validator.Validate(new CalculatorUsageRequestDto { FirstNumber = "1", Operator = string.Empty, SecondNumber = "2", Answer = "2", CalculatorInformation = new CalculatorInformationDto { QuestionNumber = 1, SchoolId = Guid.NewGuid() },CorrelationId = Guid.NewGuid() });
            result.Should().NotBeNull();
            result.IsValid.Should().BeFalse();
            result.Errors.Should().NotBeEmpty();
        }
        [Fact]
        public void When_the_operator_field_is_multiply_then_a_valid_result_is_returned()
        {
            var result = _validator.Validate(new CalculatorUsageRequestDto { FirstNumber = "1", Operator = "X", SecondNumber = "2", Answer = "2", CalculatorInformation = new CalculatorInformationDto { QuestionNumber = 1, SchoolId = Guid.NewGuid() },CorrelationId = Guid.NewGuid() });
            result.Should().NotBeNull();
            result.IsValid.Should().BeTrue();
            result.Errors.Should().BeEmpty();
        }
        [Fact]
        public void When_the_operator_field_is_divide_then_a_valid_result_is_returned()
        {
            var result = _validator.Validate(new CalculatorUsageRequestDto { FirstNumber = "1", Operator = "/", SecondNumber = "2", Answer = "2", CalculatorInformation = new CalculatorInformationDto { QuestionNumber = 1, SchoolId = Guid.NewGuid() },CorrelationId = Guid.NewGuid() });
            result.Should().NotBeNull();
            result.IsValid.Should().BeTrue();
            result.Errors.Should().BeEmpty();
        }
        [Fact]
        public void When_the_operator_field_is_plus_then_a_valid_result_is_returned()
        {
            var result = _validator.Validate(new CalculatorUsageRequestDto { FirstNumber = "1", Operator = "+", SecondNumber = "2", Answer = "2", CalculatorInformation = new CalculatorInformationDto { QuestionNumber = 1, SchoolId = Guid.NewGuid() },CorrelationId = Guid.NewGuid() });
            result.Should().NotBeNull();
            result.IsValid.Should().BeTrue();
            result.Errors.Should().BeEmpty();
        }
        [Fact]
        public void When_the_operator_field_is_minus_then_a_valid_result_is_returned()
        {
            var result = _validator.Validate(new CalculatorUsageRequestDto { FirstNumber = "1", Operator = "-", SecondNumber = "2", Answer = "2", CalculatorInformation = new CalculatorInformationDto { QuestionNumber = 1, SchoolId = Guid.NewGuid() },CorrelationId = Guid.NewGuid() });
            result.Should().NotBeNull();
            result.IsValid.Should().BeTrue();
            result.Errors.Should().BeEmpty();
        }
    }
}
