import { ICalculatorInformation } from "./IcalculatorInformation";

export class CalculatorInformation implements ICalculatorInformation {
    SchoolId!: string;
    UserId!: string;
    QuestionNumber!: number;
    CorrelationId!: string;
}