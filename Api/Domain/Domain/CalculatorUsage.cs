using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class CalculatorUsage
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public Guid Id { get; set; }
        [MaxLength(50)]
        public string FirstNumber { get; set; }
        [MaxLength(50)]
        public string SecondNumber { get; set; }
        [MaxLength(1)]
        public string Operator { get; set; }
        [MaxLength(50)]
        public string Answer { get; set; }
        public Guid SchoolId { get; set; }
        public Guid UserId { get; set; }
        public int QuestionNumber { get; set; }
    }
}