import {RiskCalculatorFieldResults} from "../RiskCalculatorFormat";

export interface RiskCalculatorResultsComponentProps {
    inputs: RiskCalculatorFieldResults,
    comparisonInputs: RiskCalculatorFieldResults,
    comparisonModeState: boolean
}