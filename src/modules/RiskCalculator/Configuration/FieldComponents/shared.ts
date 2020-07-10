import {RiskCalculatorField, RiskCalculatorFieldResult} from "../../RiskCalculatorFormat";

export interface FieldComponentProps {
    field: RiskCalculatorField,
    callBack: (result: RiskCalculatorFieldResult) => any
}